'use client';

import { deleteFromWishlist } from '@/lib/actions/wishlist/delete-wishlist.action';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../use-toast';

/**
 * Custom React Query hook to handle removing a product from the user's wishlist.
 *
 * @description
 * This hook encapsulates the logic for calling the `deleteFromWishlist` API
 * and managing its side effects. It uses React Query’s `useMutation` to perform
 * the deletion request, automatically refresh the wishlist cache, and display
 * user feedback via toast notifications in case of success or failure.
 *
 * Returns a standard mutation object containing:
 * - `mutate`: function to trigger the delete request
 * - `isPending`: boolean indicating loading state
 * - `error`: error object if the mutation failed
 */
export const useDeleteWishlist = () => {
  // Access the query client to manually refresh cache after a successful mutation
  const queryClient = useQueryClient();

  // Toast for user notifications on success or error
  const { toast } = useToast();

  // Configure mutation behavior for removing a product from wishlist
  const mutation = useMutation({
    //  Function that performs the actual API call
    mutationFn: (productId: string) => deleteFromWishlist(productId),

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
