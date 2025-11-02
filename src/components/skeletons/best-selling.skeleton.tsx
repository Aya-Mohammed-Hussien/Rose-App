'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Skeleton placeholder for a single product card.
 * This component mimics the structure of your ProductCard
 * with an image, title, price, and an action button.
 */
export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 p-1">
      {/* Product Image Placeholder */}
      <Skeleton className="h-56 w-full rounded-lg" />
      {/* Product Title Placeholder */}
      <Skeleton className="h-5 w-3/4" />
      {/* Product Price Placeholder */}
      <Skeleton className="h-5 w-1/2" />
      {/* "Add to Cart" or "View" Button Placeholder */}
      <Skeleton className="h-9 w-full rounded-md mt-1" />
    </div>
  );
}

/**
 * Skeleton loader for the BestSelling component.
 * It matches the layout (aside + carousel) and replaces all
 * dynamic content with skeleton placeholders.
 */
export default function BestSellingSkeleton() {
  return (
    // Best Selling Section Skeleton
    <section className="px-20">
      <div className="grid grid-cols-4 gap-9">
        {/* Aside Skeleton */}
        <aside className="col-span-1 flex flex-col gap-3">
          {/* Title ("best selling") */}
          <Skeleton className="h-5 w-24" />

          {/* Heading (h4) */}
          <div className="flex flex-col gap-2 mt-1">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-3/4" />
          </div>

          {/* Description (p) */}
          <div className="flex flex-col gap-2 mt-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>

          {/* Button ("Explore gifts") */}
          {/* mt-auto pushes this skeleton to the bottom of the flex column */}
          <Skeleton className="h-10 w-36 rounded-lg mt-auto" />
        </aside>

        {/* Carousel Skeleton */}
        <div className="col-span-3 relative">
          {/* Previous Arrow Placeholder */}
          <Skeleton className="absolute left-[-15px] top-[40%] rounded-full w-10 h-10" />

          {/* This grid simulates the visible items in the carousel.
            The original component shows 3 items (basis-1/3).
          */}
          <div className="grid grid-cols-3 gap-4">
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </div>

          {/* Next Arrow Placeholder */}
          <Skeleton className="absolute right-[-15px] top-[40%] rounded-full w-10 h-10" />
        </div>
      </div>
    </section>
  );
}
