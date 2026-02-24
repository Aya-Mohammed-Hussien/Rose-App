'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

/**
 * Custom hook for managing URL query parameters.
 *
 * This hook provides helper methods to:
 * - Set a specific query parameter (`setParam`)
 * - Delete a specific query parameter (`deleteParam`)
 * - Remove all query parameters from the URL (`deleteAll`)
 *
 * @example
 * const { setParam, deleteParam, deleteAll } = useUrlParams();
 *
 */
export const useUrlParams = () => {
  // Navigation
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  /**
   * Set or update a query parameter in the current URL.
   *
   * @param {string} key - The name of the query parameter.
   * @param {string} value - The value to assign to the query parameter.
   */
  const setParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);
      // Reset to page 1 whenever a filter changes (not pagination itself)
      if (key !== 'page') params.set('page', '1');
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  /**
   * Delete a specific query parameter from the current URL.
   *
   * @param {string} key - The name of the query parameter to delete.
   */
  const deleteParam = useCallback(
    (key: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(key);
      // Reset to page 1 whenever a filter is removed (not pagination itself)
      if (key !== 'page') params.set('page', '1');
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  /**
   * Remove all query parameters and reset the URL to its base path.
   */
  const deleteAll = () => {
    router.push(pathname, { scroll: false });
  };

  return { setParam, deleteParam, deleteAll };
};
