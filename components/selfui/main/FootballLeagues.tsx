import { useColorModeValue } from '@/components/ui/color-mode';
import { Text } from '@chakra-ui/react';
import React, { useState } from 'react';

interface League {
  LN: string;
}

interface LeaguesProps {
  leagues: League[];
}

const FootballLeagues: React.FC<LeaguesProps> = ({ leagues }) => {
  const hoverBgColor = useColorModeValue('gray.300', 'gray.600');
  const borderColor = useColorModeValue('orange.500', 'yellow.500/70');
  const [activeFootballLeague, setActiveFootballLeague] = useState<string>('');

  return leagues.map((league, i) => (
    <Text
      key={i}
      cursor="pointer"
      w="90%"
      rounded="xs"
      px="6px"
      py="1px"
      color={activeFootballLeague === league.LN ? borderColor : ''}
      borderBottom="1px solid"
      outline="none"
      borderColor={
        activeFootballLeague === league.LN ? borderColor : 'transparent'
      }
      _hover={{
        bg: hoverBgColor,
      }}
      transition="background-color border-color text-color 0.2s"
      onClick={() => {
        setActiveFootballLeague(league.LN);
      }}
    >
      {league.LN}
    </Text>
  ));
};

export default FootballLeagues;
