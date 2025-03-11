import {
  Button,
  Field,
  Input,
  VStack,
  Text,
  Separator,
  HStack,
  Flex,
  IconButton,
  CloseButton,
} from '@chakra-ui/react';
import { PasswordInput } from '@/components/ui/password-input';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useColorMode } from '../ui/color-mode';
import { MdArrowBack } from 'react-icons/md';

interface ChildComponentProps {
  onSetLoginWithEmail: Dispatch<SetStateAction<boolean>>;
  onSetSignup: Dispatch<SetStateAction<boolean>>;
}

const SignupForm: React.FC<ChildComponentProps> = ({
  onSetLoginWithEmail,
  onSetSignup,
}) => {
  const { colorMode } = useColorMode();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  return (
    <>
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
            onSetSignup(false);
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
          <Field.ErrorText fontSize="xx-small">
            Account with this email already exists
          </Field.ErrorText>
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
          <Field.ErrorText fontSize="xx-small">
            Password should have minimum 8 characters
          </Field.ErrorText>
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
          <Field.ErrorText fontSize="xx-small">
            Passwords doesn&apos;t match. Try again.
          </Field.ErrorText>
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
    </>
  );
};

export default SignupForm;
