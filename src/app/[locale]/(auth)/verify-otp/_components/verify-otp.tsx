'use client';

import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { otpSchema, OtpValues } from '@/lib/schemes/verify-otp';
import ResendOtp from '../_resend-otp/resend-otp';
import { useTranslations } from 'next-intl';
import useVerify from '../_hooks/use-verify';

export default function VerifyForm() {
  // Translations
  const t = useTranslations();
  // Form
  const router = useRouter();
  const form = useForm<OtpValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      resetCode: '',
    },
  });
  // Mutations
  const { verify, isPending, error } = useVerify();

  // Function
  const onSubmit: SubmitHandler<OtpValues> = (values) => {
    verify(values, {
      onSuccess: () => {
        router.push('/login');
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 min-w-96">
        <FormField
          control={form.control}
          name="resetCode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {/*  InputOTP */}
                <div className="mt-10 flex flex-col items-center">
                  <InputOTP maxLength={6} value={field.value} onChange={field.onChange}>
                    {/*  InputOTP from Shad CN UI */}
                    <InputOTPGroup className="flex gap-3">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  {/* Resend code */}
                  <ResendOtp />
                  {/* Message Error */}
                  {error && (
                    <div className="flex justify-center items-center">
                      <p className="text-center text-red-600 bg-red-50 px-3 py-3 text-sm rounded-md">
                        {error.message}
                      </p>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Submit Code button */}
        <div className="w-full border-b border-[#E4E4E7] pb-8 pe-4">
          <Button
            className="w-full font-primary font-normal text-base leading-none tracking-normal
                   text-white bg-[#A6252A] hover:bg-[#A6252A]
                   rounded-xl px-4 py-3 mt-4
                   focus:outline-none active:outline-none
                   transition-none shadow-none"
          >
            {t('verify-otp')}
          </Button>
        </div>
      </form>
      {/* For Help */}
      <p className="font-primary text-sm leading-none tracking-normal text-[#27272A] mt-5 flex items-center justify-center gap-1">
        <span className="font-medium">{t('need-help')}</span>
        <span className="font-bold cursor-pointer text-[#A6252A] hover:underline">
          {t('contact-us')}
        </span>
      </p>
    </Form>
  );
}
