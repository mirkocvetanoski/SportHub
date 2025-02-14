import { Flex, IconButton } from '@chakra-ui/react';
import { CiMenuBurger } from 'react-icons/ci';
import { IoLogIn } from 'react-icons/io5';
import { LuSearch } from 'react-icons/lu';

const NavbarIcons = () => {
  return (
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
        aria-label="Menu"
        marginLeft={2}
        paddingX={1}
        size="md"
        variant="outline"
        _hover={{
          bg: 'teal.800', // Hover effect color
        }}
        textTransform="uppercase"
      >
        <CiMenuBurger />
      </IconButton>
    </Flex>
  );
};

export default NavbarIcons;
