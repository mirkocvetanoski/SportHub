import { RegisterFormSchema, RegisterFormType } from './formvalidation';

export const validateLoginFields = (email: string, password: string) => {
  const result = RegisterFormSchema.safeParse({
    email,
    password,
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

export default validateLoginFields;
