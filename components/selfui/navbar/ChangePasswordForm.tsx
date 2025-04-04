import {
  Box,
  Button,
  ButtonGroup,
  Field,
  Flex,
  Popover,
  Stack,
  Text,
} from '@chakra-ui/react';
import { CiLock } from 'react-icons/ci';
import { IoChevronForward } from 'react-icons/io5';
import { PasswordInput } from '../../ui/password-input';

import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useColorMode } from '../../ui/color-mode';
import validateChangePassword from '@/lib/validateChangePassword';
import { ChangePasswordFormType } from '@/lib/formvalidation';

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
  const [error, setError] = useState<string>('');
  const [loading, setIsLoading] = useState<boolean>(false);

  const [data, setData] = useState<{
    errors?: Record<string, string[]>;
    data?: ChangePasswordFormType;
  }>({});

  const handleSubmit = async (oldPassword: string, newPassword: string) => {
    const validationResult = validateChangePassword(oldPassword, newPassword);
    setData(validationResult);

    if (validationResult?.errors) return;

    try {
      setError('');
      setIsLoading(true);

      const response = await fetch(`/api/users/${session?.user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldPassword: oldPassword,
          newPassword: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Success:', data.message); // Handle success message
        setOldPassword('');
        setNewPassword('');
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
                  <Field.Root required invalid>
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
                    {data?.errors?.oldPassword && (
                      <Field.ErrorText fontSize="xx-small">
                        {data?.errors?.oldPassword[0]}
                      </Field.ErrorText>
                    )}
                  </Field.Root>
                  <Field.Root required invalid>
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
                    {data?.errors?.newPassword?.map(
                      (message: string, i: number) => {
                        return (
                          <Field.ErrorText key={i} fontSize="xx-small">
                            {message}
                          </Field.ErrorText>
                        );
                      }
                    )}
                    {error && (
                      <Field.ErrorText fontSize="xx-small">
                        {error}
                      </Field.ErrorText>
                    )}
                  </Field.Root>
                  <ButtonGroup>
                    <Button
                      variant="surface"
                      loading={loading}
                      loadingText="Changing password..."
                      spinnerPlacement="end"
                      paddingX={4}
                      paddingY={1}
                      _hover={{
                        bg: colorMode === 'dark' ? 'gray.600' : 'gray.300',
                      }}
                      width="full"
                      onClick={() => {
                        handleSubmit(oldPassword, newPassword);
                      }}
                    >
                      Save
                    </Button>
                  </ButtonGroup>
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
