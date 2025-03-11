import { Box, Center } from '@chakra-ui/react';
import LoginWithEmailForm from './LoginWithEmailForm';
import React, { Dispatch, SetStateAction, useState } from 'react';

import { useClickAway } from '@uidotdev/usehooks';
import ForgotPasswordForm from './ForgotPasswordForm';

interface ChildComponentProps {
  onSetLogin: Dispatch<SetStateAction<boolean>>;
  onSetLoginWithEmail: Dispatch<SetStateAction<boolean>>;
}

const LoginWithEmail: React.FC<ChildComponentProps> = ({
  onSetLogin,
  onSetLoginWithEmail,
}) => {
  const [forgotPassword, setForgotPassword] = useState(false);

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
        {!forgotPassword && (
          <LoginWithEmailForm
            onSetLogin={onSetLogin}
            onSetLoginWithEmail={onSetLoginWithEmail}
            onSetForgotPassword={setForgotPassword}
          />
        )}

        {forgotPassword && (
          <ForgotPasswordForm
            onSetForgotPassword={setForgotPassword}
            onSetLoginWithEmail={onSetLoginWithEmail}
          />
        )}
      </Box>
    </Center>
  );
};

export default LoginWithEmail;
