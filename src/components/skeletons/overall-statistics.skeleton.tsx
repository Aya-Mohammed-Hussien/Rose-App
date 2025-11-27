'use client';

import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

/**
 * Skeleton loader for the KPICards component.
 * Mimics the 4 KPI cards with icon, value, and label.
 */
export default function KPICardsSkeleton() {
  return (
    <section className="h-[20.375rem] w-[30.625rem] grid grid-cols-2 p-6 gap-4 bg-white rounded-2xl animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex flex-col p-4 rounded-xl space-y-3 bg-zinc-100">
          {/* Icon placeholder */}
          <Skeleton className="h-9 w-9 rounded-full bg-zinc-200" />

          {/* Value placeholder */}
          <Skeleton className="h-7 w-2/3 rounded bg-zinc-200" />

          {/* Currency placeholder (for revenue) */}
          <Skeleton className="h-4 w-1/4 rounded bg-zinc-200" />
        </div>
      ))}
    </section>
  );
}
