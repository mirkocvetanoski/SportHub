import {
  ForgotPasswordFormType,
  ForgotPasswordSchema,
} from '@/lib/formValidation';

export const validateForgotPassword = (email: string) => {
  const result = ForgotPasswordSchema.safeParse({
    email,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  return {
    data: result.data as ForgotPasswordFormType, // Ensuring type safety
  };
};

export default validateForgotPassword;
