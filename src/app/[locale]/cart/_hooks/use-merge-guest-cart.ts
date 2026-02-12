import { useSession } from 'next-auth/react';
import { clearGuestCart, getGuestCart } from '../../../../lib/utils/cart-storage';
import { useEffect } from 'react';
import { addToCartAction } from '../../../../app/[locale]/cart/_actions/add-to-cart.action';
import { useQueryClient } from '@tanstack/react-query';

export function useMergeGuestCart() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  useEffect(() => {
    // Only run if there is logged in user
    if (!session?.user) return;

    // get guestcart data
    const guestCart = getGuestCart();
    if (guestCart.length === 0) return;

    const mergeGuestcart = async () => {
      try {
        for (const item of guestCart) {
          await addToCartAction({ product: item.id, quantity: item.quantity });
        }
        clearGuestCart();

        // Refresh cart everywhere (Navbar, cart page, etc.)
        queryClient.invalidateQueries({ queryKey: ['cart'] });
      } catch (error) {
        console.log('failed to merge guestCart into DB', error);
      }
    };

    mergeGuestcart();
  }, [session, queryClient]);
}
