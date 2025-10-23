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

type RelatedProductsProps = {
  products: any[];
};

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products || products.length === 0) {
    return <div className="text-center text-red-600 p-10">No related products found</div>;
  }

  return (
    <div className="relative w-full">
      <Carousel opts={{ align: 'start' }}>
        <CarouselContent>
          {products.map((prod: any) => (
            <CarouselItem key={prod?._id ?? Math.random()} className="w-full basis-1/4 p-2">
              <ProductCard product={prod} hideBadge />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* previous arrow */}
        <CarouselPrevious className="absolute left-[-15px] top-[40%] text-white  hover:text-white  bg-[#A6252A] hover:bg-[#A6252A] border-none shadow-md rounded-full w-10 h-10 ">
          {' '}
          {/* icon */}
          <ChevronLeft className="w-5 h-5 text-white" />{' '}
        </CarouselPrevious>

        {/* next arrow */}
        <CarouselNext className="absolute right-[-15px] top-[40%] text-white hover:text-white  bg-[#A6252A] hover:bg-[#A6252A] border-none shadow-md rounded-full w-10 h-10 ">
          {/* icon */}
          <ChevronRight className="w-5 h-5 text-white" />
        </CarouselNext>
      </Carousel>
    </div>
  );
}
