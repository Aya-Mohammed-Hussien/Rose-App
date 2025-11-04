'use client';

import React from 'react';
import Image from 'next/image';
import { CardContent, CardFooter } from '@/components/ui/card';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/lib/types/product';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import WishlistButton from '../wishlist/wishlist-button';
import useAddToCart from '@/app/[locale]/cart/_hooks/use-add-to-cart';
import { useTranslations } from 'next-intl';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  // ===============================================================
  // Translation
  // ===============================================================
  const t = useTranslations('ProductCard');

  // ---------------- Hooks ----------------
  const { addToCart, isPending } = useAddToCart();

  // ---------------- Handlers ----------------
  const handleAddToCart = () => {
    addToCart({ product });
  };

  // ---------------- Product Info ----------------
  const createdDate = new Date(product.createdAt);
  const newProductDate = new Date('2024-10-10T00:00:00Z');
  const sold = product.sold;
  const quantity = product.quantity;
  const isNew = newProductDate <= createdDate;
  const isHot = quantity > 0 ? (sold / quantity) * 100 >= 20 : sold >= 100;

  // ===========================================================
  return (
    <div key={product._id}>
      <Link href={`/products/${product._id}`}>
        <CardContent className="p-0 h-[272px] border-none rounded-xl w-full relative group overflow-hidden flex cursor-pointer">
          {/* Wishlist */}
          <div className="absolute z-50 top-3 left-3">
            <WishlistButton productId={product._id} />
          </div>

          {/* Image */}
          <Image
            width={200}
            height={200}
            src={product.imgCover}
            alt={product.title}
            className="w-full h-full border-none rounded-xl object-cover transition-transform duration-300"
          />

          {/* Badges */}
          <div className="flex flex-row-reverse gap-1 absolute right-3 top-3">
            {(product.quantity <= 0 || isNew) && (
              <Badge
                className={`flex justify-center items-center uppercase ${
                  product.quantity <= 0
                    ? 'bg-red-600 hover:bg-red-600'
                    : 'bg-zinc-100 hover:bg-zinc-100 text-zinc-700'
                } rounded-2xl text-[12px]`}
              >
                {product.quantity <= 0 ? t('badges.outOfStock') : t('badges.new')}
              </Badge>
            )}

            {isHot && (
              <Badge className="flex justify-center text-[12px] rounded-2xl bg-maroon-50 text-maroon-600 hover:bg-maroon-50 items-center uppercase">
                {t('badges.hot')}
              </Badge>
            )}
          </div>
        </CardContent>
      </Link>

      {/* Footer */}
      <CardFooter className="border-none flex flex-row mt-3 justify-between p-0">
        <div className="flex flex-col gap-3 flex-1 min-w-0">
          <h3 className="font-semibold text-[18px] truncate text-[#741C21] ms-2">
            {product.title.length > 30 ? `${product.title.slice(0, 30)}...` : product.title}
          </h3>

          {/* Stars */}
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

          {/* Price */}
          <p className="font-medium text-base flex gap-1 ms-2">
            <span className="text-[#741C21] uppercase">
              {product.priceAfterDiscount
                ? `${product.priceAfterDiscount} ${t('price.currency')}`
                : `${product.price} ${t('price.currency')}`}
            </span>
            <span className="text-zinc-400 line-through uppercase">
              {product.priceAfterDiscount && `${product.price} ${t('price.currency')}`}
            </span>
          </p>
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          disabled={isPending}
          aria-label={t('buttons.addToCart')}
          className={`bg-[#A6252A] hover:bg-[#A6252A]/90 mb-1 w-11 h-11 rounded-full flex flex-none self-end justify-center items-center ${
            isPending ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          <ShoppingCart className="text-white w-6 h-6" />
        </button>
      </CardFooter>
    </div>
  );
}
