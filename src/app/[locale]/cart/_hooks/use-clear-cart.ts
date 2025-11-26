'use client';

// ===============================================================
// Hooks
// Custom hook to clear the user's cart using React Query mutation.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clearCartAction } from '../_actions/clear-cart.action';

// ===============================================================
// Functions
export function useClearCart() {
  const qc = useQueryClient(); // Access the global query cache

  return useMutation({
    mutationFn: async () => await clearCartAction(), // Server action call

    // --- Invalidate cart data after successful clear ---
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['cart'] }); // Refresh cart query
    },
  });
}
