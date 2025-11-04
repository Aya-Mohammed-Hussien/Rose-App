'use client';

// ===============================================================
// Hooks
// Custom React Query hook for fetching the user's cart data.
import { getCart } from '@/lib/apis/cart/cart.api';
import { useQuery } from '@tanstack/react-query';

// ===============================================================
// Functions
export function useCart() {
  return useQuery({
    queryKey: ['cart'], // Unique cache key for cart data
    queryFn: getCart, // Fetch function from API

    // --- Auto refetch options ---
    refetchOnWindowFocus: true, // Refetch on window focus
    refetchOnReconnect: true, // Refetch on network reconnect
  });
}
