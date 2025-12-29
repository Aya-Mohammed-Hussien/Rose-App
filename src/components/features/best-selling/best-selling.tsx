'use client';

import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Product } from '@/lib/types/product';
import { Button } from '@/components/ui/button';
import ProductCarousel from '../product-carousel/product-carousel';
import { useLocale, useTranslations } from 'next-intl';

// Props
type BestSellingProps = {
  bestSelling: Product[];
};

export default function BestSelling({ bestSelling }: BestSellingProps) {
  // Translations
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  return (
    // Best Selling Section
    <section className="px-4 sm:px-6 lg:px-12 xl:px-20">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-9">
        {/* aside */}
        <aside className="col-span-1 lg:col-span-1 flex flex-col gap-3 sm:gap-4 lg:gap-2">
          {/* title */}
          <header className="text-[#FF668B] font-bold uppercase text-sm sm:text-base">
            {t('best-selling')}
          </header>

          {/* description */}
          <h4 className="text-[#741C21] font-bold capitalize text-xl sm:text-2xl lg:text-3xl leading-tight">
            <span className="text-[#FF668B]">({t('check-out')})</span>
            {t('what-everyone-s-buying-right-now')}
            <span className="text-[#FF668B]"> ({t('buying')})</span> {t('right-now')}
          </h4>

          {/* details */}
          <p className="text-zinc-500 text-sm sm:text-base leading-relaxed">
            {t('not-sure-what-to-choose-start-with-our-best-sellers-these-are-the-gifts-our-customers-keep-coming-back-for-whether-you-re-celebrating-a-birthday-anniversary-or-wedding-our-top-picks-are-guaranteed-to-leave-a-lasting-impression')}
          </p>

          {/* gifts button */}
          <div className="h-full flex items-end pt-4 lg:pt-0">
            <Button className="text-white bg-[#A6252A] rounded-lg hover:bg-[#A6252A] w-full sm:w-auto text-sm sm:text-base">
              {t('explore-gifts')} {
                isRTL ? <ArrowLeft size={18} className="sm:w-5 sm:h-5" /> : <ArrowRight size={18} className="sm:w-5 sm:h-5" />
              }
            </Button>
          </div>
        </aside>

        {/* Carousel */}
        <div className="col-span-1 lg:col-span-3 relative">
          <ProductCarousel products={bestSelling} itemsPerView={3} />
        </div>
      </div>
    </section>
  );
}
