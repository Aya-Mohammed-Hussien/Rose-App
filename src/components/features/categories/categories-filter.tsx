'use client';

import ResetButton from '@/components/shared/reset-button';
import CategoriesFilterSkeleton from '@/components/skeletons/categories-filter.skeleton';
import { useCategory } from '@/hooks/category/use-category';
import { useUrlParams } from '@/hooks/params/use-url-params';
import { CategoriesResponse } from '@/lib/types/category';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function CategoriesFilter() {
  // Hooks
  const { categories, error, isLoading, fetchNextPage, hasNextPage } = useCategory();
  const { setParam, deleteParam } = useUrlParams();
  const searchParams = useSearchParams();

  // Variables
  const selectedCategory = searchParams.get('category');
  const allCategories =
    categories?.pages.flatMap((page: CategoriesResponse) => page.categories) ?? [];

  // Function
  const handleSelectedCategory = (id: string) => {
    setParam('category', id);
  };

  const handleReset = () => {
    deleteParam('category');
  };

  // Loading State
  if (isLoading) return <CategoriesFilterSkeleton />;

  // Error State
  if (error)
    return (
      <section className="w-full gap-2 flex flex-col">
        {/* Header */}
        <header className="flex flex-row justify-between ">
          <h2 className="font-semibold text-lg">Category</h2>
        </header>

        {/* Error Message */}
        <div className="text-center text-red-600 bg-red-50 p-3 rounded-md">
          <p>Some thing went wrong!</p>
          <p className="text-sm text-gray-600 mt-1">
            {typeof error === 'string' ? error : 'Please try again later.'}
          </p>
        </div>
      </section>
    );

  return (
    // Category Filter Section
    <section className="w-full  gap-2 flex flex-col">
      {/* Header */}
      <header className="flex flex-row justify-between ">
        {/* Title */}
        <h2 className="font-semibold text-lg">Category</h2>
        {/* Reset Button */}
        {selectedCategory && <ResetButton reset={handleReset} />}
      </header>

      {/* Scrollable Categories Container */}
      <div id="scrollableCategories" className="max-h-[200px] overflow-y-scroll scrollbar-hide">
        {/* Infinite Scroll Component to handle scrolling */}
        <InfiniteScroll
          dataLength={allCategories.length}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={<p className="text-center text-sm text-gray-500 py-2">Loading more...</p>}
          endMessage={<p className="text-center text-sm text-gray-400 py-2">No more categories </p>}
          scrollableTarget={'scrollableCategories'}
        >
          {/* Categories List */}
          <ul className="flex flex-col  gap-1 ">
            {allCategories.map((category) => {
              // Check To handle activation
              const isSelected = category._id === selectedCategory;
              return (
                <li
                  onClick={() => handleSelectedCategory(category._id)}
                  key={category._id}
                  className=" flex cursor-pointer  overflow-hidden  rounded-sm h-7"
                >
                  <div
                    className={cn(
                      // base
                      'w-9 flex flex-shrink-0 justify-center items-center',
                      // isActive
                      !isSelected ? 'bg-zinc-500' : 'bg-maroon-600'
                    )}
                  >
                    {/*Category image */}
                    <Image
                      quality={100}
                      src={category.image}
                      alt={category.name}
                      width={20}
                      height={20}
                      className="object-contain invert brightness-0 "
                    />
                  </div>

                  {/* Category name */}
                  <div
                    className={cn(
                      // base
                      'flex-1 capitalize pl-2 text-zinc-800  font-medium ',
                      // isActive
                      !isSelected ? 'bg-zinc-200 hover:bg-zinc-300' : 'bg-maroon-50'
                    )}
                  >
                    {' '}
                    {category.name}
                  </div>
                </li>
              );
            })}
          </ul>
        </InfiniteScroll>
      </div>
    </section>
  );
}
