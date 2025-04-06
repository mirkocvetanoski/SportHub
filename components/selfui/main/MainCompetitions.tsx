'use client';

import competitionsIcons from '@/lib/competitionIcons';
import { Flex, Text, Icon } from '@chakra-ui/react';
import { MdSports } from 'react-icons/md';

import { useColorMode } from '@/components/ui/color-mode';

type CompetitionName = keyof typeof competitionsIcons;

interface CompetitionsProps {
  competitions: string[];
}

const MainCompetitions: React.FC<CompetitionsProps> = ({ competitions }) => {
  const { colorMode } = useColorMode();

  return competitions.map((competition, i) => {
    const IconComponent =
      (competitionsIcons[
        competition as CompetitionName
      ] as React.ElementType) || MdSports;

    return (
      <Flex
        key={i}
        align="center"
        px={1}
        gap={2}
        cursor="pointer"
        height="100%"
        color={colorMode === 'dark' ? 'whiteAlpha.800' : 'gray.600'}
        borderBottom="2px solid"
        borderColor="transparent"
        transition="border-color 0.2s"
        _hover={{
          color: colorMode === 'dark' ? 'gray.400' : 'gray.900',
          borderColor: colorMode === 'dark' ? 'yellow.500' : 'orange.600',
        }}
      >
        <Icon as={IconComponent} boxSize={5} />
        <Text>{competition}</Text>
      </Flex>
    );
  });
};

export default MainCompetitions;
