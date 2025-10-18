'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { registerSchema, RegisterValues } from '@/lib/schemes/auth.schema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GENDER } from '@/lib/constants/auth.constant';
import { PhoneInput } from '@/components/ui/phone-input';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import useRegister from '../_hooks/use-register';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PasswordInput } from '@/components/ui/password-input';

export default function RegisterForm() {
  //Translations
  const t = useTranslations('register');
  //Navigation
  const router = useRouter();
  //Toast
  const { toast } = useToast();
  //Mutation
  const { mutate, isPending } = useRegister();

  //form
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
      gender: GENDER.MALE,
    },
  });

  //Function
  const onSubmit: SubmitHandler<RegisterValues> = (values) => {
    mutate(values, {
      onSuccess: (res: any) => {
        if (res?.message === 'success') {
          const firstName = res.user?.firstName ?? '';
          const lastName = res.user?.lastName ?? '';

          toast({
            title: '✅ تم إنشاء الحساب بنجاح',
            description: `${firstName} ${lastName} تم تسجيلك بنجاح، سيتم تحويلك إلى صفحة تسجيل الدخول...`,
          });

          setTimeout(() => {
            router.push('/login');
          }, 2000);
        } else if (res?.error) {
          toast({
            title: '⚠️ فشل التسجيل',
            description: res.error || 'حدث خطأ أثناء إنشاء الحساب.',
          });
        } else {
          toast({
            title: '❓ استجابة غير متوقعة',
            description: 'لم يتم التعرف على نتيجة التسجيل.',
          });
        }
      },

      onError: (err: any) => {
        const message =
          err?.response?.data?.error ||
          err?.response?.data?.message ||
          err?.message ||
          'حدث خطأ غير متوقع. حاول لاحقاً.';

        toast({
          title: '❌ خطأ في الخادم',
          description: message,
        });
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Firstname */}
          <FormField
            name="firstName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('firstname')}</FormLabel>
                <FormControl>
                  <Input placeholder="Jonathan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Lastname */}
          <FormField
            name="lastName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('lastname')}</FormLabel>
                <FormControl>
                  <Input placeholder="Adrian" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Email */}
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>{t('email')}</FormLabel>
              <FormControl>
                <Input placeholder="user@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* phone */}
        <FormField
          name="phone"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('phone')}</FormLabel>
              <FormControl>
                <PhoneInput {...field} placeholder="1012345678" defaultCountry="EG" international />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* gender */}
        <FormField
          name="gender"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('gender')}</FormLabel>
              <FormControl>
                <Select
                  defaultValue={form.getValues('gender')}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="capitalize">
                    <SelectValue placeholder="GENDER" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(GENDER).map((gender) => (
                      <SelectItem value={gender} className="capitalize" key={gender}>
                        {gender}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>{t('password')}</FormLabel>
              <FormControl>
                <PasswordInput type="password" placeholder="Password@12345" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Re-Password */}
        <FormField
          name="rePassword"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>{t('confirmPassword')}</FormLabel>
              <FormControl>
                <PasswordInput {...field} placeholder="********" type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button
          variant="default"
          type="submit"
          disabled={isPending || (form.formState.isSubmitted && !form.formState.isValid)}
          className="w-full flex items-center justify-center gap-2"
        >
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {t('CreateAccount')}
        </Button>
      </form>
    </Form>
  );
}
