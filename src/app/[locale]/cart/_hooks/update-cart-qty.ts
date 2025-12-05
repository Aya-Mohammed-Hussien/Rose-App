'use client';

// ===============================================================
// Hooks
// Custom hook to update a cart item's quantity using React Query mutation.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCartItemQtyAction } from '../_actions/update-qty.action';

// ===============================================================
// Functions
export function useUpdateCartItemQty() {
  const queryClient = useQueryClient(); // Access the query cache

  return useMutation({
    mutationFn: (payload: { id: string; quantity: number }) => updateCartItemQtyAction(payload),
  });
}
