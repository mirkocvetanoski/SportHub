import { Box, Text, Button, Separator } from '@chakra-ui/react';
import FormLayout from './FormLayout';
import FormCloseButton from './FormCloseButton';
import { FcGoogle } from 'react-icons/fc';
import { MdEmail } from 'react-icons/md';
import Link from 'next/link';

import { useClickAway } from '@uidotdev/usehooks';
import { useColorMode } from '../ui/color-mode';
import { Dispatch, SetStateAction } from 'react';
import { ClientSafeProvider, LiteralUnion, signIn } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers/index';

import { OPEN_ANIMATION, CLOSED_ANIMATION } from '@/lib/constants';

interface ChildComponentProps {
  onSetLogin: Dispatch<SetStateAction<boolean>>;
  onSetLoginWithEmail: Dispatch<SetStateAction<boolean>>;
  animationDataState: string;
  onSetAnimationDataState: Dispatch<SetStateAction<string>>;
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}

const Login: React.FC<ChildComponentProps> = ({
  onSetLogin,
  onSetLoginWithEmail,
  animationDataState,
  onSetAnimationDataState,
  providers,
}) => {
  const { colorMode } = useColorMode();

  const loginRef: {} = useClickAway(e => {
    if (e.target === document.getElementById('center-login')) {
      setTimeout(() => {
        onSetLogin(false);
      }, CLOSED_ANIMATION);
      onSetAnimationDataState('closed');
    }
  });

  return (
    <FormLayout
      id="center-login"
      animationDataState={animationDataState}
      openTime={OPEN_ANIMATION}
      closeTime={CLOSED_ANIMATION}
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
        data-state={animationDataState}
        _open={{
          animationName: 'fade-in, scale-in',
          animationDuration: `${OPEN_ANIMATION}ms`,
        }}
        _closed={{
          animationName: 'fade-out, scale-out',
          animationDuration: `${CLOSED_ANIMATION}ms`,
        }}
      >
        <FormCloseButton
          colorMode={colorMode}
          onSetLogin={onSetLogin}
          onSetAnimationDataState={onSetAnimationDataState}
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

        {providers &&
          Object.values(providers)?.map(provider =>
            provider.id === 'google' ? (
              <Button
                key={provider.id}
                variant="surface"
                paddingX={4}
                paddingY={1}
                _hover={{
                  bg: colorMode === 'dark' ? 'gray.600' : 'gray.300',
                }}
                width="3/6"
                onClick={() => {
                  signIn(provider.id);
                }}
              >
                <FcGoogle aria-label="google" />
                <Text marginLeft="auto"> Sign in with Google</Text>
              </Button>
            ) : provider.id === 'credentials' ? (
              <Button
                key={provider.id}
                variant="surface"
                paddingX={4}
                paddingY={1}
                _hover={{
                  bg: colorMode === 'dark' ? 'gray.600' : 'gray.300',
                }}
                width="3/6"
                onClick={() => {
                  onSetLogin(false);
                  onSetLoginWithEmail(true);
                  onSetAnimationDataState('');
                }}
              >
                <MdEmail aria-label="email" />
                <Text marginLeft="auto"> Sign in with Email</Text>
              </Button>
            ) : null
          )}

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
    </FormLayout>
  );
};

export default Login;
