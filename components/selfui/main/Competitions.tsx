import { HStack, Separator, Text } from '@chakra-ui/react';

import { fetchCompetitions } from '@/utils/fetchCompetitions';
import popularityScores from '@/lib/sportsByPopularity';
import MainCompetitions from './MainCompetitions';
import Favorites from './Favorites';
import OtherCompetitions from './OtherCompetitions';

type Sport = keyof typeof popularityScores;

const Competitions = async () => {
  const data = await fetchCompetitions();

  if (typeof data === 'string') {
    return <Text color="red.500">Error: {data}</Text>;
  }

  if (!Array.isArray(data) || data.length === 0) {
    return <Text>No competitions available</Text>;
  }

  const sortedMainCompetitions = [...data].sort((a, b) => {
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
