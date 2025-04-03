import {
  Button,
  Field,
  Input,
  VStack,
  Text,
  Separator,
  Flex,
} from '@chakra-ui/react';
import FormBackButton from './FormBackButton';
import FormCloseButton from './FormCloseButton';

import { useColorMode } from '../ui/color-mode';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { ForgotPasswordFormType } from '@/lib/formvalidation';
import validateForgotPassword from '@/lib/validateForgotPassword';

import { OPEN_ANIMATION, CLOSED_ANIMATION } from '@/lib/constants';

interface ChildComponentProps {
  onSetForgotPassword: Dispatch<SetStateAction<boolean>>;
  onSetLoginWithEmail: Dispatch<SetStateAction<boolean>>;
  animationDataState: string;
  onSetAnimationDataState: Dispatch<SetStateAction<string>>;
}

const ForgotPasswordForm: React.FC<ChildComponentProps> = ({
  onSetLoginWithEmail,
  onSetForgotPassword,
  animationDataState,
  onSetAnimationDataState,
}) => {
  const { colorMode } = useColorMode();

  const [email, setEmail] = useState<string>('');

  const [data, setData] = useState<{
    errors?: Record<string, string[]>;
    data?: ForgotPasswordFormType;
  }>({});

  const handleSubmit = async (email: string) => {
    const validationResult = validateForgotPassword(email);
    setData(validationResult);
  };

  return (
    <VStack
      width="100%"
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
      <Flex width="100%" align="center" justify="space-between">
        <FormBackButton
          colorMode={colorMode}
          onSetForgotPassword={onSetForgotPassword}
        />
        <FormCloseButton
          colorMode={colorMode}
          onSetLoginWithEmail={onSetLoginWithEmail}
          onSetAnimationDataState={onSetAnimationDataState}
        />
      </Flex>

      <Text fontSize="xl" fontWeight="semibold" width="full" textAlign="center">
        Reset Password
      </Text>

      <Text fontSize="xs" width="5/6" textAlign="center">
        Don&apos;t worry. Just enter your email address below and we&apos;ll
        send you some instructions.
      </Text>

      <Separator
        height="1px"
        bg="gray.emphasized"
        width="full"
        marginTop={1}
        marginBottom={3}
      />

      <VStack width="85%" paddingX="20px">
        <Field.Root required invalid>
          <Field.Label>
            Email
            <Field.RequiredIndicator />
          </Field.Label>
          <Input
            variant="subtle"
            placeholder="youremail@example.com"
            fontSize="sm"
            border="1px solid"
            borderColor="gray.emphasized"
            outlineWidth="1px"
            outlineColor="gray.500"
            paddingX="10px"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          {data?.errors?.email && (
            <Field.ErrorText fontSize="xx-small">
              {data?.errors?.email[0]}
            </Field.ErrorText>
          )}
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
          onClick={() => handleSubmit(email)}
        >
          <Text fontSize="lg">SEND</Text>
        </Button>
      </VStack>
    </VStack>
  );
};

export default ForgotPasswordForm;
