'use client';

import { getAllCategories } from '@/lib/apis/categories/categories.api';
import { useQuery } from '@tanstack/react-query';

/**
 * Custom hook to fetch categories for the Add Product form dropdown.
 * Uses React Query to cache and manage the request state.
 *
 * Fetches categories from the backend and returns an array of Category objects.
 */
export const useCategories = () => {
  return useQuery({
    // Unique key for React Query's caching system
    queryKey: ['categoryList'],

    // Function that fetches categories from the backend
    queryFn: () => getAllCategories(),

    // Transform the response to return only the array of categories
    select: (data) => data.categories,
  });
};
