import React from 'react';
import { getProductsByCategory } from '@/lib/apis/related-products/related-products';
import { RelatedProduct } from '@/lib/types/related-products';
import RelatedProducts from '../related-products';
import RelatedProductsUi from '../related-products-ui';

type Props = { productId: string };

export default async function RelatedProductsServer({ productId }: Props) {
  const relatedData = await getProductsByCategory(productId);
  const relatedProducts: RelatedProduct[] = relatedData?.relatedProducts ?? [];

  return (
    <>
      <RelatedProductsUi />
      {/* @ts-expect-error we intentionally treat RelatedProduct[] as Product[] */}
      <RelatedProducts products={relatedProducts} />
    </>
  );
}
