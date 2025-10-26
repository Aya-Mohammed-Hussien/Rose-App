// hooks/useResetPasswordAction.ts
'use client';

import { useMutation } from '@tanstack/react-query';
import { ResetPasswordValues } from '@/lib/schemes/auth.schema';
import { resetPasswordAction } from '../_actions/resetpass.action';

// Custom hook to handle reset password mutation
export function useResetPasswordAction() {
  return useMutation({
    // Mutation function that triggers the reset password action
    mutationFn: async (values: ResetPasswordValues) => {
      return await resetPasswordAction(values);
    },
  });
}
