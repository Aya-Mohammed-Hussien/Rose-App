import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { updateOccasion } from '@/lib/actions/occasions/update-occasion.api';
import { useRouter } from 'next/navigation';
import type { UpdateOccasionResult } from '@/lib/actions/occasions/update-occasion.api';

export function useUpdateOccasion() {
  // Navigation
  const router = useRouter();

  // Mutation
  return useMutation({
    mutationFn: ({ occasionId, data }: { occasionId: string; data: FormData }) =>
      updateOccasion(occasionId, data),

    onSuccess: (res: UpdateOccasionResult) => {
      if ('error' in res) {
        toast({
          description: res.error,
          variant: 'destructive',
        });
        return;
      }

      toast({
        description: res.message || 'Occasion updated successfully!',
      });

      router.refresh();
    },

    onError: (err: Error) => {
      toast({
        description: `Failed to update occasion: ${err.message || 'Unknown error'}`,
        variant: 'destructive',
      });
    },
  });
}
