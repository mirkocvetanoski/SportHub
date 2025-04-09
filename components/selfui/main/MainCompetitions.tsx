'use client';

import competitionsIcons from '@/lib/competitionIcons';
import { Text, Icon, Link as ChakraLink, HStack } from '@chakra-ui/react';
import { MdSports } from 'react-icons/md';

import { useColorModeValue } from '@/components/ui/color-mode';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';

type CompetitionName = keyof typeof competitionsIcons;

interface CompetitionsProps {
  competitions: string[];
}

const MainCompetitions: React.FC<CompetitionsProps> = ({ competitions }) => {
  const textColor = useColorModeValue('gray.600', 'whiteAlpha.800');
  const hoverTextColor = useColorModeValue('gray.900', 'gray.400');
  const borderColor = useColorModeValue('orange.500', 'yellow.500');

  const { competition } = useParams();

  const pathname = usePathname();

  const isFavorites = pathname.includes('favorites');

  const competitionName =
    !isFavorites &&
    ((Array.isArray(competition) ? competition[0] : competition || '')
      .replace(/[^a-zA-Z]/g, '')
      .toLowerCase() ||
      'football');

  return competitions.map((competition, i) => {
    const cleanedCompetition = competition
      .replace(/[^a-zA-Z]/g, '')
      .toLowerCase();

    const IconComponent =
      (competitionsIcons[
        competition as CompetitionName
      ] as React.ElementType) || MdSports;

    return (
      <HStack gap={6} width="fit-content" height="inherit" key={i}>
        <Link href={`/${cleanedCompetition}`} passHref legacyBehavior>
          <ChakraLink
            px={1}
            gap={2}
            cursor="pointer"
            height="100%"
            color={
              competitionName === cleanedCompetition ? borderColor : textColor
            }
            borderBottom="2px solid"
            borderColor={
              competitionName === cleanedCompetition
                ? borderColor
                : 'transparent'
            }
            transition="border-color 0.2s"
            _hover={{
              color:
                competitionName === cleanedCompetition ? '' : hoverTextColor,
            }}
            focusRing="none"
          >
            <Icon as={IconComponent} boxSize={5} />
            <Text>{competition}</Text>
          </ChakraLink>
        </Link>
      </HStack>
    );
  });
};

export default MainCompetitions;
