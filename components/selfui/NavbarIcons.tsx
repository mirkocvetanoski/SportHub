import { Box, Flex, IconButton } from '@chakra-ui/react';
import { CiMenuBurger } from 'react-icons/ci';
import { IoLogIn } from 'react-icons/io5';
import { LuSearch, LuUserRoundCheck } from 'react-icons/lu';
import Logout from './Logout';
import SettingsBox from './SettingsBox';

import { useState, Dispatch, SetStateAction } from 'react';
import { useClickAway } from '@uidotdev/usehooks';
import { useSession } from 'next-auth/react';

interface ChildComponentProps {
  search?: boolean;
  onSetSearch: Dispatch<SetStateAction<boolean>>;
  onSetLogin: Dispatch<SetStateAction<boolean>>;
  onSetSettingsDetails: Dispatch<SetStateAction<boolean>>;
  onSetAnimationDataState: Dispatch<SetStateAction<string>>;
}

const NavbarIcons: React.FC<ChildComponentProps> = ({
  search,
  onSetSearch,
  onSetLogin,
  onSetSettingsDetails,
  onSetAnimationDataState,
}) => {
  const [settings, setSettings] = useState<boolean>(false);
  const [logout, setLogout] = useState<boolean>(false);

  const ref: {} = useClickAway(e => {
    if (
      e.target !== document.getElementById('settings-button') &&
      e.target !== document.getElementById('settings-button')?.firstChild
    ) {
      setSettings(false);
    }

    if (
      e.target !== document.getElementById('logout-button') &&
      e.target !== document.getElementById('logout-button')?.firstChild
    ) {
      setLogout(false);
    }
  });

  const { data: session } = useSession();

  const name: string = session?.user?.name || session?.user?.username || 'User';

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
            setLogout(false);
            setSettings(false);
          }}
        >
          <LuSearch />
        </IconButton>

        {!session ? (
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
              onSetLogin(true);
              onSetAnimationDataState('open');
            }}
          >
            <IoLogIn /> Login
          </IconButton>
        ) : (
          <IconButton
            id="logout-button"
            aria-label="Logout"
            color="whiteAlpha.900"
            marginLeft={2}
            paddingX={1}
            size="md"
            variant="outline"
            bg={logout ? 'teal.800' : ''}
            _hover={{
              bg: 'teal.800', // Hover effect color
            }}
            textTransform="uppercase"
            fontSize="sm"
            onClick={() => {
              setLogout(!logout);
              setSettings(false);
              onSetAnimationDataState('open');
            }}
            style={{ textTransform: 'capitalize' }}
          >
            <LuUserRoundCheck />
            {name}
          </IconButton>
        )}

        {logout && <Logout logoutRef={ref} />}

        <IconButton
          id="settings-button"
          color="whiteAlpha.900"
          aria-label="Settings"
          marginLeft={2}
          paddingX={1}
          size="md"
          variant="outline"
          bg={settings ? 'teal.800' : ''}
          _hover={{
            bg: 'teal.800', // Hover effect color
          }}
          textTransform="uppercase"
          onClick={() => {
            setSettings(!settings);
            setLogout(false);
          }}
        >
          <CiMenuBurger />
        </IconButton>
      </Flex>

      {settings && (
        <SettingsBox
          settingsRef={ref}
          onSetSettings={setSettings}
          onSetSettingsDetails={onSetSettingsDetails}
          onSetAnimationDataState={onSetAnimationDataState}
        />
      )}
    </Box>
  );
};

export default NavbarIcons;
