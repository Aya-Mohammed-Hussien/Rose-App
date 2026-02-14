'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../use-toast';
import { addOccasion } from '@/lib/actions/occasions/add-occasion.action';
import { useRouter } from 'next/navigation';

export const useAddOccasion = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: (form: FormData) => addOccasion(form),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['occasions'] });

      toast({
        description: 'تم إضافة المناسبة بنجاح 🎉',
      });

      router.push('/dashboard/occasions');
      router.refresh();

      return data;
    },

    onError: (error: unknown) => {
      toast({
        variant: 'destructive',
        description: error instanceof Error ? error.message : 'حدث خطأ أثناء إضافة المناسبة',
      });
    },
  });
};
