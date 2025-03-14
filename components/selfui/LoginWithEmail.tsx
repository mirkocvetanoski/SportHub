import { Box, Center } from '@chakra-ui/react';
import LoginWithEmailForm from './LoginWithEmailForm';
import React, { Dispatch, SetStateAction, useState } from 'react';

import { useClickAway } from '@uidotdev/usehooks';
import ForgotPasswordForm from './ForgotPasswordForm';
import SignupForm from './SignupForm';

import { OPEN_ANIMATION, CLOSED_ANIMATION } from '@/lib/constants';

interface ChildComponentProps {
  onSetLogin: Dispatch<SetStateAction<boolean>>;
  onSetLoginWithEmail: Dispatch<SetStateAction<boolean>>;
  animationDataState: string;
  onSetAnimationDataState: Dispatch<SetStateAction<string>>;
}

const LoginWithEmail: React.FC<ChildComponentProps> = ({
  onSetLogin,
  onSetLoginWithEmail,
  animationDataState,
  onSetAnimationDataState,
}) => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [signup, setSignup] = useState(false);

  const loginWithEmailRef: {} = useClickAway(e => {
    if (e.target === document.getElementById('center-login-with-email')) {
      setTimeout(() => {
        onSetLoginWithEmail(false);
      }, CLOSED_ANIMATION);
      onSetAnimationDataState('closed');
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
      <Box
        ref={loginWithEmailRef}
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
        {!forgotPassword && !signup && (
          <LoginWithEmailForm
            onSetLogin={onSetLogin}
            onSetLoginWithEmail={onSetLoginWithEmail}
            onSetForgotPassword={setForgotPassword}
            onSetSignup={setSignup}
            animationDataState={animationDataState}
            onSetAnimationDataState={onSetAnimationDataState}
          />
        )}

        {forgotPassword && (
          <ForgotPasswordForm
            onSetForgotPassword={setForgotPassword}
            onSetLoginWithEmail={onSetLoginWithEmail}
            animationDataState={animationDataState}
            onSetAnimationDataState={onSetAnimationDataState}
          />
        )}

        {!forgotPassword && signup && (
          <SignupForm
            onSetLoginWithEmail={onSetLoginWithEmail}
            onSetSignup={setSignup}
            animationDataState={animationDataState}
            onSetAnimationDataState={onSetAnimationDataState}
          />
        )}
      </Box>
    </Center>
  );
};

export default LoginWithEmail;
