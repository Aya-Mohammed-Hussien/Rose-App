'use client';

import { ArrowLeft } from 'lucide-react';
import CartItem from './cart-card';
import { CartItemFromHook } from '@/lib/types/cart';
import ClearCartButton from './clear-cart-button';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useCart } from '../_hooks/use-cart-query';

export default function CartList() {
  // Translation
  const t = useTranslations('CartList');

  // Hooks
  const { data: cart = [], isLoading, error } = useCart();

  // Variables
  const totalProducts = cart.length;

  // Render
  // Display the cart list with header, items, and action buttons
  return (
    <div className="flex flex-col gap-6 pt-16 max-w-3xl w-full">
      {/* ===== HEADER SECTION ===== */}
      <div className="flex items-end justify-between">
        {/* Left side: title and total product count */}
        <div className="flex items-end gap-2">
          <h1 className="text-5xl font-bold text-zinc-800">{t('title')}</h1>
          <span className="text-zinc-400 text-base font-medium">
            {totalProducts} {totalProducts === 1 ? t('singleProduct') : t('multipleProducts')}
          </span>
        </div>

        {/* Right side: Clear cart action */}
        <ClearCartButton disabled={totalProducts === 0} />
      </div>

      {/* ===== CART ITEMS LIST ===== */}
      <div className="flex flex-col px-5 rounded-md border border-zinc-200 divide-y divide-zinc-200">
        {totalProducts > 0 ? (
          // Render all cart items
          cart.map((item: CartItemFromHook) => <CartItem key={item.id} {...item} />)
        ) : (
          // Empty state
          <p className="text-gray-600 text-center py-6">{t('emptyCart')}</p>
        )}
      </div>

      {/* ===== FOOTER ACTION ===== */}
      {/* Continue Shopping button */}
      <Link
        href="/"
        className="w-52 h-10 flex items-center justify-center gap-[10px] rounded-[10px] px-[16px] py-[10px] bg-[#A6252A] text-white font-medium text-[14px] leading-[100%] hover:opacity-90 transition"
      >
        <Button className="flex items-center justify-center gap-[2.5px] rounded-[2.5px] px-[16px] py-[10px] bg-[#A6252A] text-white font-medium text-[14px] leading-[100%] hover:opacity-90 transition">
          <ArrowLeft size={18} strokeWidth={2} />
          {t('continueShopping')}
        </Button>
      </Link>
    </div>
  );
}
