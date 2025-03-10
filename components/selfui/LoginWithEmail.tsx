import {
  Box,
  Center,
  CloseButton,
  Flex,
  IconButton,
  Separator,
  Text,
} from '@chakra-ui/react';
import React, { Dispatch, SetStateAction } from 'react';

import { useColorMode } from '../ui/color-mode';
import { MdArrowBack } from 'react-icons/md';
import { useClickAway } from '@uidotdev/usehooks';

interface ChildComponentProps {
  onSetLogin: Dispatch<SetStateAction<boolean>>;
  onSetLoginWithEmail: Dispatch<SetStateAction<boolean>>;
}

const LoginWithEmail: React.FC<ChildComponentProps> = ({
  onSetLogin,
  onSetLoginWithEmail,
}) => {
  const { colorMode } = useColorMode();

  const loginWithEmailRef: {} = useClickAway(e => {
    if (e.target === document.getElementById('center-login-with-email')) {
      onSetLoginWithEmail(false);
    }
  });

  return (
    <Center
      id="center-login-with-email"
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      right="0"
      bottom="0"
      bg="blackAlpha.600" // Semi-transparent black background
      zIndex="overlay" // Ensures it's above everything
    >
      <Box
        ref={loginWithEmailRef}
        width="1/6"
        height="2/4"
        flexDirection="column"
        bg="gray.subtle"
        rounded="md"
        display="flex"
        flexDir="column"
        alignItems="center"
        gap={2}
        paddingY={4}
      >
        <Flex width="100%" align="center" justify="space-between">
          <IconButton
            aria-label="back"
            alignSelf="flex-start"
            marginLeft="4px"
            size="lg"
            bg="transparent"
            _hover={{
              bg: colorMode === 'dark' ? 'gray.600' : 'gray.300',
            }}
            onClick={() => {
              onSetLogin(true);
              onSetLoginWithEmail(false);
            }}
          >
            <MdArrowBack />
          </IconButton>
          <CloseButton
            aria-label="Close"
            alignSelf="flex-end"
            marginRight="4px"
            size="lg"
            bg="transparent"
            _hover={{
              bg: colorMode === 'dark' ? 'gray.600' : 'gray.300',
            }}
            onClick={() => {
              onSetLoginWithEmail(false);
            }}
          />
        </Flex>
        <Text
          fontSize="xl"
          fontWeight="semibold"
          width="full"
          textAlign="center"
        >
          Log in to an existing account
        </Text>
        <Separator
          height="1px"
          bg="gray.emphasized"
          width="full"
          marginTop={1}
          marginBottom={3}
        />
      </Box>
    </Center>
  );
};

export default LoginWithEmail;
