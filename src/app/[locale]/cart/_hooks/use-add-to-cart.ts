 'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToCartAction } from '../_actions/add-to-cart.action';
import { useSession } from 'next-auth/react';
import { addItemToGuestCart, productToCartItem } from '../../../../lib/utils/cart-storage';
import { Product } from '@/lib/types/product';

export default function useAddToCart() {
  const { data: session } = useSession();
  const queryClient = useQueryClient(); // Access the query cache

  const { isPending, error, mutate } = useMutation({
    mutationFn: async (data: { product: Product }) => {
      try {
        // Authenticated user => Send the data to the BE
        if (session?.user) {
          const result = await addToCartAction({
            product: data.product._id,
            quantity: 1,
          });
          return result;
        } else {
          // Guest user => send to local storage
          const item = productToCartItem(data.product);
          addItemToGuestCart(item);
          // to show the loading for guest users as this is not async operation
          await new Promise((res) => setTimeout(res, 500));
          return item;
        }
      } catch (err) {
        // Ensure error is properly thrown
        const errorMessage = err instanceof Error ? err.message : 'Failed to add item to cart';
        throw new Error(errorMessage);
      }
    },

    // --- Invalidate and refetch cart data after successful add ---
    onSuccess: () => {
      // Update cart query so all client components depending on it re-render.
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.refetchQueries({ queryKey: ['cart'] });
    },
  });

  return { isPending, error, addToCart: mutate };
}
