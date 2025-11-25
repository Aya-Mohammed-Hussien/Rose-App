'use client';

import { Skeleton } from '@/components/ui/skeleton';

export default function LowStockSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="flex items-center justify-between w-full h-8 pb-2 border-b border-black/10"
        >
          {/* Left — Product Name */}
          <Skeleton className="h-4 w-40 rounded" />

          {/* Right — Quantity */}
          <Skeleton className="h-4 w-20 rounded" />
        </div>
      ))}
    </div>
  );
}
