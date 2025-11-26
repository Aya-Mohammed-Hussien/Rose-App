import z from 'zod';

export const PasswordFieldSchema = (t: (key: string) => string) =>
  z
    .string()
    .min(1, t('password.minimum'))
    .regex(/^(?=.*[0-9]).*$/, t('password.digit'))
    .regex(/^(?=.*[a-z]).*$/, t('password.lowercase'))
    .regex(/^(?=.*[A-Z]).*$/, t('password.uppercase'))
    .regex(/^(?=.*\W).*$/, t('password.special-character'))
    .regex(/^(?!.* ).*$/, t('password.spaces'))
    .regex(/^.{8,25}$/, t('password.range'));

export const changePasswordSchema = (t: (key: string) => string) =>
  z
    .object({
      password: PasswordFieldSchema(t),
      newPassword: PasswordFieldSchema(t),
      confirmNewPassword: z.string().min(1, t('new-password.minimum')),
    })
    // newPassword must be different from old password
    .refine((data) => data.newPassword !== data.password, {
      message: t('new-password.new-different-old'),
      path: ['newPassword'],
    })
    // confirm must match newPassword
    .refine((data) => data.confirmNewPassword === data.newPassword, {
      message: t('confirm-new-password.confirm-match-new-password'),
      path: ['confirmNewPassword'],
    });

export type PasswordFieldSchema = ReturnType<typeof PasswordFieldSchema>;
export type ChangePasswordZodSchema = ReturnType<typeof changePasswordSchema>;
export type changePasswordValues = z.infer<ReturnType<typeof changePasswordSchema>>;
