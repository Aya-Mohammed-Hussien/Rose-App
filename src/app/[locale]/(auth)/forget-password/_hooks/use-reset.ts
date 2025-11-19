'use client';

import { ResetPasswordApi } from '@/lib/apis/forgot-password-flow/reset-password.api';
import { createPasswordValues } from '@/lib/schemes/forgotPassword.schema';
import { useMutation } from '@tanstack/react-query';

export const UseReset = () => {
  const { mutate, isPending, data, error } = useMutation({
    mutationFn: async (data: createPasswordValues) => {
      const res = await ResetPasswordApi(data);
      if (res.error) {
        throw new Error(res.error || 'Something went wrong');
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
