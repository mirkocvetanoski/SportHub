'use client';

import competitionsIcons from '@/lib/competitionIcons';
import { Flex, Text, Icon } from '@chakra-ui/react';

type CompetitionName = keyof typeof competitionsIcons;

interface CompetitionProps {
  competition: string;
}

const Competition: React.FC<CompetitionProps> = ({ competition }) => {
  const IconComponent = competitionsIcons[competition as CompetitionName];

  return (
    <Flex
      align="center"
      gap={2}
      cursor="pointer"
      height="100%"
      borderBottom="2px solid"
      borderColor="transparent"
      transition="colors"
      _hover={{
        borderColor: 'yellow.500',
      }}
    >
      {IconComponent && <Icon as={IconComponent} boxSize={5} />}
      <Text>{competition}</Text>
    </Flex>
  );
};

export default Competition;
