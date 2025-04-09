'use client';

import { Box, Flex, Spacer, Link as ChakraLink, Icon } from '@chakra-ui/react';
import Logo from './Logo';
import NavbarIcons from './NavbarIcons';
import { SettingsDetails } from './SettingsDetails';

import Login from './Login';
import LoginWithEmail from './LoginWithEmail';
import Search from './Search';
import { BuiltInProviderType } from 'next-auth/providers/index';
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
} from 'next-auth/react';
import { MdScoreboard } from 'react-icons/md';
import { GiNewspaper } from 'react-icons/gi';
import { IconType } from 'react-icons/lib';

import { useColorModeValue } from '@/components/ui/color-mode';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type NavbarLink = {
  href: string;
  label: string;
  icon: IconType;
};

const navLinks: NavbarLink[] = [
  { href: '/', label: 'Scores', icon: MdScoreboard },
  { href: '/news', label: 'News', icon: GiNewspaper },
];

const Navbar: React.FC = () => {
  const currentPath = usePathname().toLowerCase();
  const pathname = currentPath !== '/news' ? '/' : currentPath;

  const [mounted, setMounted] = useState(false); // Prevent dark mode hydration mismatch
  const [search, setSearch] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(false);
  const [loginWithEmail, setLoginWithEmail] = useState<boolean>(false);
  const [settingsDetails, setSettingsDetails] = useState<boolean>(false);
  const [animationDataState, setAnimationDataState] = useState<string>('');

  const borderColor = useColorModeValue('orange.500', 'yellow.500');

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    setAuthProviders();
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Box as="nav" w="100vw" bg="teal.700" height={100}>
      <Flex align="center" justify="space-between" px="20%" height="inherit">
        <Logo size={3} />

        <Flex
          height="inherit"
          width="fit-content"
          marginLeft={40}
          align="center"
          justify="justify-evenly"
          gap={2}
        >
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} passHref legacyBehavior>
              <ChakraLink
                color="whiteAlpha.900"
                height="inherit"
                padding={3}
                fontWeight={
                  pathname === link.href.toLowerCase() ? 'bolder' : 'medium'
                }
                bg={
                  pathname === link.href.toLowerCase()
                    ? 'teal.800'
                    : 'transparent'
                }
                borderBottom={
                  pathname === link.href.toLowerCase() ? '3px solid' : ''
                }
                borderColor={
                  mounted && pathname === link.href.toLowerCase()
                    ? borderColor
                    : 'transparent'
                }
                _hover={{
                  bg: 'teal.800', // Hover effect color
                }}
                textTransform="uppercase"
                fontSize="sm"
                outline="none"
              >
                <Icon as={link.icon} boxSize={5} />
                {link.label}
              </ChakraLink>
            </Link>
          ))}
        </Flex>

        <Spacer />

        <NavbarIcons
          search={search}
          onSetSearch={setSearch}
          onSetLogin={setLogin}
          onSetSettingsDetails={setSettingsDetails}
          onSetAnimationDataState={setAnimationDataState}
        />
      </Flex>

      {search && (
        <Search
          onSetSearch={setSearch}
          animationDataState={animationDataState}
          onSetAnimationDataState={setAnimationDataState}
        />
      )}

      {login && (
        <Login
          onSetLogin={setLogin}
          onSetLoginWithEmail={setLoginWithEmail}
          animationDataState={animationDataState}
          onSetAnimationDataState={setAnimationDataState}
          providers={providers}
        />
      )}

      {!login && loginWithEmail && (
        <LoginWithEmail
          onSetLogin={setLogin}
          onSetLoginWithEmail={setLoginWithEmail}
          animationDataState={animationDataState}
          onSetAnimationDataState={setAnimationDataState}
        />
      )}

      {settingsDetails && (
        <SettingsDetails
          onSetSettingsDetails={setSettingsDetails}
          animationDataState={animationDataState}
          onSetAnimationDataState={setAnimationDataState}
        />
      )}
    </Box>
  );
};

export default Navbar;
