import { LoginFormSchema, LoginFormType } from './formvalidation';

export const validateLoginFields = (email: string, password: string) => {
  const result = LoginFormSchema.safeParse({
    email,
    password,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  return {
    data: result.data as LoginFormType, // Ensuring type safety
  };
};

export default validateLoginFields;
