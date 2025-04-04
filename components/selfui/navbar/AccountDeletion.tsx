import {
  Box,
  Button,
  Flex,
  Popover,
  VStack,
  Text,
  ButtonGroup,
} from '@chakra-ui/react';
import { IoChevronForward } from 'react-icons/io5';
import { MdDeleteForever } from 'react-icons/md';

import React, { Dispatch, SetStateAction, useState } from 'react';
import { useColorMode } from '../../ui/color-mode';
import { signOut, useSession } from 'next-auth/react';

interface ChildComponentProps {
  deletion: boolean;
  onSetInformation: Dispatch<SetStateAction<boolean>>;
  onSetChangePassword: Dispatch<SetStateAction<boolean>>;
  onSetDeletion: Dispatch<SetStateAction<boolean>>;
}

const AccountDeletion: React.FC<ChildComponentProps> = ({
  deletion,
  onSetInformation,
  onSetChangePassword,
  onSetDeletion,
}) => {
  const { colorMode } = useColorMode();

  const { data: session } = useSession();

  const [loading, setIsLoading] = useState<boolean>(false);

  const handleDeletion = async (id?: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${await response.text()}`);
      }

      signOut();
    } catch (error) {
      console.error('Failed to delete user:', error);
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
            onSetInformation(false);
            onSetChangePassword(false);
            onSetDeletion(!deletion);
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
            <ButtonGroup>
              <Button
                loading={loading}
                loadingText="Deleting account..."
                spinnerPlacement="end"
                alignSelf="center"
                marginBottom={5}
                bg="red.500"
                w="192px"
                _hover={{
                  bg: 'red.600',
                }}
                onClick={() => {
                  handleDeletion(session?.user.id);
                }}
              >
                Delete
              </Button>
            </ButtonGroup>
          </VStack>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
};

export default AccountDeletion;
