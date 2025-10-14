'use client';

import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import Countdown from 'react-countdown';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

import { forgotPasswordSchema, ForgotPasswordValues } from '@/lib/schemes/auth.schema';
import { useForgetPasswordAction } from '../_hooks/forgot-password';
import { useTranslations } from 'next-intl';

export default function ForgotPasswordPage() {
  const t = useTranslations('forgotPassword');

  // Hook to handle API call and loading/error states
  const { mutate, isPending, error } = useForgetPasswordAction();

  // Timer states for controlling resend logic
  const [targetTime, setTargetTime] = useState<number | null>(null);
  const [canResend, setCanResend] = useState(true);
  const [key, setKey] = useState(0);

  // On mount, restore any saved countdown timer from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('forgot_password_timer');
    const now = Date.now();

    if (saved && Number(saved) > now) {
      setTargetTime(Number(saved));
      setCanResend(false);
    }
  }, []);

  // Setup React Hook Form with Zod validation schema
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  // Handle form submission
  const onSubmit = (values: ForgotPasswordValues) => {
    // Call the forget password mutation
    mutate(values);

    // Start 60-second cooldown before allowing another request
    const end = Date.now() + 60000;
    localStorage.setItem('forgot_password_timer', String(end));
    setTargetTime(end);
    setCanResend(false);
    setKey((prev) => prev + 1);
  };

  // Callback when countdown completes
  const handleTimerComplete = () => {
    setCanResend(true);
    localStorage.removeItem('forgot_password_timer');
  };
  console.log(t('countdownMessage', { seconds: 45 }));

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
              {/* Email input field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">{t('email')}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t('placeholder')}
                        autoComplete="email"
                        className="h-11 rounded-xl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Countdown timer for resend limit */}
              {!canResend && targetTime && (
                <div className="text-sm text-gray-600 text-center">
                  <Countdown
                    key={key}
                    date={targetTime}
                    onComplete={handleTimerComplete}
                    renderer={({ seconds }) => <span>{t('countdownMessage', { seconds })}</span>}
                  />
                </div>
              )}
            </CardContent>

            {/* Footer with button and links */}
            <CardFooter className="flex flex-col gap-3">
              {/* Submit button */}
              <Button
                type="submit"
                className="w-full h-11 rounded-xl bg-maroon-600 hover:bg-maroon-700 text-white font-medium transition"
                disabled={isPending || !canResend}
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

              {/* Display error message if any */}
              {error && <p className="text-red-500 text-sm text-center">{t('error')}</p>}

              {/* Navigation link to signup page */}
              <div className="text-center text-sm text-zinc-800 font-medium">
                {t('noAccount')}{' '}
                <Link href="/signup" className="text-sm text-maroon-700 font-bold hover:underline">
                  {t('createAccount')}
                </Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
