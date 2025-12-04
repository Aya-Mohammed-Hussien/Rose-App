'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ProductCardSkeleton } from './best-selling.skeleton';

/**
 * Skeleton loader for the Occasions component.
 * It matches the layout (header with title/nav + product grid)
 * and replaces all dynamic content with skeleton placeholders.
 */
export default function OccasionsSkeleton() {
  return (
    // Occasions Section Skeleton
    <section className="flex flex-col gap-10 px-20">
      {/* Header Skeleton */}
      <header className="flex flex-row justify-between items-center">
        {/* Title ("Most Popular") Skeleton */}
        <Skeleton className="h-10 w-56" />

        {/* Navigation (Occasion tabs) Skeleton */}
        <div className="flex flex-wrap gap-6">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>
      </header>

      {/* Product Grid Skeleton */}
      {/* Matches the grid-cols, responsive breakpoints, and gap from the original Card */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Render 8 product card skeletons to fill the grid */}

        {[...Array(8)].map((_, i) => (
          <ProductCardSkeleton key={i}/>
        ))}
      </div>
    </section>
  );
}
