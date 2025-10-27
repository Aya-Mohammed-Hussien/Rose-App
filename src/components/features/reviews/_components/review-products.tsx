'use client';

import React from 'react';
import { ApiResponse } from '@/lib/types/review';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

type ReviewProductsProps = {
  reviews: ApiResponse['reviews'];
};

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

export default function ReviewProducts({ reviews }: ReviewProductsProps) {
  if (!reviews?.length) {
    return <div className={cn('text-center py-10')}>No reviews available.</div>;
  }

  return (
    <section className={cn('w-full max-w-3xl mx-auto')}>
      <div className={cn('flex flex-col gap-4 max-h-[500px] overflow-y-auto p-2 scrollbar-none')}>
        {reviews.map(({ _id, user, rating, title, comment, createdAt }) => {
          const initials = user?.firstName?.[0].toUpperCase() ?? 'A';
          const formattedDate = formatDate(createdAt);

          return (
            <article
              key={_id}
              className={'bg-white border-gray-200 shadow-sm p-5 flex flex-col gap-3 min-h-48'}
            >
              {/* Header */}
              <header className={cn('flex items-center gap-3')}>
                <div
                  className={cn(
                    'w-10 h-10 rounded-full bg-[#A6252A] text-white flex items-center justify-center font-bold'
                  )}
                >
                  {initials}
                </div>
                <div>
                  <p className={cn('font-semibold text-gray-800')}>
                    {user?.firstName ?? 'Anonymous'}
                  </p>
                  <p className={cn('text-sm text-gray-500')}>{formattedDate}</p>
                </div>
              </header>

              {/* Rating */}
              <div className={cn('flex items-center gap-1')}>
                {Array.from({ length: 5 }, (_, i) => {
                  const starValue = i + 1;
                  const isHalf = rating >= starValue - 0.5 && rating < starValue;
                  return (
                    <Star
                      key={i}
                      size={20}
                      className={cn(
                        rating >= starValue
                          ? 'text-yellow-500 fill-yellow-500'
                          : isHalf
                            ? 'text-yellow-500 fill-yellow-200'
                            : 'text-gray-300'
                      )}
                    />
                  );
                })}
                <span className={cn('ml-2')}>({rating.toFixed(1)})</span>
              </div>

              {/* Comment */}
              <div className={cn('flex flex-col gap-1')}>
                <h3 className={cn('text-lg font-semibold')}>{title}</h3>
                <p>{comment}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
