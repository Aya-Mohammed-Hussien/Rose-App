'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { useRouter, useSearchParams } from 'next/navigation';
import { Product } from '@/lib/types/product';
import { Occasion } from '@/lib/types/occasion';
import ProductCard from '../product-card/product-card';
import TitleProduct from '@/components/shared/products-section-title';
import { useTranslations } from 'next-intl';

// Props
type OccasionsProps = {
  occasions: Occasion[];
  products: Product[];
};

export default function Occasions({ products, occasions }: OccasionsProps) {
  // Translations
  const t = useTranslations();
  // Navigation
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);

  // Effects
  useEffect(() => {
    // set default selected occasion
    const urlOccasion = searchParams.get('occasion');
    if (urlOccasion) {
      setSelectedOccasion(urlOccasion);
      return;
    }

    // if no query param, get first occasion from props
    if (occasions && occasions.length > 0) {
      const defaultOccasion = occasions[0]._id;
      setSelectedOccasion(defaultOccasion);
      const params = new URLSearchParams(searchParams.toString());
      params.set('occasion', defaultOccasion);
      router.replace(`?${params.toString()}`);
    }
  }, [occasions, searchParams, router]);

  // functions
  const handleOccasionClick = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('occasion', id);
    router.push(`?${params.toString()}`, { scroll: false });
    setSelectedOccasion(id);
  };

  return (
    // Occasions Section
    <section className="flex flex-col gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-6 lg:px-12 xl:px-20">
      {/* header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        {/* title */}
        <TitleProduct title={t('most-popular')} />
        {/* navigation */}
        <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-6">
          {occasions.map((occasion) => (
            <div
              key={occasion._id}
              onClick={() => handleOccasionClick(occasion._id)}
              className={`cursor-pointer font-medium text-sm sm:text-base ${
                selectedOccasion === occasion._id ? 'text-[#A6252A]' : 'text-zinc-700'
              }`}
            >
              {/* name */}
              {occasion.name}
            </div>
          ))}
        </div>
      </header>

      {/* product card */}
      <Card className="grid shadow-none border-none grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Card>
    </section>
  );
}
