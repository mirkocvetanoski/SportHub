import {
  Button,
  Field,
  Input,
  VStack,
  Text,
  Separator,
  CloseButton,
  IconButton,
  Flex,
} from '@chakra-ui/react';

import { MdArrowBack } from 'react-icons/md';

import { useColorMode } from '../ui/color-mode';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { RegisterFormType } from '@/lib/formvalidation';
import validateFields from '@/lib/auth';

interface ChildComponentProps {
  onSetForgotPassword: Dispatch<SetStateAction<boolean>>;
  onSetLoginWithEmail: Dispatch<SetStateAction<boolean>>;
}

const ForgotPasswordForm: React.FC<ChildComponentProps> = ({
  onSetLoginWithEmail,
  onSetForgotPassword,
}) => {
  const { colorMode } = useColorMode();

  const [email, setEmail] = useState<string>('');

  const [data, setData] = useState<{
    errors?: Record<string, string[]>;
    data?: RegisterFormType;
  }>({});

  const handleSubmit = () => {
    const validationResult = validateFields(email);
    setData(validationResult);
  };

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
            onSetForgotPassword(false);
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
          onClick={handleSubmit}
        >
          <Text fontSize="lg">SEND</Text>
        </Button>
      </VStack>
    </>
  );
};

export default ForgotPasswordForm;
