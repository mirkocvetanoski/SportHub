import { Box, Flex, IconButton } from '@chakra-ui/react';
import { CiMenuBurger } from 'react-icons/ci';
import { IoLogIn } from 'react-icons/io5';
import { LuSearch } from 'react-icons/lu';

import { useState } from 'react';
import { useClickAway } from '@uidotdev/usehooks';
import SettingsBox from './SettingsBox';

const NavbarIcons = () => {
  const [settings, setSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const settingsRef = useClickAway(e => {
    if (
      e.target !== document.getElementById('menu-button') &&
      e.target !== document.getElementById('menu-button')?.firstChild
    ) {
      setSettings(false);
    }
  });

  return (
    <Box position="relative">
      <Flex>
        <IconButton
          aria-label="Search"
          paddingX={1}
          size="md"
          variant="outline"
          _hover={{
            bg: 'teal.800', // Hover effect color
          }}
          textTransform="uppercase"
        >
          <LuSearch />
        </IconButton>

        <IconButton
          aria-label="Login"
          marginLeft={2}
          paddingX={1}
          size="md"
          variant="outline"
          _hover={{
            bg: 'teal.800', // Hover effect color
          }}
          textTransform="uppercase"
          fontSize="sm"
        >
          <IoLogIn /> Login
        </IconButton>

        <IconButton
          id="menu-button"
          aria-label="Menu"
          marginLeft={2}
          paddingX={1}
          size="md"
          variant="outline"
          bg={settings ? 'teal.800' : ''}
          _hover={{
            bg: 'teal.800', // Hover effect color
          }}
          textTransform="uppercase"
          onClick={() => setSettings(!settings)}
        >
          <CiMenuBurger />
        </IconButton>
      </Flex>

      {settings && (
        <SettingsBox
          settingsRef={settingsRef}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}
    </Box>
  );
};

export default NavbarIcons;
