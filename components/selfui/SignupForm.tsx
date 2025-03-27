import {
  Button,
  Field,
  Input,
  VStack,
  Text,
  Separator,
  HStack,
  Flex,
} from '@chakra-ui/react';
import FormBackButton from './FormBackButton';
import FormCloseButton from './FormCloseButton';
import { PasswordInput } from '@/components/ui/password-input';

import { useColorMode } from '../ui/color-mode';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import validateSignupFields from '@/lib/validateSignUp';
import { RegisterFormType } from '@/lib/formvalidation';
import { signIn } from 'next-auth/react';

import { OPEN_ANIMATION, CLOSED_ANIMATION } from '@/lib/constants';

interface ChildComponentProps {
  onSetLoginWithEmail: Dispatch<SetStateAction<boolean>>;
  onSetSignup: Dispatch<SetStateAction<boolean>>;
  animationDataState: string;
  onSetAnimationDataState: Dispatch<SetStateAction<string>>;
}

const SignupForm: React.FC<ChildComponentProps> = ({
  onSetLoginWithEmail,
  onSetSignup,
  animationDataState,
  onSetAnimationDataState,
}) => {
  const { colorMode } = useColorMode();

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [data, setData] = useState<{
    errors?: Record<string, string[]>;
    data?: RegisterFormType;
  }>({});

  const handleSubmit = async (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    const validationResult = validateSignupFields(
      username,
      email,
      password,
      confirmPassword
    );
    setData(validationResult);

    if (validationResult?.errors) return;

    const res = await signIn('credentials', {
      username: username,
      email: email,
      password: password,
    });

    console.log(password);

    if (res?.error) {
      console.error('Authentication error:', res.error);
    } else {
      console.log('Signed in successfully!');
      // Redirect or handle post-sign-in actions
    }
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
        <FormBackButton colorMode={colorMode} onSetSignup={onSetSignup} />
        <FormCloseButton
          colorMode={colorMode}
          onSetLoginWithEmail={onSetLoginWithEmail}
          onSetAnimationDataState={onSetAnimationDataState}
        />
      </Flex>

      <Text fontSize="xl" fontWeight="semibold" width="full" textAlign="center">
        Create a new account
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
            Username
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
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
          {data?.errors?.username && (
            <Field.ErrorText fontSize="xx-small">
              {data?.errors?.username[0]}
            </Field.ErrorText>
          )}
        </Field.Root>

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

        <Field.Root required invalid>
          <Field.Label>
            Password
            <Field.RequiredIndicator />
          </Field.Label>
          <PasswordInput
            variant="subtle"
            placeholder="yourpassword"
            fontSize="sm"
            border="1px solid"
            borderColor="gray.emphasized"
            outlineWidth="1px"
            outlineColor="gray.500"
            paddingX="10px"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          <VStack align="start" gap={0}>
            {data?.errors?.password?.map((message: string, i: number) => {
              return (
                <Field.ErrorText key={i} fontSize="xx-small">
                  {message}
                </Field.ErrorText>
              );
            })}
          </VStack>
        </Field.Root>

        <Field.Root required invalid>
          <Field.Label>
            Confirm password
            <Field.RequiredIndicator />
          </Field.Label>
          <PasswordInput
            variant="subtle"
            placeholder="yourpassword"
            fontSize="sm"
            border="1px solid"
            borderColor="gray.emphasized"
            outlineWidth="1px"
            outlineColor="gray.500"
            paddingX="10px"
            value={confirmPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
          />
          {data?.errors?.confirmPassword && (
            <Field.ErrorText fontSize="xx-small">
              {data?.errors?.confirmPassword[0]}
            </Field.ErrorText>
          )}
        </Field.Root>

        <VStack marginTop={2} gap={1} w="100%" paddingY={0}>
          <Button
            variant="surface"
            loadingText="Redirecting..."
            spinnerPlacement="end"
            paddingX={4}
            paddingY={1}
            bg="teal.700"
            _hover={{
              bg: 'teal.600',
            }}
            width="100%"
            onClick={() => {
              handleSubmit(username, email, password, confirmPassword);
            }}
          >
            <Text fontSize="lg" color="whiteAlpha.900">
              SIGN UP
            </Text>
          </Button>
        </VStack>

        <Text fontSize="10px">Or</Text>

        <HStack>
          <Text fontSize="10px">Already have an account?</Text>

          <Button
            fontSize="10px"
            textDecoration="underline"
            padding={0}
            fontWeight="semibold"
            height="fit-content"
            onClick={() => onSetSignup(false)}
          >
            Log in
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default SignupForm;
