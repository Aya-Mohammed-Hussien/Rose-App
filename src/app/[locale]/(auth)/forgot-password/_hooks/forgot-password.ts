// hooks/useForgetPasswordAction.ts
'use client';

import { useMutation } from '@tanstack/react-query';
import { ForgotPasswordValues } from '@/lib/schemes/auth.schema';
import { forgetPasswordAction } from '../_actions/forgotpass.action';

export function useForgetPasswordAction() {
  return useMutation({
    mutationFn: async (values: ForgotPasswordValues) => {
      return await forgetPasswordAction(values);
    },
  });
}
