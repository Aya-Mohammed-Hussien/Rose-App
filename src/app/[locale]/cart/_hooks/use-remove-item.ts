'use client';

// ===============================================================
// Hooks
// Custom hook to remove a single cart item using React Query mutation.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeCartItemAction } from '../_actions/remove-item.action';

// ===============================================================
// Functions
export function useRemoveItemAction() {
  const queryClient = useQueryClient(); // Access the global query cache

  return useMutation({
    mutationFn: (itemId: string) => removeCartItemAction(itemId), // Server action call

    // --- Invalidate cart data after successful removal ---
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}
