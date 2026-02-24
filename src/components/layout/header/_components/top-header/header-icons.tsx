'use client';

import { Link } from '@/i18n/navigation';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '@/app/[locale]/cart/_hooks/use-cart-query';
import React from 'react';
import CartDrawer from '@/components/features/cart/cart-drawer';

import { useWishlist } from '@/hooks/wishlist/use-get-wishlist';

export default function HeaderIcons() {
  const { data: cart = [] } = useCart();
  const cartCount = cart.length;

  const { wishlistProducts } = useWishlist();
  const wishlistCount = wishlistProducts?.wishlist?.products?.length || 0;

  const [openCart, setOpenCart] = React.useState(false);

  return (
    <>
      <ul className="flex justify-center items-center gap-2.5 px-4 py-2 border-e border-zinc-200 dark:border-e-zinc-700">
        <li>
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="relative text-zinc-700 dark:text-zinc-50"
          >
            <Heart size={24} />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-semibold text-white">
                {wishlistCount}
              </span>
            )}
          </Link>
        </li>

        {/* Cart icon with badge - opens drawer */}
        <li>
          <button
            type="button"
            aria-label="Cart"
            onClick={() => setOpenCart(true)}
            className="relative text-zinc-700 dark:text-zinc-50 transition-colors"
          >
            <ShoppingCart size={24} />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </button>
        </li>
      </ul>

      <CartDrawer open={openCart} onOpenChange={setOpenCart} />
    </>
  );
}
