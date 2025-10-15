import { useTranslations } from 'next-intl';
import * as z from 'zod';

// Login schema
export const useLoginSchema = () => {
  const t = useTranslations('auth.login.validation');

  const loginSchema = z.object({
    email: z.string().nonempty(t('email_required')).email(t('email_invalid')),
    password: z.string().min(1, t('password_required')),
  });
  return {loginSchema};
};

type LoginValues = z.infer<ReturnType<typeof useLoginSchema>["loginSchema"]>;
export type { LoginValues };
