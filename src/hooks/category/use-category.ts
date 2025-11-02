'use client';

import { getCategories } from '@/lib/apis/categories/categories.api';
import { useInfiniteQuery } from '@tanstack/react-query';

/**
 * Custom hook for fetching category with infinite scrolling/pagination support
 */
export const useCategory = () => {
  const {
    data: categories,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    error,
    fetchNextPage,
  } = useInfiniteQuery({
    // Unique Key
    queryKey: ['categories'],

    // Function that fetches data for each page
    queryFn: ({ pageParam = 1 }) => getCategories(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.metadata && lastPage.metadata.currentPage === lastPage.metadata.totalPages) {
        // Return undefined if no more pages available
        return undefined;
      }

      // Return the next page number, or undefined if metadata is missing
      return lastPage.metadata ? lastPage.metadata.currentPage + 1 : undefined;
    },
  });

  return {
    categories, // Data
    isLoading, // Loading state
    error, // Error state
    isFetchingNextPage, // True when loading additional pages
    hasNextPage, // True if more pages are available
    fetchNextPage, // Function to load the next page
  };
};
