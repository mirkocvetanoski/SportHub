import { HStack, Separator, Text } from '@chakra-ui/react';

import { fetchCompetitions } from '@/utils/fetchCompetitions';
import popularityScores from '@/lib/sportsByPopularity';
import MainCompetitions from './MainCompetitions';

type Sport = keyof typeof popularityScores;

const Competitions = async () => {
  const data = await fetchCompetitions();

  if (typeof data === 'string') {
    return <Text color="red.500">Error: {data}</Text>;
  }

  if (!Array.isArray(data) || data.length === 0) {
    return <Text>No competitions available</Text>;
  }

  const sortedMainCompetitions = [...data]
    .sort((a, b) => {
      const sportA = a as Sport;
      const sportB = b as Sport;

      // Sort based on popularity scores
      const scoreA = popularityScores[sportA] || 0;
      const scoreB = popularityScores[sportB] || 0;

      return scoreB - scoreA; // Sort in descending order
    })
    .splice(0, 8);

  return (
    <>
      <HStack gap={10} width="full" px="20%" h={16}>
        <MainCompetitions competitions={sortedMainCompetitions} />
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
