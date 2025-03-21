import { Box, Flex, Text } from '@chakra-ui/react';
import { useColorMode } from '../ui/color-mode';
import React from 'react';
import {
  IoChevronForward,
  IoInformation,
  IoLogOutSharp,
} from 'react-icons/io5';
import { CiLock } from 'react-icons/ci';
import { MdDeleteForever } from 'react-icons/md';
import { signOut, useSession } from 'next-auth/react';

interface ChildComponentProps {
  logoutRef: React.RefObject<HTMLDivElement>; // Adjusted the type for logoutRef
}

const Logout: React.FC<ChildComponentProps> = ({ logoutRef }) => {
  const { colorMode } = useColorMode();
  const { data: session } = useSession();

  const handleDeletion = async (): Promise<void> => {
    try {
      const response = await fetch(`/api/users/${session?.user.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${await response.text()}`);
      }

      console.log('User deleted successfully');
      signOut();
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  return (
    <Box
      ref={logoutRef}
      position="absolute"
      top="50px"
      right="48px"
      border="1px solid"
      borderColor="border.emphasized"
      borderRadius={10}
      width="250px"
      padding={2}
      bg={colorMode === 'dark' ? 'blackAlpha.700' : 'whiteAlpha.700'}
    >
      <Flex
        alignItems="center"
        gap={2}
        paddingX={1}
        paddingY={1}
        cursor="pointer"
        borderRadius="inherit"
        _hover={{ bg: `${colorMode === 'dark' ? 'gray.600' : 'gray.300'}` }}
        onClick={() => {}}
      >
        <IoInformation aria-label="Account Information" />
        <Text fontWeight="light" fontSize="smaller">
          Account information
        </Text>
        <Box marginLeft="auto">
          <IoChevronForward aria-label="Arrow right" size={18} />
        </Box>
      </Flex>

      <Flex
        alignItems="center"
        gap={2}
        paddingX={1}
        paddingY={1}
        cursor="pointer"
        borderRadius="inherit"
        _hover={{ bg: `${colorMode === 'dark' ? 'gray.600' : 'gray.300'}` }}
        onClick={() => {}}
      >
        <CiLock aria-label="Change Password" />
        <Text fontWeight="light" fontSize="smaller">
          Change password
        </Text>
        <Box marginLeft="auto">
          <IoChevronForward aria-label="Arrow right" size={18} />
        </Box>
      </Flex>

      <Flex
        alignItems="center"
        gap={2}
        paddingX={1}
        paddingY={1}
        cursor="pointer"
        borderRadius="inherit"
        _hover={{ bg: `${colorMode === 'dark' ? 'gray.600' : 'gray.300'}` }}
        onClick={handleDeletion}
      >
        <MdDeleteForever aria-label="Account Deletion" />
        <Text fontWeight="light" fontSize="smaller">
          Account Deletion
        </Text>
        <Box marginLeft="auto">
          <IoChevronForward aria-label="Arrow right" size={18} />
        </Box>
      </Flex>

      <Flex
        alignItems="center"
        gap={2}
        paddingX={1}
        paddingY={1}
        cursor="pointer"
        borderRadius="inherit"
        color="red.500"
        _hover={{ bg: `${colorMode === 'dark' ? 'gray.600' : 'gray.300'}` }}
        onClick={() => {
          signOut(); // Sign out without deleting if this is just for logout
        }}
      >
        <IoLogOutSharp aria-label="Logout" />
        <Text fontWeight="light" fontSize="smaller">
          Logout
        </Text>
      </Flex>
    </Box>
  );
};

export default Logout;
