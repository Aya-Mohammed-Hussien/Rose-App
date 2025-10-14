'use client';

import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

import { resetPasswordSchema, ResetPasswordValues } from '@/lib/schemes/auth.schema';
import { useResetPasswordAction } from '../_hooks/reset-password';
import { PasswordInput } from '@/components/shared/password-input';
import { useTranslations } from 'next-intl';

export default function ResetPasswordPage() {
  const t = useTranslations('resetPassword');

  // Hook for API call
  const { mutate, isPending, error } = useResetPasswordAction();

  // Setup form validation
  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  // Submit handler
  const onSubmit = (values: ResetPasswordValues) => {
    mutate(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md bg-card rounded-2xl shadow-sm border-none">
        {/* Header section */}
        <CardHeader>
          <CardTitle className="text-3xl font-semibold text-zinc-800">{t('title')}</CardTitle>
          <p className="mt-1 text-sm text-zinc-800">{t('subtitle')}</p>
        </CardHeader>

        {/* Main form section */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">{t('password')}</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">{t('confirmPassword')}</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            {/* Footer Section */}
            <CardFooter className="flex flex-col gap-3">
              <Button
                type="submit"
                className="w-full h-11 rounded-xl bg-maroon-600 hover:bg-maroon-700 text-white font-medium transition"
                disabled={isPending}
              >
                {isPending ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t('loading')}
                  </span>
                ) : (
                  t('button')
                )}
              </Button>

              {/* Display Error */}
              {error && <p className="text-red-500 text-sm text-center">{t('error')}</p>}

              {/* Back to Login Link */}
              <div className="text-center text-sm text-zinc-800 font-medium">
                {t('help')}{' '}
                <Link href="/contact" className="text-sm text-maroon-700 font-bold hover:underline">
                  {t('contact')}
                </Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
