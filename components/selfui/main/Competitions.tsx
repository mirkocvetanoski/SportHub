import { Flex, HStack, Separator, Text } from '@chakra-ui/react';
import Competition from './Competition';

import { fetchCompetitions } from '@/utils/fetchCompetitions';

type Sport = keyof typeof popularityScores;

const popularityScores = {
  Football: 100,
  Basketball: 90,
  Tennis: 85,
  'American Football': 80,
  Baseball: 75,
  Volleyball: 70,
  Boxing: 68,
  Hockey: 65,
  Rugby: 60,
  'e-sports': 55,
  Darts: 50,
  Snooker: 48,
  'Ping Pong': 45,
  Futsal: 40,
  Handball: 38,
  Waterpolo: 35,
  'Winter Sports': 30,
  'Beach Soccer': 25,
  Moto: 20,
  Atletica: 15,
  FIFA: 10,
  'Special Games': 5,
  'Special Single': 5,
  Winner: 3,
  Imaginary: 1,
};

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
          <Flex key={i}>
            <Competition competition={competition} />
          </Flex>
        ))}
      </HStack>
      <Separator
        height="1px"
        bg="gray.emphasized"
        width="full"
        marginTop={1}
        marginBottom={3}
      />
    </>
  );
};

export default Competitions;
