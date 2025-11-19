import { OtpValues, useOtpSchema } from '@/lib/schemes/forgotPassword.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useVerifyOtp } from '../_hooks/use-verify';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ResendCode from './resend-otp/resend-otp';
// Props
type Props = {
  setStep: (step: 'createPassword' | 'email') => void;
  email: string;
};

export default function VerifyStep({ setStep, email }: Props) {
  // Translations
  const t = useTranslations();
  // Schema
  const { otpSchema } = useOtpSchema();

  // Form
  const form = useForm<OtpValues>({
    defaultValues: {
      resetCode: '',
    },
    resolver: zodResolver(otpSchema),
  });
  // Mutation
  const { error, isPending, mutate } = useVerifyOtp();
  //Toast
  const { toast } = useToast();
  // Submit Handler
  const onSubmit: SubmitHandler<OtpValues> = (values) => {
    mutate(values, {
      onSuccess: () => {
        setStep('createPassword');
        toast({
          title: t('otp-code-send-successfully'),
        });
      },
    });
  };
  // Variable
  const ResendOtp = {
    email: email,
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 min-w-96">
        <header className="border-b-2 border-zinc-200 pb-2 mb-8">
          {/* Title */}
          <h1 className="font-inter font-semibold text-2xl ">{t('enter-the-otp-code')}</h1>

          {/* Description */}
          <p className="text-zinc-950 text-base">
            {t('we-have-sent-a-6-digit-code-to')} {email}
            <span
              onClick={() => setStep('email')}
              className="text-blue-600 underline ml-1 font-medium cursor-pointer"
            >
              {t('edit')}
            </span>
          </p>
        </header>
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
                  <ResendCode payload={ResendOtp} />

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
            variant="default"
            type="submit"
            loading={isPending}
            disabled={isPending || (!form.formState.isValid && form.formState.isSubmitted)}
            className="capitalize w-full"
          >
            {t('verify-otp')}
          </Button>
        </div>
      </form>
      {/* For Help */}
      <p className="font-primary text-sm leading-none tracking-normal text-[#27272A] mt-5 flex items-center justify-center gap-1">
        <span className="font-medium">Need Help ?</span>
        <span className="font-bold cursor-pointer text-[#A6252A] hover:underline">
          {t('contact-us')}
        </span>
      </p>
    </Form>
  );
}
