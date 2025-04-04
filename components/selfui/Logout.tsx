import { Box, Flex, Popover, Text, VStack } from '@chakra-ui/react';
import { useColorMode } from '../ui/color-mode';
import React, { useState } from 'react';
import {
  IoChevronForward,
  IoInformation,
  IoLogOutSharp,
} from 'react-icons/io5';

import { signOut, useSession } from 'next-auth/react';
import { formatDate } from '@/lib/formatTime';
import ChangePasswordForm from './ChangePasswordForm';
import AccountDeletion from './AccountDeletion';

interface ChildComponentProps {
  logoutRef: {};
}

const Logout: React.FC<ChildComponentProps> = ({ logoutRef }) => {
  const { colorMode } = useColorMode();

  const [information, setInformation] = useState<boolean>(false);
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [deletion, setDeletion] = useState<boolean>(false);

  const { data: session } = useSession();

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
                  {session?.user?.email}
                </Text>
                <Text>Member since:</Text>
                <Text fontWeight="medium">
                  {formatDate(session?.user?.createdAt || '')}
                </Text>
              </Popover.Body>
            </VStack>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>

      {/* Change password */}
      <ChangePasswordForm
        changePassword={changePassword}
        onSetInformation={setInformation}
        onSetChangePassword={setChangePassword}
        onSetDeletion={setDeletion}
      />

      {/* Account deletion */}
      <AccountDeletion
        deletion={deletion}
        onSetInformation={setInformation}
        onSetChangePassword={setChangePassword}
        onSetDeletion={setDeletion}
      />

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
