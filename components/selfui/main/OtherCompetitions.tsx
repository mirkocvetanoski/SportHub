'use client';

import competitionsIcons from '@/lib/competitionIcons';
import { Button, Icon, Menu, Text, Portal } from '@chakra-ui/react';
import { MdSports } from 'react-icons/md';

import { useColorModeValue } from '@/components/ui/color-mode';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

type CompetitionName = keyof typeof competitionsIcons;

interface CompetitionsProps {
  competitions: string[];
}

const OtherCompetitions: React.FC<CompetitionsProps> = ({ competitions }) => {
  const textColor = useColorModeValue('gray.600', 'whiteAlpha.800');
  const hoverTextColor = useColorModeValue('gray.900', 'gray.400');
  const borderColor = useColorModeValue('orange.500', 'yellow.500');

  const { competition } = useParams();

  const competitionName = (
    Array.isArray(competition) ? competition[0] : competition || ''
  )
    .replace(/[^a-zA-Z]/g, '')
    .toLowerCase();

  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();

  return (
    <Menu.Root
      onExitComplete={() => {
        setMenuOpen(false);
      }}
      onOpenChange={() => {
        setMenuOpen(true);
      }}
    >
      <Menu.Trigger asChild>
        <Button
          height="full"
          px={1}
          variant="outline"
          size="sm"
          color={
            competitions.some(
              competition =>
                competition.replace(/[^a-zA-Z]/g, '').toLowerCase() ===
                competitionName
            )
              ? borderColor
              : textColor
          }
          _hover={{
            color: competitions.some(
              competition =>
                competition.replace(/[^a-zA-Z]/g, '').toLowerCase() ===
                competitionName
            )
              ? borderColor
              : hoverTextColor,
          }}
          focusRing="none"
        >
          More
          {menuOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {competitions.map((competition, i) => {
              const cleanedCompetition = competition
                .replace(/[^a-zA-Z]/g, '')
                .toLowerCase();

              const IconComponent =
                (competitionsIcons[
                  competition as CompetitionName
                ] as React.ElementType) || MdSports;

              return (
                <Menu.Item
                  key={i}
                  value={cleanedCompetition}
                  cursor="pointer"
                  color={
                    competitionName === cleanedCompetition
                      ? borderColor
                      : textColor
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
                      competitionName === cleanedCompetition
                        ? ''
                        : hoverTextColor,
                  }}
                  onClick={() => {
                    router.push(
                      `/${cleanedCompetition.replace(/[^a-zA-Z]/g, '')}`
                    );
                  }}
                >
                  <Icon as={IconComponent} boxSize={5} mr={2} />
                  <Text>{competition}</Text>
                </Menu.Item>
              );
            })}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default OtherCompetitions;
