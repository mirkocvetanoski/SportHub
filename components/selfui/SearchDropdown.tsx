'use client';

import { Button, Menu, Portal } from '@chakra-ui/react';
import { useState } from 'react';
import { IoMdOptions } from 'react-icons/io';

const SeachDropdown = () => {
  const [league, setLeague] = useState('');

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm">
          <IoMdOptions />
          {league === '' || league === 'all'
            ? 'Leagues'
            : league.charAt(0).toUpperCase() + league.slice(1)}
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content minW="10rem">
            <Menu.RadioItemGroup
              value={league}
              onValueChange={e => setLeague(e.value)}
            >
              {items.map(item => (
                <Menu.RadioItem key={item.value} value={item.value}>
                  {item.label}
                  <Menu.ItemIndicator />
                </Menu.RadioItem>
              ))}
            </Menu.RadioItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

const items = [
  { label: 'All', value: 'all' },
  { label: 'France', value: 'france' },
  { label: 'England', value: 'england' },
];

export default SeachDropdown;
