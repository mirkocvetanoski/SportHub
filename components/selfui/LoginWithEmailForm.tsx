import { Button, Field, Input, VStack, Text } from '@chakra-ui/react';
import { PasswordInput } from '@/components/ui/password-input';

const LoginWithEmailForm = () => {
  return (
    <VStack width="100%" paddingX="20px">
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
          placeholder="youremail@example.com"
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
        <Text fontSize="lg" color="gray.100">
          LOG IN
        </Text>
      </Button>
    </VStack>
  );
};

export default LoginWithEmailForm;
