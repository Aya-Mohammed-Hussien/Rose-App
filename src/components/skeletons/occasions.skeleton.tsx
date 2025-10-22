import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function OccasionsSkeleton() {
  return (
    <div className="flex flex-col gap-8 mx-14">
      {/* header */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-48" />
        <div className="flex gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-20" />
          ))}
        </div>
      </div>

      {/* grid of cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="flex flex-col gap-3">
            {/* image area */}
            <div className="relative w-full">
              <Skeleton className="h-[272px] w-full rounded-xl" />

              {/* small badge top-right */}
              <div className="absolute top-3 right-3">
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>

              {/* action buttons placeholder (center overlay) */}
              <div className="absolute inset-0 flex justify-center items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>

            {/* footer/details */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                {/* title */}
                <Skeleton className="h-5 w-48 rounded" />

                {/* stars */}
                <div className="flex gap-1 mt-2">
                  {Array.from({ length: 5 }).map((__, i) => (
                    <Skeleton key={i} className="h-4 w-4 rounded" />
                  ))}
                </div>

                {/* price lines */}
                <div className="mt-3">
                  <Skeleton className="h-5 w-28 rounded" />
                  <Skeleton className="h-4 w-20 rounded mt-2" />
                </div>
              </div>

              {/* cart button */}
              <div className="flex-none self-end">
                <Skeleton className="h-11 w-11 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
