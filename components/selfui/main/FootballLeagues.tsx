import { HStack, Icon, Text } from '@chakra-ui/react';
import { BsPinAngleFill } from 'react-icons/bs';

import React from 'react';
import { useColorModeValue } from '@/components/ui/color-mode';
import { useRouter } from 'next/navigation';

interface League {
  LN: string;
}

interface LeaguesProps {
  leagues: League[];
  competition: string;
  country: string;
}

const FootballLeagues: React.FC<LeaguesProps> = ({
  leagues,
  competition,
  country,
}) => {
  const hoverBgColor = useColorModeValue('gray.300', 'gray.600');
  const hoverIconColor = useColorModeValue('orange.500', 'yellow.500');

  const router = useRouter();

  return leagues.map((league, i) => (
    <HStack
      key={i}
      position="relative"
      w="95%"
      justify="space-between"
      cursor="pointer"
      rounded="sm"
      px="6px"
      py="1px"
      outline="none"
      transition="background-color border-color text-color 0.2s"
      _hover={{
        bg: hoverBgColor,
      }}
      onClick={() => {
        router.push(
          `${process.env.NEXT_PUBLIC_DOMAIN}/${competition}/${country}/${league.LN}`
        );
      }}
    >
      <Text w="90%">{league.LN}</Text>

      {/* Absolutely positioned icon above the HStack */}
      <Icon
        size="xs"
        as={BsPinAngleFill}
        position="absolute"
        top="calc(50% - 6px)"
        right="6px"
        cursor="default"
        zIndex="modal"
        _hover={{ color: hoverIconColor }}
        onClick={e => {
          e.stopPropagation(); // Prevent triggering router.push
          console.log(`${league.LN} pinned in Favorites`);
        }}
      />
    </HStack>
  ));
};

export default FootballLeagues;
