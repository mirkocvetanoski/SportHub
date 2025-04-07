'use client';

import competitionsIcons from '@/lib/competitionIcons';
import { Button, Icon, Menu, Text, Portal, ClientOnly } from '@chakra-ui/react';
import { MdSports } from 'react-icons/md';

import { useState } from 'react';
import { useColorModeValue } from '@/components/ui/color-mode';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

type CompetitionName = keyof typeof competitionsIcons;

interface CompetitionsProps {
  competitions: string[];
}

const OtherCompetitions: React.FC<CompetitionsProps> = ({ competitions }) => {
  const textColor = useColorModeValue('gray.600', 'whiteAlpha.800');
  const hoverTextColor = useColorModeValue('gray.900', 'gray.400');
  const borderColor = useColorModeValue('orange.500', 'yellow.500');

  const [active, setActive] = useState<string>('Football');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <ClientOnly>
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
            color={competitions.includes(active) ? borderColor : textColor}
            _hover={{
              color: competitions.includes(active)
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
                const IconComponent =
                  (competitionsIcons[
                    competition as CompetitionName
                  ] as React.ElementType) || MdSports;

                return (
                  <Menu.Item
                    key={i}
                    value={competition}
                    data-competition={competition}
                    cursor="pointer"
                    color={active === competition ? borderColor : textColor}
                    borderBottom="2px solid"
                    borderColor={
                      active === competition ? borderColor : 'transparent'
                    }
                    transition="border-color 0.2s"
                    _hover={{
                      color: active === competition ? '' : hoverTextColor,
                    }}
                    onClick={e => {
                      setActive(
                        e.currentTarget.dataset.competition || 'Football'
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
    </ClientOnly>
  );
};

export default OtherCompetitions;
