'use client';

import { Box, Flex, Spacer, Link } from '@chakra-ui/react';
import Logo from '@/components/selfui/Logo';
import NavbarIcons from './NavbarIcons';
import { SettingsDetails } from './SettingsDetails';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Login from './Login';

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
  const [settingsDetails, setSettingsDetails] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(false);

  return (
    <Box as="nav" w="100vw" bg="teal.700" height={100}>
      <Flex align="center" justify="space-between" px="20%" height="inherit">
        <Logo />

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
          onSetSettingsDetails={setSettingsDetails}
          onSetLogin={setLogin}
        />
      </Flex>

      {login && <Login onSetLogin={setLogin} />}

      {settingsDetails && (
        <SettingsDetails onSetSettingsDetails={setSettingsDetails} />
      )}
    </Box>
  );
};

export default Navbar;
