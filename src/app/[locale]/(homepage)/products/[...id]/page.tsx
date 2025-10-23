import React from 'react';
import { Product } from '@/lib/types/product';
import RelatedProducts from '@/components/features/related-products/related-products';
import RelatedProductsUi from '../page';
import { getProductsByCategory } from '@/lib/apis/related-products/related-products';
import ReviewProducts from '@/components/features/reviews/_components/review-products';
import { getReviews } from '@/lib/apis/review-products/review-products';
import { ApiResponse, Review } from '@/lib/types/review';
import AddReview from '@/components/features/reviews/_components/add-review';
import ReviewsSection from '@/components/features/reviews/review-section';
import { RelatedProduct } from '@/lib/types/related-products';

type ProductPageProps = { params: { id: string } };

export default async function ProductPage({ params }: ProductPageProps) {
  // Params
  const productId = params.id;
  if (!productId) {
    return <div className="text-center text-red-600 p-10">Product not found</div>;
  }

  let reviews: Review[] = [];
  try {
    const reviewsData: ApiResponse = await getReviews(productId);
    reviews = reviewsData?.reviews ?? [];
  } catch (error) {
    reviews = [];
  }

  let relatedProducts: RelatedProduct[] = [];
  try {
    const relatedData = await getProductsByCategory(params.id);
    relatedProducts = relatedData?.relatedProducts ?? [];
  } catch (error) {
    relatedProducts = [];
  }

  return (
    <section className="px-20 py-10">
      <ReviewsSection />
      <div className="flex gap-4">
        <ReviewProducts reviews={reviews} />
        <AddReview product={productId} />
      </div>

      <RelatedProductsUi />
      <RelatedProducts products={relatedProducts} />
    </section>
  );
}
