import React from 'react';
import { getReviews } from '@/lib/apis/review-products/review-products';
import { ApiResponse } from '@/lib/types/review';
import ReviewsSection from '../../reviews/review-section';
import ReviewProducts from '../../reviews/_components/review-products';
import ReviewForm from '../../reviews/_components/add-review';

type Props = { productId: string };

export default async function ReviewSectionServer({ productId }: Props) {
  const reviewsData: ApiResponse = await getReviews(productId);
  const reviews = reviewsData?.reviews ?? [];

  return (
    <div className="flex flex-col gap-6">
      <ReviewsSection />
      <div className="flex gap-4">
        <ReviewProducts reviews={reviews} />
        <ReviewForm product={productId} />
      </div>
    </div>
  );
}
