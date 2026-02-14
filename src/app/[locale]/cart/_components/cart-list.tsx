'use client';

import { ArrowLeft, MoveRight } from 'lucide-react';
import CartItem from './cart-card';
import { useCart } from '../_hooks/use-cart-query';
import { CartItemFromHook } from '@/lib/types/cart';
import ClearCartButton from './clear-cart-button';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import cartLogo from '../../../../../public/assets/images/no-cart.png'
import Image from 'next/image';
import SkeltonCard from './skelton-card';
import Summary from '../../(main)/checkout/_components/summary';
import { getCartResponse } from '@/lib/types/cart.api';

// Props 
type CartListProps = {
  cartData: getCartResponse;
};

export default function CartList({ cartData }: CartListProps) {
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
  if (isLoading) return <SkeltonCard />;
  if (error) return <p className="text-center text-red-500 py-10">{t('loadError')}</p>;

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">

      <div className="flex-1 flex flex-col gap-4 sm:gap-6 pt-8 sm:pt-12 lg:pt-16 max-w-5xl w-full">
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

            <div className="flex flex-col justify-center items-center">
              <Image src={cartLogo} alt="Cart" className="w-60 h-60" />
              <p className="text-gray-600 text-center py-6 text-sm sm:text-base">
                {t('your-cart-is-empty-wanna-try-shopping-0')}
              </p>
            </div>

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

      <div className="w-full mt-16 lg:w-auto flex flex-col gap-4">
        <Summary cartData={cartData} />

        {/* Checkout button under coupon/summary card */}
        <Button
          onClick={() => router.push('/checkout')}
          className="w-full h-14 bg-[#A6252A] hover:bg-[#8b1f24] text-white font-medium text-sm sm:text-base rounded-lg flex items-center justify-center gap-2"
        >
          Checkout <MoveRight size={18} />
        </Button>
      </div>
    </div>
  );
}
