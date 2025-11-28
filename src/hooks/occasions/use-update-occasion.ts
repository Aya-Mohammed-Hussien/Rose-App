import { updateOccasion } from '@/lib/actions/occasions/update-occasion.action';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useUpdateOccasion = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ id, form }: { id: string; form: FormData }) => {
      return await updateOccasion(id, form);
    },
    onSuccess: () => {
      router.push('/dashboard/occasions');
      router.refresh();
    },
  });
};
