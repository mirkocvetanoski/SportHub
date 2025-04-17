'use client';
import { VStack, Text } from '@chakra-ui/react';

import { useParams } from 'next/navigation';

export const ActiveLeague = () => {
  const { competition, league } = useParams();

  console.log(competition);

  const decodedLeague =
    league && Array.isArray(league) ? decodeURIComponent(league[0]) : '';

  return (
    <VStack alignItems="flex-start" ml="20%" w="170px">
      <Text>{decodeURIComponent(decodedLeague)}</Text>
    </VStack>
  );
};
