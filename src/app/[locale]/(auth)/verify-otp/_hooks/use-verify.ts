import { OtpValues } from '@/lib/schemes/verify-otp';
import { useMutation } from '@tanstack/react-query';
import { VerifyAction } from '../_actions/verify-otp.action';

export default function useVerify() {
  const { error, isPending, mutate } = useMutation({
    mutationFn: async (values: OtpValues) => {
      const payload = await VerifyAction(values);
      return payload;
    },
  });

  return { error, isPending, verify: mutate };
}
