import { Box, Button, Flex, Popover, Text, VStack } from '@chakra-ui/react';
import { useColorMode } from '../ui/color-mode';
import React, { useEffect, useState } from 'react';
import {
  IoChevronForward,
  IoInformation,
  IoLogOutSharp,
} from 'react-icons/io5';
import { CiLock } from 'react-icons/ci';
import { MdDeleteForever } from 'react-icons/md';
import { signOut, useSession } from 'next-auth/react';

interface ChildComponentProps {
  logoutRef: {};
}

interface MyObject {
  email: string;
  createdAt: string;
}

const Logout: React.FC<ChildComponentProps> = ({ logoutRef }) => {
  const { colorMode } = useColorMode();

  const [information, setInformation] = useState<boolean>(false);
  const [deletion, setDeletion] = useState<boolean>(false);

  const [user, setUser] = useState<MyObject | null>(null);

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

  useEffect(() => {
    const handleInformation = async (): Promise<void> => {
      try {
        const response = await fetch(`/api/users/${session?.user.id}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${await response.text()}`);
        }

        const data = await response.json();
        setUser(JSON.parse(data));
      } catch (error) {
        console.error('Failed to find user:', error);
      }
    };

    handleInformation();
  }, [session?.user.id]);

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
      <Popover.Root positioning={{ sameWidth: true }} lazyMount unmountOnExit>
        <Popover.Trigger asChild>
          <Flex
            alignItems="center"
            gap={2}
            paddingX={1}
            paddingY={1}
            cursor="pointer"
            borderRadius="inherit"
            bg={
              colorMode === 'dark' && information
                ? 'gray.600'
                : colorMode === 'light' && information
                  ? 'gray.300'
                  : ''
            }
            _hover={{ bg: `${colorMode === 'dark' ? 'gray.600' : 'gray.300'}` }}
            onClick={() => {
              setInformation(!information);
              setDeletion(false);
            }}
          >
            <IoInformation aria-label="Account Information" />
            <Text fontWeight="light" fontSize="smaller">
              Account information
            </Text>
            <Box marginLeft="auto">
              <IoChevronForward aria-label="Arrow right" size={18} />
            </Box>
          </Flex>
        </Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content width="100%">
            <VStack width="100%">
              <Popover.Arrow />
              <Popover.Body width="100%" fontSize="xs" fontWeight="bold">
                <Text>Email:</Text>
                <Text fontWeight="medium">{user?.email}</Text>
                <Text>Member since:</Text>
                <Text fontWeight="medium">{user?.createdAt}</Text>
              </Popover.Body>
            </VStack>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>

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

      <Popover.Root positioning={{ sameWidth: true }} lazyMount unmountOnExit>
        <Popover.Trigger asChild>
          <Flex
            alignItems="center"
            gap={2}
            paddingX={1}
            paddingY={1}
            cursor="pointer"
            borderRadius="inherit"
            bg={
              colorMode === 'dark' && deletion
                ? 'gray.600'
                : colorMode === 'light' && deletion
                  ? 'gray.300'
                  : ''
            }
            _hover={{
              bg: `${colorMode === 'dark' ? 'gray.600' : 'gray.300'}`,
            }}
            onClick={() => {
              setDeletion(!deletion);
              setInformation(false);
            }}
          >
            <MdDeleteForever aria-label="Account Deletion" />
            <Text fontWeight="light" fontSize="smaller">
              Account Deletion
            </Text>
            <Box marginLeft="auto">
              <IoChevronForward aria-label="Arrow right" size={18} />
            </Box>
          </Flex>
        </Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content width="100%">
            <VStack width="100%">
              <Popover.Arrow />
              <Popover.Body fontSize="xs">
                Are you sure you want to delete your profile? This action is
                permanent and cannot be undone. If you are sure, please confirm
                below.
              </Popover.Body>
              <Button
                alignSelf="center"
                marginBottom={5}
                bg="red.500"
                w="192px"
                _hover={{
                  bg: 'red.600',
                }}
                onClick={handleDeletion}
              >
                Delete
              </Button>
            </VStack>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>

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
