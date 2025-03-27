import { RegisterFormSchema, RegisterFormType } from './formvalidation';

export const validateForgotPassword = (email: string) => {
  const result = RegisterFormSchema.safeParse({
    email,
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

export default validateForgotPassword;
