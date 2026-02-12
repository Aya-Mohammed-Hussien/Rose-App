import ProductDetails from '@/components/features/product-details/product-details';
import ProductGallery from '@/components/features/product-details/product-gallery';
import ReviewSectionServer from '@/components/features/related-products/related-products-wrapper/relate-products.wrapper';
import RelatedProductsServer from '@/components/features/related-products/related-products-wrapper/related-section';
import { Skeleton } from '@/components/ui/skeleton';
import { getProductDetails } from '@/lib/apis/products/product-details.api';
import { Suspense } from 'react';

type ProductProps = {
  params: { id: string };
};

export default async function page({ params: { id } }: ProductProps) {
  // If no ProductProps found
  if (!id) return <div>Product not found</div>;

  // Variables
  const productId = id;

  // Function
  const productDetails = await getProductDetails(productId);

  return (
    <div className="flex flex-col px-4 sm:px-6 lg:px-12 xl:px-20 pt-16 sm:pt-20 lg:pt-[4.25rem] dark:bg-zinc-800 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-[4.375rem] min-h-[32.6875rem]">
        {/* Product Gallery */}
        <ProductGallery
          images={productDetails.product.images}
          title={productDetails.product.title}
          coverImage={productDetails.product.imgCover}
        />

        {/* Product Details */}
        <ProductDetails product={productDetails.product} />
      </div>
      <div className="py-6 sm:py-8 lg:py-10 flex flex-col gap-6 sm:gap-8 lg:gap-10">
        {/* Reviews */}
        <Suspense fallback={<Skeleton className="h-40 w-full" />}>
          <ReviewSectionServer productId={productId} />
        </Suspense>

        {/* Related products */}
        <Suspense fallback={<Skeleton className="h-40 w-full" />}>
          <RelatedProductsServer productId={productId} />
        </Suspense>
      </div>
    </div>
  );
}
