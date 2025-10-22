'use client';

import React, { useState } from 'react';
import { Heart, HeartPlus } from 'lucide-react';
import { addToWishlist, removeFromWishlist } from '@/lib/apis/products/wishlist';
import { useQueryClient } from '@tanstack/react-query';

export type WishlistButtonProps = {
  productId: string | number;
  initialAdded?: boolean;
  className?: string;
};

export default function WishlistButton({
  productId,
  initialAdded = false,
  className = '',
}: WishlistButtonProps) {
  const [added, setAdded] = useState<boolean>(initialAdded);
  const [hovered, setHovered] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (loading) return;

    setLoading(true);
    const next = !added;
    setAdded(next);

    try {
      const response = next
        ? await addToWishlist(String(productId))
        : await removeFromWishlist(String(productId));

      console.log(' Wishlist API Response:', response);

      await queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    } catch (error: any) {
      console.error(' Wishlist API Error:', error);
      setAdded(!next);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      disabled={loading}
      className={`flex items-center gap-2 rounded-full p-1.5 text-sm font-medium transition-all duration-200 ease-in-out 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-300
        ${added ? 'bg-neutral-900 text-white hover:bg-neutral-800' : 'bg-white text-rose-700 border border-rose-200 hover:bg-rose-50'}
        ${loading ? 'opacity-60 cursor-wait' : 'cursor-pointer'}
        ${className}`}
    >
      {added ? (
        <Heart className="w-5 h-5 fill-white stroke-white transition-transform duration-200" />
      ) : (
        <HeartPlus className="w-5 h-5 text-rose-700 transition-transform duration-200" />
      )}

      {hovered && (
        <span className="transition-opacity duration-150 ease-in-out">
          {loading ? '...' : added ? 'Remove from wishlist' : 'Add to wishlist'}
        </span>
      )}
    </button>
  );
}
