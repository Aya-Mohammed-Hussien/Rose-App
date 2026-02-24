'use client';

import React from 'react';
import { useWishlist } from '@/hooks/wishlist/use-get-wishlist';
import { LoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { WishlistGrid } from './wishlist-grid';
import { WishlistEmpty } from './wishlist-empty';

/**
 * WishlistContent component - Separates data fetching and logic from the main page.
 * Responsibilities:
 * 1. Fetch wishlist products using custom hook.
 * 2. Manage loading and empty conditionally.
 * 3. Orchestrate sub-components (Grid/Empty).
 */
export default function WishlistContent() {
  const t = useTranslations('Wishlist');
  const { wishlistProducts } = useWishlist();

  // Loading state
  if (!wishlistProducts) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
        <LoaderCircle className="w-10 h-10 animate-spin text-[#A6252A]" />
        <p className="text-zinc-500 ">{t('loading')}</p>
      </div>
    );
  }

  const products = wishlistProducts.wishlist?.products || [];

  if (products.length === 0) {
    return <WishlistEmpty />;
  }

  return <WishlistGrid products={products} />;
}
