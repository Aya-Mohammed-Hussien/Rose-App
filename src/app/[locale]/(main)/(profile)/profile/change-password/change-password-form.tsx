'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormLabel,
  FormControl,
  FormItem,
  FormMessage,
  FormField,
} from '@/components/ui/form';
import { PasswordInput } from '@/components/ui/password-input';
import { useChangePassword } from '@/hooks/profile/use-change-password';
import { changePasswordSchema, changePasswordValues } from '@/lib/schemes/change-password.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function ChangePasswordForm() {
  // Mutation
  const { updatePassword, isPending } = useChangePassword();

  // Form
  const form = useForm<changePasswordValues>({
    defaultValues: {
      password: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    resolver: zodResolver(changePasswordSchema),
  });

  // Functions
  const onSubmit: SubmitHandler<changePasswordValues> = (value) => {
    const { confirmNewPassword, ...payload } = value;
    updatePassword(payload);
  };
  return (
    <section>
      {/* Change Password Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4" action="">
          {/* Old Password */}
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                {/* Old Password label */}
                <FormLabel className="font-medium  text-base text-zinc-800">Old Password</FormLabel>
                <div className="w-full">
                  {/*  Old Password input */}
                  <FormControl>
                    <PasswordInput
                      autoComplete="old-password"
                      type="password"
                      placeholder="********"
                      className="w-full h-12"
                      {...field}
                    />
                  </FormControl>
                </div>
                {/* Feedback message */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Separator */}
          <div className="bg-zinc-200 my-3 h-[1px] w-full"></div>

          {/* New Password */}
          <FormField
            name="newPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                {/* New Password label */}
                <FormLabel className="font-medium  text-base text-zinc-800">New Password</FormLabel>
                <div className="w-full">
                  {/*  New Password input */}
                  <FormControl>
                    <PasswordInput
                      autoComplete="new-password"
                      type="password"
                      placeholder="********"
                      className="w-full h-12"
                      {...field}
                    />
                  </FormControl>
                </div>
                {/* Feedback message */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm New Password */}
          <FormField
            name="confirmNewPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem className=" ">
                {/* Confirm New Password label */}
                <FormLabel className="font-medium  text-base text-zinc-800">
                  Confirm New Password
                </FormLabel>
                <div className="w-full">
                  {/* Confirm New Password input */}
                  <FormControl>
                    <PasswordInput
                      autoComplete="confirm-new-password"
                      type="password"
                      placeholder="********"
                      className="w-full h-12"
                      {...field}
                    />
                  </FormControl>
                </div>
                {/* Feedback message */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Change Password  */}
          <div className="w-full h-[6.5rem] flex items-end justify-end ">
            {/* Change Password Button */}
            <Button type="submit" variant={'default'}>
              Change Password
              {/* Icon */}
              {isPending && <Loader2 className="animate-spin" />}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
