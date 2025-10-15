import { registerAction } from '@/lib/actions/auth.action';
import { RegisterValues } from '@/lib/schemes/auth.schema';
import { useMutation } from '@tanstack/react-query';

export default function useRegister() {
  return useMutation({
    mutationFn: async (values: RegisterValues) => {
      const payload = await registerAction(values);
      console.log(payload);

      return payload;
    },
  });
}
