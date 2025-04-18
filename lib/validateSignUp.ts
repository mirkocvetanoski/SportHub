import { RegisterFormSchema, RegisterFormType } from '@/lib/formvalidation';

const validateSignupFields = (
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  const result = RegisterFormSchema.safeParse({
    username,
    email,
    password,
    confirmPassword,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  return {
    data: result.data as RegisterFormType, // Ensuring type safety
  };
};

export default validateSignupFields;
