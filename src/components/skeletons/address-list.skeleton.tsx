'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import { Address } from '@/lib/types/addresses';

/** Single skeleton card for an address */
export function AddressListSkeleton() {
  const locale = useLocale();
  const isArabic = locale === 'ar';

  return (
    <div className="rounded-2xl border border-zinc-300 p-4 mb-9 flex flex-col gap-4 relative">
      {/* Label placeholder */}
      <Skeleton className="absolute top-0 -translate-y-[60%] w-24 h-6 rounded" />

      {/* Edit/Delete buttons placeholder */}
      <div
        className={cn(
          "absolute flex flex-col gap-2 top-1/2 -translate-y-1/2",
          isArabic ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2"
        )}
      >
        <Skeleton className="w-6 h-6 rounded-full" />
        <Skeleton className="w-6 h-6 rounded-full" />
      </div>

      {/* City & Phone placeholder */}
      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center gap-2.5">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-20 h-6 rounded" />
        </div>
        <div className="flex items-center gap-1.5">
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="w-16 h-4 rounded" />
        </div>
      </div>

      {/* Street placeholder */}
      <Skeleton className="w-full h-4 rounded-full mt-2" />
    </div>
  );
}

/** Wrapper that renders multiple skeleton cards */
export function AddressListSkeletonWrapper({ addresses }: { addresses?: Address[] }) {
  const count = addresses?.length || 3;

  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: count }).map((_, idx) => (
        <AddressListSkeleton key={idx} />
      ))}
    </div>
  );
}

export default AddressListSkeleton;
