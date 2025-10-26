'use client';

import SubmissionMessage from '@/components/shared/submission-message';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { Link } from '@/i18n/navigation';
import { LoginValues, useLoginSchema } from '@/lib/schemes/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import useLogin from '../_hooks/use-login';

export default function LoginForm() {
  // Translations
  const t = useTranslations('auth.login.login-form');

  const { loginSchema } = useLoginSchema();
  // Form
  const form = useForm<LoginValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  // Mutation
  const { isPending, error, login } = useLogin();

  //Functions
  const onSubmit: SubmitHandler<LoginValues> = (values) => {
    login(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[25.375rem]">
        {/* Email */}
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-4">
              {/* Form Label */}
              <FormLabel>{t('email-label')}</FormLabel>

              {/* Field */}
              <FormControl>
                <Input {...field} placeholder="user@example.com" type="email" />
              </FormControl>
              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-2.5">
              {/* Form Label */}
              <FormLabel>{t('password-label')}</FormLabel>

              {/* Field */}
              <FormControl>
                <PasswordInput {...field} placeholder="********" type="password"/>
              </FormControl>
              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Forgot Password */}
        <Link
          href="/forgot-password"
          className="text-maroon-700 text-sm font-semibold dark:text-softPink-300 capitalize flex justify-end"
        >
          {t('forgot-password')}
        </Link>

        {/* Error Message  */}
        <SubmissionMessage>{error?.message}</SubmissionMessage>

        {/* Login Button */}
        <Button
          variant="default"
          type="submit"
          loading={isPending}
          disabled={isPending || (!form.formState.isValid && form.formState.isSubmitted)}
          className="capitalize w-full mt-9"
        >
          {t('login-button')}
        </Button>
      </form>
    </Form>
  );
}
