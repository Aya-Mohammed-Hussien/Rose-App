'use client';

import WishlistButton from '@/components/features/wishlist/wishlist-icons';

export default function WishlistButtonWrapper({ productId }: { productId: string }) {
  return <WishlistButton productId={productId} />;
}
