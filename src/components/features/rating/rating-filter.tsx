'use client';

import ResetButton from '@/components/shared/reset-button';
import { useUrlParams } from '@/hooks/params/use-url-params';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function RatingFilter() {
  // Hooks
  const { setParam, deleteParam } = useUrlParams();
  const searchParams = useSearchParams();

  // Variables
  const selectedRating = searchParams.get('rateAvg');

  // Functions
  const handleSelctedRating = (rating: string) => {
    setParam('rateAvg', rating);
  };

  const handleReset = () => {
    deleteParam('rateAvg');
  };
  return (
    // Rating Section
    <section className="w-72  gap-2 flex flex-col">
      {/* Header */}
      <header className="flex flex-row justify-between ">
        {/* Title */}
        <h2 className="font-semibold text-lg">Rating</h2>
        {/* Reset Button */}
        {selectedRating && <ResetButton reset={handleReset} />}
      </header>

      {/* Rating Container */}
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          // Label
          <label htmlFor={`rating-${rating}`} key={rating} className="cursor-pointer">
            {/* Hidden input */}
            <input
              type="radio"
              id={`rating-${rating}`}
              name="rating"
              value={rating}
              className="hidden"
              checked={selectedRating === rating.toString()}
              onClick={() => {
                handleSelctedRating(rating.toString());
              }}
              aria-label={`${rating} star rating`}
            />
            {/* Star Icon */}
            <Star
              width={25}
              height={25}
              className={cn(
                'transition-all',
                selectedRating && rating <= Number(selectedRating)
                  ? 'fill-[#FBA707] stroke-[#FBA707]'
                  : 'stroke-[#FBA707] '
              )}
            />
          </label>
        ))}
      </div>
    </section>
  );
}
