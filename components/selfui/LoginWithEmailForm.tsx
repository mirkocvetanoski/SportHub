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
import { Dispatch, SetStateAction } from 'react';
import { useColorMode } from '../ui/color-mode';
import { MdArrowBack } from 'react-icons/md';

interface ChildComponentProps {
  onSetLogin: Dispatch<SetStateAction<boolean>>;
  onSetLoginWithEmail: Dispatch<SetStateAction<boolean>>;
  onSetForgotPassword: Dispatch<SetStateAction<boolean>>;
}

const LoginWithEmailForm: React.FC<ChildComponentProps> = ({
  onSetLogin,
  onSetLoginWithEmail,
  onSetForgotPassword,
}) => {
  const { colorMode } = useColorMode();

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

      <Text fontSize="xl" fontWeight="semibold" width="full" textAlign="center">
        Log in to an existing account
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
          />
          <Field.ErrorText fontSize="xx-small">
            Account with this email doesn&apos;t exists
          </Field.ErrorText>
        </Field.Root>

        <Field.Root required invalid>
          <Field.Label>
            Password
            <Field.RequiredIndicator />
          </Field.Label>
          <PasswordInput
            variant="subtle"
            placeholder="password"
            fontSize="sm"
            border="1px solid"
            borderColor="gray.emphasized"
            outlineWidth="1px"
            outlineColor="gray.500"
            paddingX="10px"
          />
          <Field.ErrorText fontSize="xx-small">
            Incorrect password
          </Field.ErrorText>
        </Field.Root>

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
            LOG IN
          </Text>
        </Button>
      </VStack>

      <VStack marginTop={2} gap={1} w="100%" paddingY={0}>
        <Button
          fontSize="10px"
          textDecoration="underline"
          padding={0}
          fontWeight="semibold"
          onClick={() => onSetForgotPassword(true)}
          height="fit-content"
        >
          Forgot your password?
        </Button>

        <Text fontSize="10px">Or</Text>

        <HStack>
          <Text fontSize="10px">Don&apos;t have an account?</Text>

          <Button
            fontSize="10px"
            textDecoration="underline"
            padding={0}
            fontWeight="semibold"
            height="fit-content"
          >
            Sign up
          </Button>
        </HStack>
      </VStack>
    </>
  );
};

export default LoginWithEmailForm;
