// src/app/products/_hooks/occasions/useOccasions.ts
'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getOccasions } from '@/lib/apis/occasions/occasion.api';

const LIMIT = 6; // Number of items per page

export function useOccasions() {
  return useInfiniteQuery({
    // Unique cache key for React Query
    queryKey: ['occasions', 'infinite', LIMIT],

    // Fetch function — gets data for each page
    queryFn: ({ pageParam = 1 }) => getOccasions(pageParam, LIMIT),

    // Starting page number
    initialPageParam: 1,

    // Determine the next page to load
    getNextPageParam: (lastPage) => {
      const cur = lastPage?.metadata?.currentPage ?? 1;
      const total = lastPage?.metadata?.totalPages ?? 1;
      // If more pages exist, return the next page number
      return cur < total ? cur + 1 : undefined;
    },
  });
}
