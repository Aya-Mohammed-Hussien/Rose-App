import BestSelling from '@/components/features/best-selling/best-selling';
import { getBestSellingProducts } from '@/lib/apis/products/best-selling.api';
import React from 'react';

export default async function BestSellingSection() {
  const bestSellingData = await getBestSellingProducts();
  return <BestSelling bestSelling={bestSellingData.products} />;
}
