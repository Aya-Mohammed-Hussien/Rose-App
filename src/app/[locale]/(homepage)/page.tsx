import BestSellingSkeleton from '@/components/skeletons/best-selling.skeleton';
import OccasionsSkeleton from '@/components/skeletons/occasions.skeleton';
import React, { Suspense } from 'react';
import { CarouselSection } from './_components/carousel-section/carousel-section';
import { GiftCategories } from './_components/gift-categories/gift-categories';
import { InfoBar } from './_components/infobar/info-bar';
import OccasionsSection from './_components/server/occasions-section';
import BestSellingSection from './_components/server/best-selling-section';
import Categories from '@/components/features/categories/categories-filter';

export default async function page({ searchParams }: { searchParams: { occasion?: string } }) {
  // Variables
  const occasionId = searchParams?.occasion;

  return (
    <main className="flex flex-col  gap-32 py-12">
      {/* Carousel Section */}
      <CarouselSection />

      {/* Gift Section */}
      <GiftCategories />
      <InfoBar />

      {/* Best Selling Section */}
      <Suspense fallback={<BestSellingSkeleton />}>
        <BestSellingSection />
      </Suspense>

      {/* Occasions Section */}
      <Suspense fallback={<OccasionsSkeleton />}>
        <OccasionsSection occasionId={occasionId} />
      </Suspense>
    </main>
  );
}
