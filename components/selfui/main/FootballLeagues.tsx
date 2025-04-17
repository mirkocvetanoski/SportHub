import { Text } from '@chakra-ui/react';

import { useColorModeValue } from '@/components/ui/color-mode';
import { useRouter } from 'next/navigation';
import React from 'react';

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

  const router = useRouter();

  return leagues.map((league, i) => (
    <Text
      key={i}
      cursor="pointer"
      w="95%"
      rounded="sm"
      px="6px"
      py="1px"
      outline="none"
      _hover={{
        bg: hoverBgColor,
      }}
      transition="background-color border-color text-color 0.2s"
      onClick={() => {
        router.push(
          `${process.env.NEXT_PUBLIC_DOMAIN}/${competition}/${country}/${league.LN}`
        );
      }}
    >
      {league.LN}
    </Text>
  ));
};

export default FootballLeagues;
