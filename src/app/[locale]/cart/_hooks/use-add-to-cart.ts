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
      // Authenticated user => Send the data to the BE
      if (session?.user) {
        return await addToCartAction({
          product: data.product._id,
          quantity: 1,
        });
      } else {
        // Guest user => send to local storage
        const item = productToCartItem(data.product);
        addItemToGuestCart(item);
        // to show the loading for guest users as this is not async operation
        await new Promise((res) => setTimeout(res, 500));
        return item;
      }
    },

    // --- Invalidate and refetch cart data after successful add ---
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.refetchQueries({ queryKey: ['cart'] });
    },
  });

  return { isPending, error, addToCart: mutate };
}
