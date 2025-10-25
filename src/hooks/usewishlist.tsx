'use client';

import { useQuery } from '@tanstack/react-query';
import { getWishlist } from '../lib/apis/products/wishlist';

export function useWishlist() {
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: getWishlist,
  });
}
