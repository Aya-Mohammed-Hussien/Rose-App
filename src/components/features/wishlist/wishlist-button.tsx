'use client';

import React, { useMemo } from 'react';
import { HeartPlus, HeartMinus, LoaderCircle } from 'lucide-react';
import { useAddToWishlist } from '@/hooks/wishlist/use-add-wishlist';
import { useDeleteWishlist } from '@/hooks/wishlist/use-delete-wishlist';
import { useWishlist } from '@/hooks/wishlist/use-get-wishlist';

import { useTranslations } from 'next-intl';

// Props
export type AddToWishlistPayload = {
  productId: string;
};

export default function WishlistButton({ productId }: AddToWishlistPayload) {
  // Translations
  const t = useTranslations('Wishlist');

  // Mutation
  const { isPending: isPendingAdd, mutate: addToWishlist } = useAddToWishlist();
  const { isPending: isPendingDelete, mutate: deleteFromWishlist } = useDeleteWishlist();

  // Hooks
  const { wishlistProducts } = useWishlist();

  // Variables
  const isAdded = useMemo(() => {
    if (!wishlistProducts?.wishlist?.products) return false;
    // check if product is in wishlist or not by id
    return wishlistProducts.wishlist.products.some((product) => product._id === productId);
  }, [wishlistProducts, productId]);

  const isAnyPending = isPendingAdd || isPendingDelete;

  // Functions
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (!productId || isAnyPending) return;

    if (isAdded) {
      deleteFromWishlist(productId);
    } else {
      addToWishlist({ productId: String(productId) });
    }
  };

  return (
    <div className="inline-block">
      {/* wishlist action button */}
      <button
        onClick={handleClick}
        disabled={isAnyPending}
        aria-label={isAdded ? t('remove') : t('add')}
        className={`group/button flex items-center rounded-full p-1.5 text-sm font-medium transition-all duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-300
          ${isAdded ? 'bg-zinc-800 text-white' : 'bg-white text-rose-700'}
          cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        {/* loading state */}
        {isAnyPending ? (
          // loader icon
          <LoaderCircle
            className={`w-5 h-5 animate-spin ${isAdded ? 'text-white' : 'text-rose-700'}`}
          />
        ) : isAdded ? (
          // is added = true
          // heart minus icon
          <HeartMinus className="w-5 h-5 transition-transform duration-200" />
        ) : (
          // is added = false
          // heart plus icon
          <HeartPlus className="w-5 h-5 text-rose-700 transition-transform duration-200" />
        )}

        {/* hover  */}
        <span
          className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap
            opacity-0 max-w-0
            group-hover/button:opacity-100 group-hover/button:max-w-xs group-hover/button:ms-2`}
        >
          {isAnyPending
            ? isAdded
              ? t('removing')
              : t('adding')
            : isAdded
              ? t('remove')
              : t('add')}
        </span>
      </button>
    </div>
  );
}
