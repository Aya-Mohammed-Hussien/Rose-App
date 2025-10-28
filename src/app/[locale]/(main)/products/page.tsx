import CategoriesFilter from '@/components/features/categories/categories-filter';
import RatingFilter from '@/components/features/rating/rating-filter';
import ResetAllButton from '@/components/shared/reset-all-button';
import React from 'react';

export default function page() {
  return (
    <aside className="flex flex-col gap-8 min-h-screen mx-24 my-11">
      {/* Category  */}
      <CategoriesFilter />

      {/* Rating */}
      <RatingFilter />

      {/* Reset All */}
      <ResetAllButton />
    </aside>
  );
}
