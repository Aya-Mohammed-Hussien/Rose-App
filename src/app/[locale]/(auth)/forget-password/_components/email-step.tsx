import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { EmailValue, useEmailSchema } from '@/lib/schemes/forgotPassword.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEmail } from '../_hooks/use-email';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
// Props
type Props = {
  setEmail: (email: string) => void;
  setStep: (step: 'verify' | 'createPassword') => void;
};
export default function EmailStep({ setStep, setEmail }: Props) {
  // Translations
  const t = useTranslations();
  // Form
  const { emailSchema } = useEmailSchema();
  const form = useForm<EmailValue>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  });
  //Toast
  const { toast } = useToast();
  // Mutation
  const { mutate, isPending, error } = useEmail();

  const onSubmit: SubmitHandler<EmailValue> = (value) => {
    mutate(value, {
      onSuccess: () => {
        setEmail(value.email);
        setStep('verify');
        toast({
          title: t('email-send-successfully'),
        });
      },
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <header className="border-b-2 border-zinc-200 pb-2 mb-8">
          {/* Title */}
          <h1 className="font-inter font-semibold text-2xl ">{t('forgot-password')}</h1>

          {/* Description */}
          <p className="text-zinc-950 text-base">
            {t('worry-not-well-send-you-instructions-to-help-you-reset-it')}
          </p>
        </header>
        {/* Email */}
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-10">
              {/* Email Label */}
              <FormLabel className="font-medium text-base text-zinc-800">{t('email')}</FormLabel>
              <FormControl>
                {/* Email Input */}
                <Input placeholder="user@example.com" className="w-full" {...field} />
              </FormControl>
              {/* Feedback message */}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Continue Button */}
        <Button
          variant="default"
          type="submit"
          loading={isPending}
          disabled={isPending || (!form.formState.isValid && form.formState.isSubmitted)}
          className="capitalize w-full"
        >
          {t('continue')}
        </Button>
        {/* Error Message */}
        {error?.message && <p className="text-red-500 text-center mt-3"> {error.message}</p>}
        {/* Register Navigation */}
        <div className="text-gray-500 text-center mt-9">
          {t('dont-have-an-account-yet')}
          <Link href="/register">
            <span className="text-[#A6252A] font-bold ps-2">{t('create-one-now')}</span>
          </Link>
        </div>
      </form>
    </Form>
  );
}
