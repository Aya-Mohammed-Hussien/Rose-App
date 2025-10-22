'use client';

import WishlistButton from '@/components/features/wishlist/wishlist-icons';
import { useWishlist } from '../../../hooks/usewishlist';

export default function WishlistButtonWrapper({ productId }: { productId: string }) {
  const { data, isLoading } = useWishlist();

  if (isLoading) {
    return <div className="p-1.5 rounded-full bg-gray-100 animate-pulse w-8 h-8" />;
  }

  const wishlistProducts = data?.wishlist?.products || [];

  console.log('Wishlist API response:', data);

  const isAdded = wishlistProducts.some((p: any) => p._id === productId);

  return <WishlistButton productId={productId} initialAdded={isAdded} />;
}
