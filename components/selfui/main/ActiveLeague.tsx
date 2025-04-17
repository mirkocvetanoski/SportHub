'use client';
import { VStack, Text } from '@chakra-ui/react';

import { useParams } from 'next/navigation';

export const ActiveLeague = () => {
  const { league } = useParams();

  const decodedLeague = decodeURIComponent(
    typeof league === 'string' ? league : ''
  );

  return (
    <VStack alignItems="flex-start" ml="20%" w="170px">
      <Text>{decodeURIComponent(decodedLeague)}</Text>
    </VStack>
  );
};
