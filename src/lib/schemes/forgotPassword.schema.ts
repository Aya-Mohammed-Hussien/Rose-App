import { useTranslations } from 'next-intl';
import { z } from 'zod';
// Email Schema
export const useEmailSchema = () => {
  const t = useTranslations('validation.email');

  const emailSchema = z.object({
    email: z.string().min(1, t('required')).email(t('invalid')),
  });

  return { emailSchema };
};

export type EmailValue = z.infer<ReturnType<typeof useEmailSchema>['emailSchema']>;
// Otp Schema
export const useOtpSchema = () => {
  const t = useTranslations('validation.otp');

  const otpSchema = z.object({
    resetCode: z.string().min(1, t('required')).length(6, t('length')),
  });

  return { otpSchema };
};

export type OtpValues = z.infer<ReturnType<typeof useOtpSchema>['otpSchema']>;
// Password Schema

export const usePasswordValues = () => {
  // Translations
  const t = useTranslations('validation.password');
  // Schema
  const passwordValues = z
    .object({
      email: z.string().min(1, t('email-is-required')).email(t('invalid-email-address-0')),
      newPassword: z
        .string()
        .min(1, 'Password is required')
        .regex(/^(?=.*[0-9]).*$/, t('password-must-contain-one-digit-from-1-to-9'))
        .regex(/^(?=.*[a-z]).*$/, t('password-must-contain-one-lowercase-letter'))
        .regex(/^(?=.*[A-Z]).*$/, t('password-must-contain-one-uppercase-letter'))
        .regex(/^(?=.*\W).*$/, t('password-must-contain-one-special-character'))
        .regex(/^(?!.* ).*$/, t('password-must-not-contain-any-spaces'))
        .regex(/^.{8,25}$/, t('password-must-be-8-25-characters-long')),

      rePassword: z.string().min(1, t('please-confirm-your-password')),
    }) //rePassword validation
    .refine((data) => data.newPassword === data.rePassword, {
      message: t('passwords-not-match'),
      path: ['rePassword'],
    });

  return { passwordValues };
};

export type createPasswordValues = z.infer<ReturnType<typeof usePasswordValues>['passwordValues']>;
