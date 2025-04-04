import { HStack, Separator, Text } from '@chakra-ui/react';
import Competition from './Competition';

import { fetchCompetitions } from '@/utils/fetchCompetitions';
import popularityScores from '@/lib/sportsByPopularity';

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
      // Verify that a.sport and b.sport exist and are valid
      const sportA = a as Sport;
      const sportB = b as Sport;

      // Debug: Log the sports and their corresponding popularity scores
      console.log(`Sorting: ${sportA} vs ${sportB}`);
      console.log('Score A:', popularityScores[sportA]);
      console.log('Score B:', popularityScores[sportB]);

      // Sort based on popularity scores
      const scoreA = popularityScores[sportA] || 0;
      const scoreB = popularityScores[sportB] || 0;

      return scoreB - scoreA; // Sort in descending order
    })
    .splice(0, 8);

  return (
    <>
      <HStack gap={10} width="full" px="20%" h={16}>
        {sortedMainCompetitions.map((competition, i) => (
          <Competition key={i} competition={competition} />
        ))}
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
