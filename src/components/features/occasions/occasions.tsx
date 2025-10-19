'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { useRouter, useSearchParams } from 'next/navigation';
import { Product } from '@/lib/types/product';
import { Occasion } from '@/lib/types/occasion';
import ProductCard from '../product-card/product-card';

// Props
type OccasionsProps = {
  occasions: Occasion[];
  products: Product[];
};

export default function Occasions({ products, occasions }: OccasionsProps) {
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
  }, [occasions, searchParams]);

  // functions
  const handleOccasionClick = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('occasion', id);
    router.push(`?${params.toString()}`, { scroll: false });
    setSelectedOccasion(id);
  };

  return (
    // Occasions Section
    <section className=" flex flex-col gap-10 px-20">
      {/* header */}
      <header className="flex flex-row justify-between items-center">
        {/* title */}
        <h3 className="relative font-bold text-[#741C21] text-4xl">
          <span className="relative z-50">Most Popular</span>
          <span className="absolute bg-red-100 left-0 top-7 rounded-e-lg w-3/4 h-4"></span>
          <span className="absolute left-0 -bottom-1 w-16 h-[3px] bg-red-500"></span>
        </h3>

        {/* navigation */}
        <div className="flex flex-wrap gap-6">
          {occasions.map((occasion) => (
            <div
              key={occasion._id}
              onClick={() => handleOccasionClick(occasion._id)}
              className={`cursor-pointer font-medium text-base ${
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
      <Card className="grid  shadow-none border-none grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Card>
    </section>
  );
}
