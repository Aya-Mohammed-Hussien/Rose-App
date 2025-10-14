import BestSelling from '@/components/features/best-selling/best-selling';
import Occasions from '@/components/features/occasions/occasions';
import BestSellingSkeleton from '@/components/skeletons/best-selling.skeleton';
import OccasionsSkeleton from '@/components/skeletons/occasions.skeleton';
import { getOccasions } from '@/lib/apis/occasions/occasion.api';
import { getBestSellingProducts } from '@/lib/apis/products/best-selling.api';
import { getProductsByOccasion } from '@/lib/apis/products/products-by-occasion.api';
import React, { Suspense } from 'react';

export default async function page({ searchParams }: { searchParams: { occasion?: string } }) {
  // variables
  const occasionsData = await getOccasions();
  const productsData = searchParams.occasion
    ? await getProductsByOccasion(searchParams.occasion)
    : null;
  const bestSellingData = await getBestSellingProducts();

  return (
    <main className="flex flex-col  gap-32 py-12">
      {/* best selling section */}
      <Suspense fallback={<BestSellingSkeleton />}>
        <BestSelling bestSelling={bestSellingData.products} />
      </Suspense>

      {/* most popular section */}
      <Suspense fallback={<OccasionsSkeleton />}>
        <Occasions occasions={occasionsData.occasions} products={productsData?.products || []} />
      </Suspense>
    </main>
  );
}
