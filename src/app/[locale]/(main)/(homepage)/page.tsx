import BestSellingSkeleton from '@/components/skeletons/best-selling.skeleton';
import OccasionsSkeleton from '@/components/skeletons/occasions.skeleton';
import React, { Suspense } from 'react';


export default async function page({ searchParams }: { searchParams: { occasion?: string } }) {
  // Variables
  const occasionId = searchParams?.occasion;

  return (
    <main className="flex flex-col gap-28 py-10">
      <div className="px-20">

      </div>

      {/* Best Selling Section */}
      <Suspense fallback={<BestSellingSkeleton />}>

      </Suspense>

      {/* Occasions Section */}
      <Suspense fallback={<OccasionsSkeleton />}>

      </Suspense>
    </main>
  );
}
