'use client';
import { useColorModeValue } from '@/components/ui/color-mode';
import { VStack, Text, Separator } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface League {
  LN: string;
}

export const ActiveLeague: React.FC = () => {
  const [activeLeague, setActiveLeague] = useState<string>();
  const [footballLeagues, setFootballLeagues] = useState<League[]>([]);
  const hoverBgColor = useColorModeValue('gray.300', 'gray.600');
  const bgColor = useColorModeValue('orange.500', 'yellow.500');

  const params = useParams();

  // const competition = Array.isArray(params?.competition)
  //   ? params.competition[0]
  //   : params?.competition;

  const leagueParam = Array.isArray(params?.league)
    ? params.league[0]
    : params?.league;

  const decodedLeague = leagueParam ? decodeURIComponent(leagueParam) : '';

  useEffect(() => {
    const getLeagues = async () => {
      if (params.league && params.league.length <= 1) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/footballleagues/getfootballleagues`,
          {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ country: decodedLeague }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setFootballLeagues(data.footballLeagues?.footballLeagues ?? []);

        setActiveLeague(
          Array.isArray(params?.league)
            ? decodeURIComponent(params.league[1])
            : ''
        );
      } catch (err) {
        console.error('Failed to fetch football leagues:', err);
      }
    };

    getLeagues();
  }, [decodedLeague, params?.league]);

  return (
    <VStack alignItems="flex-start" ml="20%" w="180px" mb={4}>
      <Text
        fontSize="sm"
        letterSpacing="wider"
        fontWeight="bolder"
        alignSelf="center"
        textTransform="uppercase"
      >
        {decodedLeague}
      </Text>

      <Separator height="1px" bg="gray.emphasized" width="full" />

      {footballLeagues.map((league, i) => (
        <Text
          key={i}
          cursor="pointer"
          w="95%"
          rounded="sm"
          px="6px"
          py="1px"
          fontSize="xs"
          outline="none"
          bg={activeLeague === league.LN ? bgColor : ''}
          _hover={{
            bg: hoverBgColor,
          }}
          transition="background-color border-color text-color 0.2s"
          onClick={() => {
            setActiveLeague(league.LN);
          }}
        >
          {league.LN}
        </Text>
      ))}
    </VStack>
  );
};
