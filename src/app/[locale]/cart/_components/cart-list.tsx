'use client';

import { ArrowLeft } from 'lucide-react';
import CartItem from './cart-card';
import { useCart } from '../_hooks/use-cart-query';
import { CartItemFromHook } from '@/lib/types/cart';
import ClearCartButton from './clear-cart-button';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function CartList() {
  // ===============================================================
  // Translation
  // ===============================================================
  const t = useTranslations('CartList');

  // ===============================================================
  // Hooks
  // ===============================================================
  // Fetch cart data with loading & error states
  const { data: cart = [], isLoading, error } = useCart();

  // Router for navigation
  const router = useRouter();

  // ===============================================================
  // Variables
  // ===============================================================
  const totalProducts = cart.length;

  // ===============================================================
  // Render
  // ===============================================================
  // Display the cart list with header, items, and action buttons
  if (isLoading) return <p className="text-center py-10">{t('loading')}</p>;
  if (error) return <p className="text-center text-red-500 py-10">{t('loadError')}</p>;

  return (
    <div className="flex flex-col gap-4 sm:gap-6 pt-8 sm:pt-12 lg:pt-16 max-w-3xl w-full">
      {/* ===== HEADER SECTION ===== */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 sm:gap-0">
        {/* Left side: title and total product count */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-2">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-zinc-800">{t('title')}</h1>
          <span className="text-zinc-400 text-sm sm:text-base font-medium">
            {totalProducts} {totalProducts === 1 ? t('singleProduct') : t('multipleProducts')}
          </span>
        </div>

        {/* Right side: Clear cart action */}
        <ClearCartButton disabled={totalProducts === 0} />
      </div>

      {/* ===== CART ITEMS LIST ===== */}
      <div className="flex flex-col px-3 sm:px-5 rounded-md border border-zinc-200 divide-y divide-zinc-200">
        {totalProducts > 0 ? (
          // Render all cart items
          cart.map((item: CartItemFromHook) => <CartItem key={item.id} {...item} />)
        ) : (
          // Empty state
          <p className="text-gray-600 text-center py-6 text-sm sm:text-base">{t('emptyCart')}</p>
        )}
      </div>

      {/* ===== FOOTER ACTION ===== */}
      {/* Continue Shopping button */}
      <Button
        onClick={() => router.push('/')}
        className="w-full sm:w-[213px] h-[41px] flex items-center justify-center gap-[10px] rounded-[10px] px-[16px] py-[10px] bg-[#A6252A] text-white font-medium text-sm sm:text-[14px] leading-[100%] hover:opacity-90 transition"
      >
        <ArrowLeft size={18} strokeWidth={2} />
        {t('continueShopping')}
      </Button>
    </div>
  );
}
