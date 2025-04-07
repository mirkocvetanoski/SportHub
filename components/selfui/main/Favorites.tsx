'use client';

import { ClientOnly, Flex, Icon, Text } from '@chakra-ui/react';
import { IoStar } from 'react-icons/io5';

import { useState } from 'react';
import { useColorModeValue } from '@/components/ui/color-mode';

const Favorites = () => {
  const textColor = useColorModeValue('gray.600', 'whiteAlpha.800');
  const hoverTextColor = useColorModeValue('gray.900', 'gray.400');
  const borderColor = useColorModeValue('orange.500', 'yellow.500');

  const [active, setActive] = useState<string>('');

  return (
    <ClientOnly>
      <Flex
        width="fit-content"
        data-favorites="Favorites"
        align="center"
        px={1}
        gap={2}
        cursor="pointer"
        height="100%"
        color={active === 'Favorites' ? borderColor : textColor}
        borderBottom="2px solid"
        borderColor={active === 'Favorites' ? borderColor : 'transparent'}
        transition="border-color 0.2s"
        _hover={{
          color: active === 'Favorites' ? '' : hoverTextColor,
        }}
        onClick={e => {
          setActive(e.currentTarget.dataset.favorites || 'Football');
        }}
      >
        <Icon as={IoStar} boxSize={5} />
        <Text>Favorites</Text>
      </Flex>
    </ClientOnly>
  );
};

export default Favorites;
