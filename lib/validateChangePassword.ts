import {
  ChangePasswordFormType,
  ChangePasswordSchema,
} from '@/lib/formvalidation';

export const validateChangePassword = (
  oldPassword: string,
  newPassword: string
) => {
  const result = ChangePasswordSchema.safeParse({
    oldPassword,
    newPassword,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  return {
    data: result.data as ChangePasswordFormType, // Ensuring type safety
  };
};

export default validateChangePassword;
