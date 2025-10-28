'use client';

import React, { useState } from 'react';
import { HeartPlus, HeartMinus, LoaderCircle } from 'lucide-react';
import { useAddToWishlist } from '@/hooks/wishlist/use-add-wishlist';

export type AddToWishlistPayload = {
  productId: string;
};

export default function WishlistButton({ productId }: AddToWishlistPayload) {
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const { isPending, mutate: addToWishlist } = useAddToWishlist();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (!productId || isPending) return;

    addToWishlist(
      { productId: String(productId) },
      {
        onSuccess: (data) => {
          const message = data.message;
          if (message?.includes('added') || message?.includes('already in your wishlist')) {
            setIsAdded(true);
          }
        },
        onError: (err) => console.log('wishlist error:', err),
      }
    );
  };

  return (
    <div className="inline-block">
      <button
        onClick={handleClick}
        disabled={isPending}
        aria-label={isAdded ? 'Added to wishlist' : 'Add to wishlist'}
        className={`group/button flex items-center rounded-full p-1.5 text-sm font-medium transition-all duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-300
          ${isAdded ? 'bg-zinc-800 text-white' : 'bg-white text-rose-700 '}
          cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        {isPending ? (
          <LoaderCircle
            className={`w-5 h-5 animate-spin ${isAdded ? 'text-white' : 'text-rose-700'}`}
          />
        ) : isAdded ? (
          <HeartMinus className="w-5 h-5 transition-transform duration-200" />
        ) : (
          <HeartPlus className="w-5 h-5 text-rose-700 transition-transform duration-200" />
        )}

        <span
          className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap
            opacity-0 max-w-0
            group-hover/button:opacity-100 group-hover/button:max-w-xs group-hover/button:ml-2`}
        >
          {isPending ? 'Adding...' : isAdded ? 'Remove from wishlist' : 'Add to wishlist'}
        </span>
      </button>
    </div>
  );
}
