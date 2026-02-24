'use client';

import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../product-card/product-card';
import { Product } from '@/lib/types/product';
import { useLocale } from 'next-intl';

type ProductCarouselProps = {
  products: Product[];
  itemsPerView?: number;
};

export default function ProductCarousel({ products, itemsPerView = 3 }: ProductCarouselProps) {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Calculate responsive items per view
  const getResponsiveBasis = () => {
    // Mobile: 1 item, Tablet: 2 items, Desktop: itemsPerView
    if (itemsPerView >= 4) {
      return 'basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4';
    } else if (itemsPerView === 3) {
      return 'basis-full sm:basis-1/2 lg:basis-1/3';
    } else {
      return 'basis-full sm:basis-1/2';
    }
  };

  return (
    <div className={`relative w-full px-4 sm:px-6 lg:px-0`}>
      <Carousel
        opts={{
          align: 'start',
          direction: isRTL ? 'rtl' : 'ltr',
        }}
        className="w-full"
      >
        <CarouselContent className="-ms-2 sm:-ms-4">
          {products.map((product) => (
            <CarouselItem key={product._id} className={`ps-2 sm:ps-4 ${getResponsiveBasis()}`}>
              <div className="p-1">
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute start-0 sm:start-[-15px] top-[40%] text-white hover:text-white bg-[#A6252A] hover:bg-[#A6252A] border-none shadow-md rounded-full w-8 h-8 sm:w-10 sm:h-10 hidden sm:flex">
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </CarouselPrevious>

        <CarouselNext className="absolute end-0 sm:end-[-15px] top-[40%] text-white hover:text-white bg-[#A6252A] hover:bg-[#A6252A] border-none shadow-md rounded-full w-8 h-8 sm:w-10 sm:h-10 hidden sm:flex">
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </CarouselNext>
      </Carousel>
    </div>
  );
}
