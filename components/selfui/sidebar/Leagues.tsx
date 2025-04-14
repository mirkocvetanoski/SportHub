'use client';

import { useColorModeValue } from '@/components/ui/color-mode';
import checkOverflowY from '@/lib/checkOverflowY';
import { Text, VStack } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type Countries = {
  GN: string;
};

const Leagues = () => {
  const hoverTextColor = useColorModeValue('gray.900', 'gray.400');
  const bgColor = useColorModeValue('orange.500', 'yellow.500/70');

  const [countries, setCountries] = useState<Countries[]>([]);
  const [activeCountry, setActiveCountry] = useState<string>();
  const [hasOverflowY, setHasOverflowY] = useState<boolean>(true);

  const pathname = usePathname();

  const competition =
    pathname.replace(/[^a-zA-Z]/g, '').toLowerCase() || 'football';

  const countriesContainer = document.getElementById(
    'countriesContainer'
  ) as HTMLElement;
  const singleCountry =
    document.querySelectorAll<HTMLElement>('#singleCountry');

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
    setHasOverflowY(checkOverflowY(singleCountry, countriesContainer));
  }, [countriesContainer, singleCountry]);

  return (
    <VStack
      id="countriesContainer"
      alignItems="flex-start"
      ml="20%"
      w="170px"
      h="calc(100vh - 264px)"
      overflowY={hasOverflowY ? 'scroll' : 'hidden'}
      overflowX="hidden"
    >
      <Text fontSize="sm" textDecor="underline" textUnderlineOffset="3px">
        Countries
      </Text>
      <VStack alignItems="start" width="inherit" gap="2px">
        {countries.map((country, i) => {
          return (
            <Text
              id="singleCountry"
              cursor="pointer"
              width="90%"
              px="6px"
              py="3px"
              rounded="sm"
              fontWeight={country.GN === activeCountry ? 'bold' : ''}
              key={i}
              onClick={() => {
                setActiveCountry(country.GN);
              }}
              fontSize="xs"
              bg={country.GN === activeCountry ? bgColor : ''}
              _hover={{
                color: country.GN === activeCountry ? '' : hoverTextColor,
              }}
              transition="border-color 0.2s"
            >
              {country.GN}
            </Text>
          );
        })}
      </VStack>
    </VStack>
  );
};

export default Leagues;
