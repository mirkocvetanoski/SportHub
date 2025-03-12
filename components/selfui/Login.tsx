'use client';

import {
  Box,
  Center,
  CloseButton,
  Text,
  Button,
  Separator,
} from '@chakra-ui/react';
import { useColorMode } from '../ui/color-mode';
import { useClickAway } from '@uidotdev/usehooks';

import { FcGoogle } from 'react-icons/fc';
import { MdEmail } from 'react-icons/md';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { signIn } from 'next-auth/react';

interface ChildComponentProps {
  onSetLogin: Dispatch<SetStateAction<boolean>>;
  onSetLoginWithEmail: Dispatch<SetStateAction<boolean>>;
}

const Login: React.FC<ChildComponentProps> = ({
  onSetLogin,
  onSetLoginWithEmail,
}) => {
  const { colorMode } = useColorMode();

  const loginRef: {} = useClickAway(e => {
    if (e.target === document.getElementById('center-login')) {
      onSetLogin(false);
    }
  });

  return (
    <Center
      id="center-login"
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
        ref={loginRef}
        width="400px"
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
        <CloseButton
          alignSelf="flex-end"
          size="lg"
          bg="transparent"
          aria-label="Close"
          marginRight="4px"
          _hover={{
            bg: colorMode === 'dark' ? 'gray.600' : 'gray.300',
          }}
          onClick={() => {
            onSetLogin(false);
          }}
        />
        <Text
          fontSize="xl"
          fontWeight="semibold"
          width="full"
          textAlign="center"
        >
          Unlock the Full Experience
        </Text>
        <Separator
          height="1px"
          bg="gray.emphasized"
          width="full"
          marginTop={1}
          marginBottom={3}
        />
        <Button
          variant="surface"
          loadingText="Redirecting..."
          spinnerPlacement="end"
          paddingX={4}
          paddingY={1}
          _hover={{
            bg: colorMode === 'dark' ? 'gray.600' : 'gray.300',
          }}
          width="3/6"
          onClick={() => {
            signIn('google');
          }}
        >
          <FcGoogle aria-label="google" />
          <Text marginLeft="auto"> Sign in with Google</Text>
        </Button>
        <Button
          variant="surface"
          loadingText="Redirecting..."
          spinnerPlacement="end"
          paddingX={4}
          paddingY={1}
          _hover={{
            bg: colorMode === 'dark' ? 'gray.600' : 'gray.300',
          }}
          width="3/6"
          onClick={() => {
            onSetLogin(false);
            onSetLoginWithEmail(true);
          }}
        >
          <MdEmail aria-label="email" />
          <Text marginLeft="auto"> Sign in with Email</Text>
        </Button>
        <Text
          width="full"
          fontSize="10px"
          padding={4}
          textAlign="center"
          letterSpacing="0.1px"
        >
          By clicking on any &quot;Continue with&quot; button, you agree to the
          <Link href="/" className="mx-1 text-blue-600 underline">
            Terms of Use
          </Link>
          and acknowledge our
          <Link href="/" className="mx-1 text-blue-600 underline">
            Privacy Policy
          </Link>
          on our website.
        </Text>
      </Box>
    </Center>
  );
};

export default Login;
