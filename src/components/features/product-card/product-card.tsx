'use client';

import React from 'react';
import Image from 'next/image';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Heart, Eye, ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/lib/types/product';
import { Badge } from '@/components/ui/badge';
import { RelatedProduct } from '@/lib/types/related-products';
import { cn } from '@/lib/utils';

// props
type ProductCardProps = {
  product: Product | RelatedProduct;
  hideBadge?: boolean;
};

export default function ProductCard({ product, hideBadge = false }: ProductCardProps) {
  return (
    <div key={product._id}>
      <CardContent className="p-0 h-[272px] border-none rounded-xl w-full relative group overflow-hidden flex cursor-pointer">
        <Image
          width={200}
          height={200}
          src={product.imgCover}
          alt={product.title}
          className="w-full h-full border-none rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Badge */}
        {!hideBadge && (
          <Badge
            className={cn(
              'flex justify-center items-center absolute rounded-2xl top-3 right-3 text-[12px]',
              'quantity' in product && product.quantity > 0
                ? 'bg-zinc-100 text-zinc-700'
                : 'bg-red-600 text-white'
            )}
          >
            {'quantity' in product && product.quantity > 0 ? 'NEW' : 'OUT OF STOCK'}
          </Badge>
        )}
        <div className="absolute inset-0 bg-[#E6507380]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 flex justify-center items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button className="w-7 h-7 rounded-full bg-white flex justify-center items-center">
            <Heart width={20} height={20} className="text-[#741C21]" />
          </button>
          <button className="w-7 h-7 rounded-full bg-white flex justify-center items-center">
            <Eye width={20} height={20} className="text-[#741C21]" />
          </button>
        </div>
      </CardContent>

      <CardFooter className="border-none flex flex-row mt-3 justify-between p-0">
        <div className="flex flex-col gap-3 w-3/4">
          <h3 className="font-semibold text-[18px] truncate w-[250px] text-[#741C21] ms-2">
            {product.title.length > 30 ? `${product.title.slice(0, 30)}...` : product.title}
          </h3>

          <div className="flex flex-row gap-1 ms-2">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < product.rateAvg ? 'text-[#FBA707] fill-[#FBA707]' : 'text-[#FBA707]'
                }`}
              />
            ))}
          </div>

          <p className="font-medium text-base flex gap-1 ms-2">
            <span className="text-[#741C21] uppercase">
              {product.priceAfterDiscount
                ? ` ${product.priceAfterDiscount} egp`
                : ` ${product.price} egp`}
            </span>
            <span className="text-zinc-400 line-through uppercase">
              {product.priceAfterDiscount && `${product.price} egp`}
            </span>
          </p>
        </div>

        <button
          aria-label="Add to cart"
          className="bg-[#A6252A] hover:bg-[#A6252A]/90 mb-1 w-11 h-11 rounded-full flex flex-none self-end justify-center items-center"
        >
          <ShoppingCart className="text-white w-6 h-6" />
        </button>
      </CardFooter>
    </div>
  );
}
