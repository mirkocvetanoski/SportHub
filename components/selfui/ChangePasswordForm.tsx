import {
  Box,
  Button,
  Field,
  Flex,
  Popover,
  Stack,
  Text,
} from '@chakra-ui/react';
import { CiLock } from 'react-icons/ci';
import { IoChevronForward } from 'react-icons/io5';
import { PasswordInput } from '../ui/password-input';

import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useColorMode } from '../ui/color-mode';

interface ChildComponentProps {
  changePassword: boolean;
  onSetInformation: Dispatch<SetStateAction<boolean>>;
  onSetChangePassword: Dispatch<SetStateAction<boolean>>;
  onSetDeletion: Dispatch<SetStateAction<boolean>>;
}

const ChangePasswordForm: React.FC<ChildComponentProps> = ({
  changePassword,
  onSetInformation,
  onSetChangePassword,
  onSetDeletion,
}) => {
  const { colorMode } = useColorMode();

  const { data: session } = useSession();

  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  return (
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
            onSetInformation(false);
            onSetChangePassword(!changePassword);
            onSetDeletion(false);
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
              {session?.user?.googleId ? (
                <Text>
                  It looks like you&apos;re signed in with your Google account.
                  Password changes are managed through Google, so you&apos;ll
                  need to update your password in your Google account settings.
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
                      value={oldPassword}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setOldPassword(e.target.value)
                      }
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
                      value={newPassword}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setNewPassword(e.target.value)
                      }
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
  );
};

export default ChangePasswordForm;
