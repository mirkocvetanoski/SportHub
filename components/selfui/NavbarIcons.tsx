import { Box, Flex, IconButton } from '@chakra-ui/react';
import { CiMenuBurger } from 'react-icons/ci';
import { IoLogIn } from 'react-icons/io5';
import { LuSearch } from 'react-icons/lu';
import SettingsBox from './SettingsBox';

import { useState, Dispatch, SetStateAction } from 'react';
import { useClickAway } from '@uidotdev/usehooks';

interface ChildComponentProps {
  search?: boolean;
  onSetSearch: Dispatch<SetStateAction<boolean>>;
  login?: boolean;
  onSetLogin: Dispatch<SetStateAction<boolean>>;
  onSetSettingsDetails: Dispatch<SetStateAction<boolean>>;
  onSetAnimationDataState: Dispatch<SetStateAction<string>>;
}

const NavbarIcons: React.FC<ChildComponentProps> = ({
  search,
  onSetSearch,
  login,
  onSetLogin,
  onSetSettingsDetails,
  onSetAnimationDataState,
}) => {
  const [settings, setSettings] = useState<boolean>(false);

  const settingsRef: {} = useClickAway(e => {
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
          color="whiteAlpha.900"
          paddingX={1}
          size="md"
          variant="outline"
          _hover={{
            bg: 'teal.800', // Hover effect color
          }}
          textTransform="uppercase"
          onClick={() => {
            onSetSearch(!search);
            onSetAnimationDataState('open');
          }}
        >
          <LuSearch />
        </IconButton>

        <IconButton
          aria-label="Login"
          color="whiteAlpha.900"
          marginLeft={2}
          paddingX={1}
          size="md"
          variant="outline"
          _hover={{
            bg: 'teal.800', // Hover effect color
          }}
          textTransform="uppercase"
          fontSize="sm"
          onClick={() => {
            onSetLogin(!login);
            onSetAnimationDataState('open');
          }}
        >
          <IoLogIn /> Login
        </IconButton>

        <IconButton
          id="menu-button"
          color="whiteAlpha.900"
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
          onSetSettings={setSettings}
          onSetSettingsDetails={onSetSettingsDetails}
          onSetAnimationDataState={onSetAnimationDataState}
        />
      )}
    </Box>
  );
};

export default NavbarIcons;
