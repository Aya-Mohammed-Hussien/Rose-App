'use client';

// ===============================================================
// Hooks
// Custom hook to update a cart item's quantity using React Query mutation.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCartItemQtyAction } from '../_actions/update-qty.action';
import { useRouter } from '@/i18n/navigation';

// ===============================================================
// Functions
export function useUpdateCartItemQty() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: { id: string; quantity: number }) => updateCartItemQtyAction(payload),
    onSuccess: () => {
      // Ensure all cart consumers (Navbar, cart page, etc.) get fresh data
      queryClient.invalidateQueries({ queryKey: ['cart'] });

      // Refresh server components (cart summary, header, etc.)
      router.refresh();
    },
  });
}
