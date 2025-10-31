'use client';

import { addToWishlist } from '@/lib/actions/wishlist/add-wishlist.action';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../use-toast';

/**
 * Custom React Query hook to handle adding a product to the user's wishlist.
 *
 * @description
 * This hook wraps the `addToWishlist` API call inside a `useMutation` handler.
 * It provides a clean interface for performing the mutation while automatically
 * handling success and error states, invalidating related queries, and showing
 * user feedback via toast notifications.
 *
 */
export const useAddToWishlist = () => {
  // Access the query client to manually refresh cache after a successful mutation
  const queryClient = useQueryClient();

  // Toast for user notifications on success or error
  const { toast } = useToast();

  // Configure mutation behavior for adding a product to wishlist
  const mutation = useMutation({
    //  Function that performs the actual API call
    mutationFn: (productId: { productId: string }) => addToWishlist(productId),

    /**
     * Called when the mutation succeeds.
     * Invalidates the wishlist query so it refetches with updated data.
     */
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },

    /**
     * Called when the mutation fails.
     * Displays a user-friendly error message using the toast system.
     */
    onError: (error) => {
      toast({
        variant: 'destructive',
        description: error.message || 'Something went wrong. Please try again.',
      });
    },
  });

  return mutation;
};
