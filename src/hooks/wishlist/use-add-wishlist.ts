'use client';

import { addToWishlist } from '@/lib/actions/wishlist/add-wishlist.action';
import { useMutation } from '@tanstack/react-query';

export const useAddToWishlist = () => {
  const mutation = useMutation({
    mutationFn: (productId: { productId: string }) => addToWishlist(productId),
    onSuccess: (data) => {
      console.log('wishlist added successfully: ', data);
    },
    onError: (error) => {
      console.log('error in wishlist', error);
    },
  });

  return mutation;
};
