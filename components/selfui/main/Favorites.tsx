'use client';

import { Icon, Link as ChakraLink, Text } from '@chakra-ui/react';
import { IoStar } from 'react-icons/io5';

import { useColorModeValue } from '@/components/ui/color-mode';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Favorites = () => {
  const textColor = useColorModeValue('gray.600', 'whiteAlpha.800');
  const hoverTextColor = useColorModeValue('gray.900', 'gray.400');
  const borderColor = useColorModeValue('orange.500', 'yellow.500');
  const bgColor = useColorModeValue('gray.300', 'gray.600');

  const pathname = usePathname();
  const active = pathname.includes('favorites');

  return (
    <Link href="/favorites" passHref legacyBehavior>
      <ChakraLink
        width="fit-content"
        px={1}
        gap={2}
        cursor="pointer"
        height="100%"
        color={active ? borderColor : textColor}
        borderBottom="2px solid"
        borderColor={active ? borderColor : 'transparent'}
        transition="border-color 0.2s"
        _hover={{
          color: active ? '' : hoverTextColor,
        }}
        focusRing="none"
      >
        <Icon as={IoStar} boxSize={5} />
        <Text>Favorites</Text>
        <Text bg={bgColor} px="6px" rounded="sm">
          0
        </Text>
      </ChakraLink>
    </Link>
  );
};

export default Favorites;
