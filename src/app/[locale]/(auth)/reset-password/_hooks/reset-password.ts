// hooks/useResetPasswordAction.ts
"use client";

import { useMutation } from "@tanstack/react-query";
import { ResetPasswordValues } from "@/lib/schemes/auth.schema";
import { resetPasswordAction } from "../_actions/resetpass.action";

export function useResetPasswordAction() {
  return useMutation({
    mutationFn: async (values: ResetPasswordValues) => {
      return await resetPasswordAction(values);
    },
  });
}
