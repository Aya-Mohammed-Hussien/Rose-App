'use client';
import { getWishlistProducts } from '@/lib/apis/wishlist/wishlist-products.api';
import { useQuery } from '@tanstack/react-query';

/**
 * Custom React Query hook to fetch the user's wishlist products.
 * @description
 * This hook uses React Query's `useQuery` to fetch and cache the user's wishlist
 * from the backend API (`getWishlistProducts`).
 *
 *  */
export const useWishlist = () => {
  // Fetch wishlist data using React Query, cached under the key ['wishlist']
  const { data: wishlistProducts } = useQuery({
    queryKey: ['wishlist'],
    queryFn: getWishlistProducts,
  });

  return { wishlistProducts };
};
