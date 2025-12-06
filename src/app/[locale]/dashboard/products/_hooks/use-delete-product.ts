'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { deleteProduct } from '../_actions/delete-product.action';
import { useTranslations } from 'next-intl';

export const useDeleteProduct = () => {
  // Translation
  const t = useTranslations('dashboard.productsTable');

  // Hooks
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Mutation
  const { mutate: deleteProductMutate, isPending } = useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        description: t('deleteSuccess'),
      });
    },

    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        description: error.message || t('deleteError'),
      });
    },
  });

  return { deleteProduct: deleteProductMutate, isPending };
};
