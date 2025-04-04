'use client';

import { Box, Flex, Spacer, Link } from '@chakra-ui/react';
import Logo from '@/components/selfui/navbar/Logo';
import NavbarIcons from './NavbarIcons';
import { SettingsDetails } from './SettingsDetails';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Login from './Login';
import LoginWithEmail from './LoginWithEmail';
import Search from './Search';
import { BuiltInProviderType } from 'next-auth/providers/index';
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
} from 'next-auth/react';

type NavbarLink = {
  href: string;
  label: string;
};

const navLinks: NavbarLink[] = [
  { href: '/', label: 'Scores' },
  { href: '/news', label: 'News' },
];

const Navbar: React.FC = () => {
  const pathname = usePathname().toLowerCase();
  const [search, setSearch] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(false);
  const [loginWithEmail, setLoginWithEmail] = useState<boolean>(false);
  const [settingsDetails, setSettingsDetails] = useState<boolean>(false);
  const [animationDataState, setAnimationDataState] = useState<string>('');

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

  return (
    <Box as="nav" w="100vw" bg="teal.700" height={100}>
      <Flex align="center" justify="space-between" px="20%" height="inherit">
        <Logo size={3} />

        <Flex
          height="inherit"
          width={40}
          marginLeft={40}
          align="center"
          justify="justify-evenly"
          gap={4}
        >
          {navLinks.map(link => (
            <Link
              color="whiteAlpha.900"
              key={link.href}
              href={link.href}
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
                pathname === link.href.toLowerCase() ? 'yellow.500' : ''
              }
              _hover={{
                bg: 'teal.800', // Hover effect color
              }}
              textTransform="uppercase"
              fontSize="sm"
              outline="none"
            >
              {link.label}
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
