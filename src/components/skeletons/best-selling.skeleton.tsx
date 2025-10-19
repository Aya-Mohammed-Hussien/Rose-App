import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function BestSellingSkeleton() {
  return (
    <section className="p-6 mx-14">
      <div className="grid grid-cols-4 gap-9">
        {/* aside skeleton */}
        <aside className="col-span-1 flex flex-col gap-4">
          <Skeleton className="h-6 w-32" /> {/* small title */}
          <Skeleton className="h-8 w-full" /> {/* big heading line 1 */}
          <Skeleton className="h-8 w-3/4" /> {/* big heading line 2 */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
          <div className="mt-auto">
            <Skeleton className="h-10 w-40 rounded-lg" /> {/* button */}
          </div>
        </aside>

        {/* carousel skeleton */}
        <div className="col-span-3">
          <div className="flex gap-4 overflow-x-auto py-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="min-w-[280px] max-w-[320px] flex-shrink-0 flex flex-col gap-3"
              >
                {/* card image */}
                <Skeleton className="h-[272px] w-full rounded-xl" />

                {/* card footer */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <Skeleton className="h-5 w-48 rounded" />
                    <div className="flex gap-1 mt-2">
                      {Array.from({ length: 5 }).map((__, idx) => (
                        <Skeleton key={idx} className="h-4 w-4 rounded" />
                      ))}
                    </div>
                    <div className="mt-3">
                      <Skeleton className="h-5 w-28 rounded" />
                    </div>
                  </div>

                  <div className="flex-none self-end">
                    <Skeleton className="h-11 w-11 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* arrows placeholders (optional, to match layout) */}
          <div className="flex justify-between mt-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
