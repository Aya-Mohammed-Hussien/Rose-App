'use client';

import { ResetPasswordApi } from '@/lib/apis/forgot-password-flow/reset-password.api';
import { createPasswordValues } from '@/lib/schemes/forgotPassword.schema';
import { useMutation } from '@tanstack/react-query';

export const UseReset = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data: createPasswordValues) => {
      const res = await ResetPasswordApi(data);
      if (res.message === 'error') {
        throw new Error(typeof res.code === 'string' ? res.code : 'Something went wrong');
      }
      return res;
    },
    onSuccess: (data) => {
      return data;
    },
    onError: (err) => {
      return err;
    },
  });

  return { mutate, isPending, error };
};
