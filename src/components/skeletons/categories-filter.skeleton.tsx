'use client';

import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

/**
 * Skeleton loader for the CategoriesFilter component.
 * Matches the layout of the filter sidebar, including the header
 * and a list of placeholder items.
 */
export default function CategoriesFilterSkeleton() {
  return (
    <aside className="w-72 gap-2 flex flex-col">
      {/* Header Skeleton */}
      <header className="flex flex-row justify-between items-center">
        {/* Title ("Category") Skeleton */}
        <Skeleton className="h-6 w-32" />
        {/* The reset button is conditional on 'selectedCategory'
            which is null during the 'isLoading' state,
            so we don't include a skeleton for it. */}
      </header>

      {/* List Container Skeleton */}
      {/* We mimic the max-h and use overflow-hidden to clip the content */}
      <div className="max-h-[200px] overflow-hidden">
        {/* The original ul has gap-1 */}
        <ul className="flex flex-col gap-1">
          {/* Render 7 placeholder items to fill the ~200px height */}
          {[...Array(7)].map((_, i) => (
            // This li mimics the structure of the real category item.
            // We add a 'gap-1' here (not present in the original)
            // to visually separate the icon and text skeletons.
            <li key={i} className="flex flex-row h-7 gap-1">
              {/* Icon Placeholder */}
              <Skeleton className="w-9 h-full rounded-sm flex-shrink-0" />
              {/* Text Placeholder */}
              <Skeleton className="flex-1 h-full rounded-sm" />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
