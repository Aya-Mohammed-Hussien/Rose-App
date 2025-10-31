'use client';

import React from 'react';
import Image from 'next/image';
import { CardContent, CardFooter } from '@/components/ui/card';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/lib/types/product';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import WishlistButton from '../wishlist/wishlist-button';

// props
type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  // Variables
  // Product dates
  const createdDate = new Date(product.createdAt); // product creation date
  const newProductDate = new Date('2024-10-10T00:00:00Z'); // new product threshold date

  // Product stats
  const sold = product.sold; // total sold units
  const quantity = product.quantity; // total available units

  // Product status
  const isNew = newProductDate <= createdDate; // check if product is new
  const isHot = quantity > 0 ? (sold / quantity) * 100 >= 20 : sold >= 100; // check if product is hot

  return (
    <div key={product._id}>
      {' '}
      {/* Product card wrapper */}
      <Link href={`/products/${product._id}`}>
        {/* Card content */}
        <CardContent className="p-0 h-[272px] border-none rounded-xl w-full relative group overflow-hidden flex cursor-pointer">
          {/* Wishlist button */}
          <div className="absolute z-50 top-3 left-3">
            <WishlistButton productId={product._id} />
          </div>

          {/* Product image */}
          <Image
            width={200}
            height={200}
            src={product.imgCover}
            alt={product.title}
            className="w-full h-full border-none rounded-xl object-cover  transition-transform duration-300"
          />

          {/* Badges */}
          <div className=" flex flex-row-reverse gap-1  absolute right-3 top-3">
            {/* New / Out of Stock badge */}
            {(product.quantity <= 0 || isNew) && (
              <Badge
                className={`flex justify-center items-center uppercase  ${
                  product.quantity <= 0
                    ? 'bg-red-600 hover:bg-red-600' // Out of Stock
                    : 'bg-zinc-100 hover:bg-zinc-100 text-zinc-700' // New
                }  rounded-2xl  text-[12px]`}
              >
                {product.quantity <= 0 ? 'out of stock' : 'new'}
              </Badge>
            )}

            {/* Hot badge */}
            {isHot && (
              <Badge className="flex justify-center text-[12px] rounded-2xl bg-maroon-50 text-maroon-600 hover:bg-maroon-50 items-center uppercase ">
                hot
              </Badge>
            )}
          </div>
        </CardContent>
      </Link>
      {/* Card footer */}
      <CardFooter className="border-none flex flex-row mt-3 justify-between p-0">
        <div className="flex flex-col gap-3 flex-1 min-w-0">
          {/* Product name */}
          <h3 className="font-semibold text-[18px] truncate text-[#741C21] ms-2">
            {product.title.length > 30 ? `${product.title.slice(0, 30)}...` : product.title}
          </h3>

          {/* Rating stars */}
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

          {/* Price and discount */}
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

        {/* Add to cart button */}
        <button
          aria-label="Add to cart"
          className="bg-[#A6252A] hover:bg-[#A6252A]/90 mb-1 w-11 h-11 rounded-full flex flex-none self-end justify-center items-center"
        >
          {/* Cart icon */}
          <ShoppingCart className="text-white w-6 h-6" />
        </button>
      </CardFooter>
    </div>
  );
}
