'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

export default dynamic(() => import('@/components/ui/error'), {
  loading: () => (
    <main className="min-h-screen bg-zinc-50 gap-12 flex flex-col justify-center items-center">
      {/* Loading image skeleton */}
      <Skeleton className="h-[300px] w-[300px] rounded-xl" />

      {/* Loading text skeletons */}
      <div className="flex flex-col gap-4 text-center w-[320px] max-w-full px-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
    </main>
  ),
});
