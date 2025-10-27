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

// 'use client';

// import { addToWishlist } from '@/lib/actions/wishlist/add-wishlist.action';
// import { useMutation } from '@tanstack/react-query';

// export const useAddToWishlist = () => {
//   const mutation = useMutation({
//     mutationFn: (productId: { productId: string }) => addToWishlist(productId),
//     onSuccess: (response) => {
//       if (response.success) {
//         console.log('Wishlist added successfully:', response.data);
//         // Add your success logic here (toast notification, etc.)
//       } else {
//         console.error('Failed to add to wishlist:', response.error);
//         // Handle error in UI (show error toast, etc.)
//       }
//     },
//     onError: (error) => {
//       // This catches network errors or unexpected failures
//       console.error('Unexpected error:', error);
//     },
//   });

//   return mutation;
// };
