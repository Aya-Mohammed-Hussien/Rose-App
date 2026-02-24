'use client';

import React from 'react';
import ProductCard from '@/components/features/product-card/product-card';
import { Product } from '@/lib/types/product';
import { WishlistProduct } from '@/lib/types/wishlist';

interface WishlistGridProps {
  products: WishlistProduct['products'];
}

/**
 * WishlistGrid component - Single Responsibility: Render the grid of product cards.
 */
export function WishlistGrid({ products }: WishlistGridProps) {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product as unknown as Product} />
      ))}
    </section>
  );
}
