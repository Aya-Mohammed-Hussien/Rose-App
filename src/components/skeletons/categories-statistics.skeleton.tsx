'use client';

import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

/**
 * Skeleton loader for the Categories component.
 * Mimics the card with title and list of categories.
 */
export default function CategoriesStatisticsSkeleton() {
  return (
    <section className="p-6 rounded-2xl bg-white h-[20.375rem] w-[36.375rem] animate-pulse">
      {/* Title Skeleton */}
      <Skeleton className="h-8 w-1/3 mb-4 rounded" />

      {/* Categories list skeleton */}
      <ul className="space-y-2.5 max-h-[14.5625rem] overflow-y-auto">
        {[...Array(4)].map((_, i) => (
          <li key={i} className="flex justify-between border-b border-[rgba(0,0,0,0.08)] pb-2.5">
            {/* Category name placeholder */}
            <Skeleton className="h-5 w-1/2 rounded" />

            {/* Product count placeholder */}
            <Skeleton className="h-5 w-1/4 rounded" />
          </li>
        ))}
      </ul>
    </section>
  );
}
