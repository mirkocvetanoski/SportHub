'use client';

import competitionsIcons from '@/lib/competitionIcons';
import { Flex, Text, Icon } from '@chakra-ui/react';
import { MdSports } from 'react-icons/md';

import { useColorModeValue } from '@/components/ui/color-mode';

type CompetitionName = keyof typeof competitionsIcons;

interface CompetitionsProps {
  competitions: string[];
}

const MainCompetitions: React.FC<CompetitionsProps> = ({ competitions }) => {
  const textColor = useColorModeValue('gray.600', 'whiteAlpha.800');
  const hoverTextColor = useColorModeValue('gray.900', 'gray.400');
  const borderColor = useColorModeValue('orange.500', 'yellow.500');

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
        color={textColor}
        borderBottom="2px solid"
        borderColor="transparent"
        transition="border-color 0.2s"
        _hover={{
          color: hoverTextColor,
          borderColor: borderColor,
        }}
      >
        <Icon as={IconComponent} boxSize={5} />
        <Text>{competition}</Text>
      </Flex>
    );
  });
};

export default MainCompetitions;
