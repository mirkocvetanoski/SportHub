'use client';

import competitionsIcons from '@/lib/competitionIcons';
import { Flex, Text, Icon, ClientOnly } from '@chakra-ui/react';
import { MdSports } from 'react-icons/md';

import { useColorModeValue } from '@/components/ui/color-mode';
import { useState } from 'react';

type CompetitionName = keyof typeof competitionsIcons;

interface CompetitionsProps {
  competitions: string[];
}

const MainCompetitions: React.FC<CompetitionsProps> = ({ competitions }) => {
  const textColor = useColorModeValue('gray.600', 'whiteAlpha.800');
  const hoverTextColor = useColorModeValue('gray.900', 'gray.400');
  const borderColor = useColorModeValue('orange.500', 'yellow.500');

  const [active, setActive] = useState<string>('Football');

  return competitions.map((competition, i) => {
    const IconComponent =
      (competitionsIcons[
        competition as CompetitionName
      ] as React.ElementType) || MdSports;

    return (
      <ClientOnly key={i}>
        <Flex
          data-competition={competition}
          align="center"
          px={1}
          gap={2}
          cursor="pointer"
          height="100%"
          color={active === competition ? borderColor : textColor}
          borderBottom="2px solid"
          borderColor={active === competition ? borderColor : 'transparent'}
          transition="border-color 0.2s"
          _hover={{
            color: active === competition ? '' : hoverTextColor,
          }}
          onClick={e => {
            setActive(e.currentTarget.dataset.competition || 'Football');
          }}
        >
          <Icon as={IconComponent} boxSize={5} />
          <Text>{competition}</Text>
        </Flex>
      </ClientOnly>
    );
  });
};

export default MainCompetitions;
