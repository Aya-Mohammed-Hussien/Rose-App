import React, { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import ReviewSectionServer from '@/components/features/related-products/related-products-wrapper/relate-products.wrapper';
import RelatedProductsServer from '@/components/features/related-products/related-products-wrapper/related-section';

type ProductPageProps = { params: { id: string } };

export default function ProductPage({ params }: ProductPageProps) {
  const productId = params.id;

  if (!productId) {
    return <div className="text-center text-red-600 p-10">Product not found</div>;
  }

  return (
    <section className="px-20 py-10 flex flex-col gap-10">
      {/* Reviews */}
      <Suspense fallback={<Skeleton className="h-40 w-full" />}>
        <ReviewSectionServer productId={productId} />
      </Suspense>

      {/* Related products */}
      <Suspense fallback={<Skeleton className="h-40 w-full" />}>
        <RelatedProductsServer productId={productId} />
      </Suspense>
    </section>
  );
}
