'use client';

import { useColorModeValue } from '@/components/ui/color-mode';
import checkOverflowY from '@/lib/checkOverflowY';
import { HStack, Text, VStack } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import FootballLeagues from './FootballLeagues';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

type Countries = {
  GN: string;
};

const Leagues = () => {
  const hoverBgColor = useColorModeValue('gray.300', 'gray.600');
  const bgColor = useColorModeValue('orange.500', 'yellow.500/70');

  const [countries, setCountries] = useState<Countries[]>([]);
  const [activeCountry, setActiveCountry] = useState<string>();
  const [footballLeagues, setFootballLeagues] = useState([]);
  const [hasOverflowY, setHasOverflowY] = useState<boolean>(false);
  const countriesContainerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const pathname = usePathname();
  const competition =
    pathname.replace(/[^a-zA-Z]/g, '').toLowerCase() || 'football';

  useEffect(() => {
    const getCountries = async () => {
      try {
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
        setActiveCountry(data.competitions.countries[0].GN);
      } catch (err) {
        console.error('Failed to fetch countries:', err);
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
      w="170px"
      h="calc(100vh - 264px)"
    >
      <Text fontSize="sm" textDecor="underline" textUnderlineOffset="3px">
        Leagues
      </Text>
      <VStack
        alignItems="start"
        width="inherit"
        gap="2px"
        overflowY={hasOverflowY ? 'scroll' : 'hidden'}
        overflowX="hidden"
      >
        {countries.map((country, i) => (
          <VStack key={i} w="95%" gap="2px">
            <HStack
              w="inherit"
              justifyContent="space-between"
              id="country"
              cursor="pointer"
              px="6px"
              py="3px"
              rounded="sm"
              fontSize="xs"
              bg={country.GN === activeCountry ? bgColor : ''}
              _hover={{
                bg: country.GN === activeCountry ? '' : hoverBgColor,
              }}
              transition="background-color 0.2s"
              onClick={() => {
                const nextIsOpen = country.GN !== activeCountry || !isOpen;

                setActiveCountry(country.GN);
                setIsOpen(nextIsOpen);

                if (nextIsOpen && competition === 'football') {
                  handleGetFootballLeagues(country.GN);
                }

                if (!nextIsOpen) setFootballLeagues([]);
              }}
            >
              <Text>{country.GN}</Text>
              {competition === 'football' &&
                (isOpen && country.GN === activeCountry ? (
                  <IoIosArrowUp />
                ) : (
                  <IoIosArrowDown />
                ))}
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
                  <FootballLeagues leagues={footballLeagues} />
                )}
            </VStack>
          </VStack>
        ))}
      </VStack>
    </VStack>
  );
};

export default Leagues;
