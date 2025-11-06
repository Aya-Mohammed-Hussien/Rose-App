import z from 'zod';

const passwordSchema = z
  .string()
  .min(1, 'Password is required')
  .regex(/^(?=.*[0-9]).*$/, 'Password must contain one digit from 1 to 9')
  .regex(/^(?=.*[a-z]).*$/, 'Password must contain one lowercase letter')
  .regex(/^(?=.*[A-Z]).*$/, 'Password must contain one uppercase letter')
  .regex(/^(?=.*\W).*$/, 'Password must contain one special character')
  .regex(/^(?!.* ).*$/, 'Password must not contain any spaces')
  .regex(/^.{8,25}$/, 'Password must be 8-25 characters long');

export const changePasswordSchema = z
  .object({
    password: passwordSchema,
    newPassword: passwordSchema,
    confirmNewPassword: z.string().min(1, 'Please confirm your password'),
  })
  // new password should not be the same old password
  .refine((data) => data.newPassword !== data.password, {
    message: 'New password must be different from old password',
    path: ['newPassword'],
  })

  // re password should match  new password
  .refine((data) => data.confirmNewPassword === data.newPassword, {
    message: "Passwords don't match",
    path: ['confirmNewPassword'],
  });

export type changePasswordValues = z.infer<typeof changePasswordSchema>;
