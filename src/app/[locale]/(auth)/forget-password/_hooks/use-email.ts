'use client';

import { forgotPassword } from '@/lib/apis/forgot-password-flow/forgotPassword.api';
import { EmailValue } from '@/lib/schemes/forgotPassword.schema';
import { useMutation } from '@tanstack/react-query';

export const useEmail = () => {
  const { mutate, isPending, data, error } = useMutation({
    mutationFn: async (values: EmailValue) => {
      const res = await forgotPassword(values);
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

  return { mutate, isPending, data, error };
};
