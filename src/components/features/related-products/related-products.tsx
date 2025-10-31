'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Product } from '@/lib/types/product';
import ProductCarousel from '../product-carousel/product-carousel';

type RelatedProductsProps = {
  products: Product[];
};

export default function RelatedProducts({ products }: RelatedProductsProps) {
  const t = useTranslations();

  if (!products || products.length === 0) {
    return <div className="text-center text-red-600 p-10">{t('no-related-products-found-2')}</div>;
  }

  return (
    <div className="relative w-full ">
      <ProductCarousel products={products} itemsPerView={4} />
    </div>
  );
}
