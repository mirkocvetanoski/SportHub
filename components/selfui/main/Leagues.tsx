'use client';

import { useColorModeValue } from '@/components/ui/color-mode';
import checkOverflowY from '@/lib/checkOverflowY';
import {
  Box,
  HStack,
  Separator,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import FootballLeagues from './FootballLeagues';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

type Countries = {
  GN: string;
};

const Leagues = () => {
  const hoverBgColor = useColorModeValue('gray.300', 'gray.600');
  const bgColor = useColorModeValue('orange.500', 'yellow.500');

  const [countries, setCountries] = useState<Countries[]>([]);
  const [activeCountry, setActiveCountry] = useState<string>();
  const [footballLeagues, setFootballLeagues] = useState([]);
  const [hasOverflowY, setHasOverflowY] = useState<boolean>(false);
  const countriesContainerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const params = useParams();
  const competition = (params.competition as string) || 'football';

  const router = useRouter();

  useEffect(() => {
    const getCountries = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/countries/getcountries`,
          {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ competition: competition }),
          }
        );

        const data = await res.json();

        setCountries(data.competitions.countries);

        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch countries:', err);
      } finally {
        setIsLoading(false);
      }
    };

    getCountries();
  }, [competition]);

  useEffect(() => {
    if (countries.length === 0 || !countriesContainerRef.current) return;

    const timer = setTimeout(() => {
      const container = countriesContainerRef.current;
      if (!container) return;

      const singleCountryElements =
        container.querySelectorAll<HTMLElement>('#country');
      setHasOverflowY(checkOverflowY(singleCountryElements, container));
    }, 0);

    return () => clearTimeout(timer);
  }, [countries]);

  const handleGetFootballLeagues = async (country: string): Promise<void> => {
    setFootballLeagues([]);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/footballleagues/getfootballleagues`,
        {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify({ country }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const { footballLeagues } = await response.json();
      setFootballLeagues(footballLeagues.footballLeagues);
    } catch (err) {
      console.error('Failed to fetch football leagues:', err);
    }
  };

  return (
    <VStack
      ref={countriesContainerRef}
      alignItems="flex-start"
      ml="20%"
      w="180px"
      h="700px"
      position="relative"
    >
      <Text
        fontSize="sm"
        letterSpacing="wider"
        fontWeight="bolder"
        alignSelf="center"
        textTransform="uppercase"
      >
        Leagues
      </Text>

      <Separator height="1px" bg="gray.emphasized" width="full" />

      {isLoading && (
        <Skeleton
          loading={isLoading}
          variant="pulse"
          h="50px"
          w="50px"
          rounded="full"
          alignSelf="center"
          position="absolute"
          top="calc(50% - 25px)"
        />
      )}

      <VStack
        alignItems="start"
        height="inherit"
        width="inherit"
        gap="2px"
        overflowY={hasOverflowY ? 'scroll' : 'hidden'}
        overflowX="hidden"
      >
        {countries.map((country, i) => (
          <VStack key={i} w="full" gap="2px">
            <HStack
              w="inherit"
              justifyContent="space-between"
              id="country"
              cursor="pointer"
              px="6px"
              py="3px"
              rounded="sm"
              fontSize="xs"
              bg={
                competition === 'football' && country.GN === activeCountry
                  ? bgColor
                  : ''
              }
              _hover={{
                bg: country.GN === activeCountry ? '' : hoverBgColor,
                '& > :last-child': { opacity: '100%' }, // Show last child (the arrow) on hover
              }}
              transition="background-color 0.2s"
              onClick={() => {
                const nextIsOpen = country.GN !== activeCountry || !isOpen;

                // setActiveCountry(country.GN);
                setIsOpen(nextIsOpen);
                setActiveCountry(country.GN);

                if (nextIsOpen && competition === 'football') {
                  handleGetFootballLeagues(country.GN);
                }

                if (competition !== 'football') {
                  router.push(
                    `${process.env.NEXT_PUBLIC_DOMAIN}/${competition}/${country.GN}`
                  );
                }

                if (!nextIsOpen) setFootballLeagues([]);
              }}
            >
              <Text>{country.GN}</Text>
              {competition === 'football' && (
                <Box
                  opacity={
                    country.GN === activeCountry && isOpen ? '100%' : '0%'
                  }
                >
                  {isOpen && country.GN === activeCountry ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </Box>
              )}
            </HStack>

            <VStack
              w="100%"
              mx="8px"
              fontSize="xs"
              alignItems="space"
              alignSelf="flex-start"
            >
              {isOpen &&
                country.GN === activeCountry &&
                footballLeagues.length > 0 && (
                  <FootballLeagues
                    leagues={footballLeagues}
                    competition={competition}
                    country={activeCountry}
                  />
                )}
            </VStack>
          </VStack>
        ))}
      </VStack>
    </VStack>
  );
};

export default Leagues;
