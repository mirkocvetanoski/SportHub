import { z } from 'zod';

export const RegisterFormSchema = z
  .object({
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
      .string()
      .min(1, { message: 'Not be empty.' })
      .min(8, { message: 'Be at least 8 characters long.' })
      .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
      .regex(/[0-9]/, { message: 'Contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Contain at least one special character.',
      })
      .trim()
      .optional(),
    confirmPassword: z.string().trim().optional(),
  })
  .superRefine((val, ctx) => {
    if (val.confirmPassword && val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password fields do not match.',
        path: ['confirmPassword'],
      });
    }
  });

export type RegisterFormType = z.infer<typeof RegisterFormSchema>;
