'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { deleteProduct } from '../_actions/delete-product.action';

export const useDeleteProduct = () => {
  // Hooks
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Mutation
  const { mutate: deleteProductMutate, isPending } = useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        description: 'Product deleted successfully.',
      });
    },

    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        description: error.message || 'Failed to delete product.',
      });
    },
  });

  return { deleteProduct: deleteProductMutate, isPending };
};
