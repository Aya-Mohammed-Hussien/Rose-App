import { OtpValues } from '@/lib/schemes/verify-otp';
import { useMutation } from '@tanstack/react-query';

const API_URL = process.env.NEXT_PUBLIC_API;

export function useVerify() {
  // Variable
  const { mutate, isPending, error } = useMutation({
    // Mut Function
    mutationFn: async (values: OtpValues) => {
      // Response
      const res = await fetch(`${API_URL}verifyResetCode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      // Payload
      const data = await res.json();

      if (!res.ok) {
        throw new Error('Something went wrong');
      }
      return data;
    },
  });

  return { isPending, error, verify: mutate };
}
