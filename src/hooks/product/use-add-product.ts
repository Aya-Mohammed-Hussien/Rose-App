'use client';

import { useToast } from '@/hooks/use-toast';
import { addProductAction } from '@/lib/actions/product/add-product.action';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

/**
 * Custom hook to handle adding a new product.
 *
 * Provides a mutation function to send product data to the backend and tracks its loading state.
 *
 * @returns {Object} React Query mutation object:
 *   - mutate: function to send product data to the be
 *   - isPending: boolean indicating if the mutation is in progress
 *   - isError: boolean indicating if an error occurred
 *   - error: the error object if mutation fails
 */

export const useAddProduct = () => {
  // Translation
  const t = useTranslations('dashboard.product_validation.add_product_message');

  // Hooks
  const { toast } = useToast();

  // React query mutation for adding a new product
  const { mutate: addNewProduct, isPending , error } = useMutation({
    // mutationFn receives the product data
    mutationFn: (formData: FormData) => addProductAction(formData),

    // On successful adding product
    onSuccess: () => {
      toast({
        description: t('successful_adding'),
      });
    },

    // On Error during adding product
    onError: (error: Error) => {
      const errorMessage = error?.message || t('Failed_adding');
      toast({
        variant: 'destructive',
        description: errorMessage,
      });
    },
  });

  return { addNewProduct, isPending , error };
};
