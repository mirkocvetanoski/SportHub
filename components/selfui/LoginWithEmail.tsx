import { Box } from '@chakra-ui/react';
import FormLayout from './FormLayout';
import LoginWithEmailForm from './LoginWithEmailForm';
import SignupForm from './SignupForm';

import React, { Dispatch, SetStateAction, useState } from 'react';
import { useClickAway } from '@uidotdev/usehooks';
import ForgotPasswordForm from './ForgotPasswordForm';

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
    <FormLayout
      id="center-login-with-email"
      animationDataState={animationDataState}
      openTime={OPEN_ANIMATION}
      closeTime={CLOSED_ANIMATION}
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
    </FormLayout>
  );
};

export default LoginWithEmail;
