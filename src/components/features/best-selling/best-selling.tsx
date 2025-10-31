'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Product } from '@/lib/types/product';
import { Button } from '@/components/ui/button';
import ProductCarousel from '../product-carousel/product-carousel';

// Props
type BestSellingProps = {
  bestSelling: Product[];
};

export default function BestSelling({ bestSelling }: BestSellingProps) {
  return (
    // Best Selling Section
    <section className="   px-20   ">
      <div className="grid grid-cols-4 gap-9">
        {/* aside */}
        <aside className="col-span-1 flex flex-col gap-2    ">
          {/* title */}
          <header className=" text-[#FF668B] font-bold   uppercase ">best selling</header>

          {/* description */}
          <h4 className="text-[#741C21] font-bold capitalize text-3xl">
            {' '}
            <span className="text-[#FF668B]">check out</span> what everyone's
            <span className="text-[#FF668B]"> buying</span> right now
          </h4>

          {/* details */}
          <p className="text-zinc-500">
            Not sure what to choose? Start with our best sellers, these are the gifts our customers
            keep coming back for. Whether you're celebrating a birthday, anniversary or wedding, our
            top picks are guaranteed to leave a lasting impression.{' '}
          </p>

          {/* gifts button */}
          <div className="h-full flex  items-end">
            <Button className="text-white bg-[#A6252A] rounded-lg hover:bg-[#A6252A] ">
              Explore gifts <ArrowRight />
            </Button>
          </div>
        </aside>

        {/* Carousel */}
        <div className="col-span-3 relative">
          <ProductCarousel products={bestSelling} itemsPerView={3} />
        </div>
      </div>
    </section>
  );
}
