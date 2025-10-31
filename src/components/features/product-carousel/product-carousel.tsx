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

type ProductCarouselProps = {
  products: Product[];
  itemsPerView?: number;
};

export default function ProductCarousel({ products, itemsPerView = 3 }: ProductCarouselProps) {
  return (
    <div className={`relative w-full`}>
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full"
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product._id} className={`basis-1/${itemsPerView}`}>
              <div className="p-1">
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-[-15px] top-[40%] text-white hover:text-white bg-[#A6252A] hover:bg-[#A6252A] border-none shadow-md rounded-full w-10 h-10">
          <ChevronLeft className="w-5 h-5 text-white" />
        </CarouselPrevious>

        <CarouselNext className="absolute right-[-15px] top-[40%] text-white hover:text-white bg-[#A6252A] hover:bg-[#A6252A] border-none shadow-md rounded-full w-10 h-10">
          <ChevronRight className="w-5 h-5 text-white" />
        </CarouselNext>
      </Carousel>
    </div>
  );
}
