'use client';

import { getAllOccasions } from '@/lib/apis/occasions/occasion.api';
import { useQuery } from '@tanstack/react-query';

/**
 * Custom hook to fetch occasions for the Add Product form dropdown.
 * Uses React Query to cache and manage the request state.
 *
 * Fetches categories from the backend and returns an array of occasion objects.
 */
export const useOccasions = () => {
  return useQuery({
    // Unique key for React Query's caching system
    queryKey: ['occasionList'],

    // Function that fetches occasion from the backend
    queryFn: () => getAllOccasions(),

    // Transform the response to return only the array of occasions
    select: (data) => data.occasions,
  });
};
