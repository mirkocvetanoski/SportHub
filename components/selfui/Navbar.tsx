'use client';

import { Box, Flex, Spacer, Link } from '@chakra-ui/react';
import Logo from '@/components/selfui/Logo';
import NavbarIcons from './NavbarIcons';

import { usePathname } from 'next/navigation';

// Define the type for the navigation links
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

  return (
    <Box as="nav" w="100%" bg="teal.700" height={100}>
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
              key={link.href}
              href={link.href}
              height="inherit"
              padding={3}
              fontWeight={
                pathname === link.href.toLowerCase() ? 'bold' : 'medium'
              }
              bg={
                pathname === link.href.toLowerCase()
                  ? 'teal.800'
                  : 'transparent'
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

        <NavbarIcons />
      </Flex>
    </Box>
  );
};

export default Navbar;
