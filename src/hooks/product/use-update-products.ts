'use client';

import { useToast } from '@/hooks/use-toast';
import { updateProductAction, UpdateProductValues } from '@/lib/actions/product/update-product.action';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

/**
 * Custom hook to handle update product.
 *
 * Provides a mutation function to update product data to the backend and tracks its loading state.
 *
 * @returns {Object} React Query mutation object:
 *   - mutate: function to update product data to the be
 *   - isPending: boolean indicating if the mutation is in progress
 *   - isError: boolean indicating if an error occurred
 *   - error: the error object if mutation fails
 */

export const useUpdateProduct = (productId: string) => {
  // Translation
  const t = useTranslations('dashboard.product_validation.update_product_message');

  // Hooks
  const { toast } = useToast();

  // React query mutation for adding a new product
  const {
    mutate: updateProduct,
    isPending,
    error,
  } = useMutation({
    // mutationFn receives the product data
    mutationFn: (data: UpdateProductValues) => {
      return updateProductAction(productId, data);
    },

    // On successful updating product
    onSuccess: () => {
      toast({
        description: t('successful_updating'),
      });
    },

    // On Error during updating product
    onError: (error: Error) => {
      const errorMessage = error?.message || t('Failed_updating');
      toast({
        variant: 'destructive',
        description: errorMessage,
      });
    },
  });

  return { updateProduct, isPending, error };
};
