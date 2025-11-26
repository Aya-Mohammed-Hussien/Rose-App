'use client';

import { Skeleton } from '@/components/ui/skeleton';

export default function TopSellingSkeleton() {
  return (
    <div className="space-y-2">
      {/* Skeleton Rows */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="flex items-center justify-between w-full h-10 rounded px-3 py-2 bg-zinc-100 animate-pulse"
        >
          {/* Left — Title + Price */}
          <div className="flex items-center gap-2 w-[70%]">
            <Skeleton className="h-4 w-32 rounded" />
            <Skeleton className="h-3 w-16 rounded" />
          </div>

          {/* Right — Sold */}
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-6 rounded" />
            <Skeleton className="h-4 w-10 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
