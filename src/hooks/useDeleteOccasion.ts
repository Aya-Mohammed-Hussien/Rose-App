'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from './use-toast';
import { deleteOccasion } from '@/lib/actions/occasions/delete-occasion.action';

export const useDeleteOccasion = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => deleteOccasion(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['occasions'] });

      toast({
        description: 'تم حذف المناسبة بنجاح 🗑️',
      });
    },

    onError: (error: unknown) => {
      toast({
        variant: 'destructive',
        description: error instanceof Error ? error.message : 'حدث خطأ أثناء حذف المناسبة',
      });
    },
  });
};
