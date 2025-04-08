'use client';
import { HStack, Separator, Text } from '@chakra-ui/react';

import MainCompetitions from './MainCompetitions';
import Favorites from './Favorites';
import OtherCompetitions from './OtherCompetitions';
import { useEffect, useState } from 'react';
import { useMyContext } from '@/components/context/Context';
import popularityScores from '@/lib/sportsByPopularity';

type Sport = keyof typeof popularityScores;

const Competitions = () => {
  const { competitions, setCompetitions } = useMyContext();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/competitions/getcompetitions`
        );
        const data = await response.json();

        if (typeof data.competitions === 'string') {
          setError(data.competitions);
        } else if (Array.isArray(data.competitions)) {
          setCompetitions(data.competitions);
        } else {
          setError('Invalid data format');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch competitions');
      } finally {
        setLoading(false);
      }
    };

    if (competitions.length === 0) fetchCompetitions();
  }, [competitions.length, setCompetitions]);

  if (loading) {
    return <Text>Loading competitions...</Text>;
  }

  if (error) {
    return <Text color="red.500">Error: {error}</Text>;
  }

  if (!Array.isArray(competitions) || competitions.length === 0) {
    return <Text>No competitions available</Text>;
  }

  const sortedMainCompetitions = [...competitions].sort((a, b) => {
    const sportA = a as Sport;
    const sportB = b as Sport;

    // Sort based on popularity scores
    const scoreA = popularityScores[sportA] || 0;
    const scoreB = popularityScores[sportB] || 0;

    return scoreB - scoreA; // Sort in descending order
  });

  return (
    <>
      <HStack
        width="full"
        h={16}
        px="20%"
        justify="space-between"
        fontSize="sm"
      >
        <Favorites />

        <HStack gap={6} width="fit-content" height="inherit">
          <MainCompetitions competitions={sortedMainCompetitions.slice(0, 8)} />
        </HStack>

        <OtherCompetitions competitions={sortedMainCompetitions.slice(8)} />
      </HStack>
      <Separator
        height="1px"
        bg="gray.emphasized"
        width="full"
        marginBottom={3}
      />
    </>
  );
};

export default Competitions;
