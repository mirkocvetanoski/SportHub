import {
  Box,
  Button,
  Field,
  Flex,
  Popover,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
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
import { formatDate } from '@/lib/formatTime';
import { PasswordInput } from '../ui/password-input';

interface ChildComponentProps {
  logoutRef: {};
}

interface MyObject {
  googleId: string;
  email: string;
  createdAt: string;
}

const Logout: React.FC<ChildComponentProps> = ({ logoutRef }) => {
  const { colorMode } = useColorMode();

  const [information, setInformation] = useState<boolean>(false);
  const [changePassword, setChangePassword] = useState<boolean>(false);
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
      {/* Account information */}
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
              setChangePassword(false);
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
                <Text fontWeight="medium" marginBottom={2}>
                  {user?.email}
                </Text>
                <Text>Member since:</Text>
                <Text fontWeight="medium">
                  {formatDate(user?.createdAt || '')}
                </Text>
              </Popover.Body>
            </VStack>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>

      {/* Change password */}
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
              colorMode === 'dark' && changePassword
                ? 'gray.600'
                : colorMode === 'light' && changePassword
                  ? 'gray.300'
                  : ''
            }
            _hover={{
              bg: `${colorMode === 'dark' ? 'gray.600' : 'gray.300'}`,
            }}
            onClick={() => {
              setInformation(false);
              setChangePassword(!changePassword);
              setDeletion(false);
            }}
          >
            <CiLock aria-label="Change Password" />
            <Text fontWeight="light" fontSize="smaller">
              Change password
            </Text>
            <Box marginLeft="auto">
              <IoChevronForward aria-label="Arrow right" size={18} />
            </Box>
          </Flex>
        </Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content width="100%">
            <Popover.Arrow />
            <Popover.Body>
              <Stack gap="4">
                {user?.googleId ? (
                  <Text>
                    It looks like you&apos;re signed in with your Google
                    account. Password changes are managed through Google, so
                    you&apos;ll need to update your password in your Google
                    account settings.
                  </Text>
                ) : (
                  <>
                    <Field.Root>
                      <Field.Label>Old Password</Field.Label>
                      <PasswordInput
                        variant="subtle"
                        placeholder="youroldpassword"
                        fontSize="sm"
                        border="1px solid"
                        borderColor="gray.emphasized"
                        outlineWidth="1px"
                        outlineColor="gray.500"
                        paddingX="10px"
                      />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>New Password</Field.Label>
                      <PasswordInput
                        variant="subtle"
                        placeholder="yournewpassword"
                        fontSize="sm"
                        border="1px solid"
                        borderColor="gray.emphasized"
                        outlineWidth="1px"
                        outlineColor="gray.500"
                        paddingX="10px"
                      />
                    </Field.Root>
                    <Button
                      variant="surface"
                      loadingText="Redirecting..."
                      spinnerPlacement="end"
                      paddingX={4}
                      paddingY={1}
                      _hover={{
                        bg: colorMode === 'dark' ? 'gray.600' : 'gray.300',
                      }}
                      width="full"
                    >
                      Save
                    </Button>
                  </>
                )}
              </Stack>
            </Popover.Body>
            <Popover.CloseTrigger />
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>

      {/* Account deletion */}
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
              setInformation(false);
              setChangePassword(false);
              setDeletion(!deletion);
            }}
          >
            <MdDeleteForever aria-label="Account Deletion" />
            <Text fontWeight="light" fontSize="smaller">
              Account deletion
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

      {/* Logout */}
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
          setInformation(false);
          setChangePassword(false);
          setDeletion(false);
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
