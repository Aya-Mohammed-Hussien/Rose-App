'use client';

import { useSession } from 'next-auth/react';
import { clearGuestCart, getGuestCart } from '../cart-storage';
import { useEffect } from 'react';
import { addToCartAction } from '../_actions/add-to-cart.action';

export function useMergeGuestCart() {
  const { data: session } = useSession();

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
      } catch (error) {
        console.log('failed to merge guestCart into DB', error);
      }
    };

    mergeGuestcart();
  }, [session]);
}
