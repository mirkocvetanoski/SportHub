import { HStack, Separator, Text } from '@chakra-ui/react';

import MainCompetitions from './MainCompetitions';
import Favorites from './Favorites';
import OtherCompetitions from './OtherCompetitions';
import { sortCompetitions } from '@/lib/sortCompetitions';

const Competitions = async () => {
  let competitions: string[] = [];
  let error: string | null = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/competitions/getcompetitions`,
      { next: { revalidate: 86400 } } // revalidate once a day
    );

    const data = await res.json();

    if (Array.isArray(data.competitions)) {
      competitions = data.competitions;
    } else if (typeof data.competitions === 'string') {
      error = data.competitions;
    } else {
      error = 'Invalid data format';
    }
  } catch (err) {
    console.error(err);
    error = 'Failed to fetch competitions';
  }

  if (error) {
    return <Text color="red.500">Error: {error}</Text>;
  }

  if (!competitions || competitions.length === 0) {
    return <Text>No competitions available</Text>;
  }

  const sortedMainCompetitions = sortCompetitions(competitions);

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
