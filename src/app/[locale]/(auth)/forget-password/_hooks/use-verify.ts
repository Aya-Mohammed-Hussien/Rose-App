'use client';

import { verifyOtpApi } from '@/lib/apis/forgot-password-flow/verify.api';
import { OtpValues } from '@/lib/schemes/forgotPassword.schema';
import { useMutation } from '@tanstack/react-query';

export const useVerifyOtp = () => {
  const { mutate, isPending, data, error } = useMutation({
    mutationFn: async (data: OtpValues) => {
      const res = await verifyOtpApi(data);
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
