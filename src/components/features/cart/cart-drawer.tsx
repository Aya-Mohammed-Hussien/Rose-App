'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useCart } from '@/app/[locale]/cart/_hooks/use-cart-query';
import { CartItemFromHook } from '@/lib/types/cart';
import { ShoppingBag, X, ArrowRight, Trash2, ShoppingCart, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useRemoveItemAction } from '@/app/[locale]/cart/_hooks/use-remove-item';
import { useUpdateCartItemQty } from '@/app/[locale]/cart/_hooks/update-cart-qty';
import { cn } from '@/lib/utils';
import cartLogo from '../.../../../../../public/assets/images/no-cart.png'

// Props for the CartDrawer component
type CartDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { data: cart = [], isLoading } = useCart();
  const router = useRouter();
  const t = useTranslations('CartList');

  // Actions to remove item or update quantity
  const remove = useRemoveItemAction();
  const updateQty = useUpdateCartItemQty();

  const handleIncrease = (item: CartItemFromHook) => {
    const newQty = Math.min(item.quantity + 1, 20);
    updateQty.mutate({ id: item.id, quantity: newQty });
  };

  const handleDecrease = (item: CartItemFromHook) => {
    if (item.quantity > 1) {
      const newQty = item.quantity - 1;
      updateQty.mutate({ id: item.id, quantity: newQty });
    } else {
      // If the quantity is 1 and we decrease it, we remove the product from the cart
      remove.mutate(item.id);
    }
  };

  const totalProducts = cart.length;
  const totalPrice = cart.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseIcon={false}
        className={cn(`
          fixed right-4 sm:right-10 top-16 left-auto z-50 
          translate-x-0 translate-y-0
          w-[calc(100vw-32px)] sm:w-[400px] 
          max-h-[620px]
          bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.1)] 
          flex flex-col overflow-hidden border border-zinc-50
          focus:outline-none
           data-[state=open]:animate-in 
          data-[state=closed]:animate-out 
          data-[state=open]:fade-in 
          data-[state=closed]:fade-out 
          data-[state=open]:slide-in-from-top-2
          data-[state=closed]:slide-out-to-top-2
          duration-700 ease-out
        `)}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-50/80 bg-[#FFFCFC]">
          <h2 className="text-[#741C21] font-bold text-base flex items-center gap-2">
            <ShoppingCart size={18} />
            {t('title')}
          </h2>
          <button
            onClick={() => onOpenChange(false)}
            className="p-1.5 rounded-full hover:bg-rose-50 text-zinc-300 hover:text-[#FF668B] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="max-h-[320px] overflow-y-auto px-6 custom-scrollbar">
          {isLoading ? (
            <div className="py-20 flex justify-center">
              <div className="w-5 h-5 border-2 border-[#FF668B]/20 border-t-[#FF668B] rounded-full animate-spin" />
            </div>
          ) : totalProducts === 0 ? (
            <div className="py-16 flex flex-col items-center text-center">
              <Image src={cartLogo} alt="CartLogo" className="w-20 h-20 mb-4 opacity-80" />
              <p className="text-sm font-bold text-zinc-500 max-w-[200px] leading-relaxed">
                {t('your-cart-is-empty-wanna-try-shopping-0')}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-zinc-50">
              {cart.map((item: CartItemFromHook) => (
                <div key={item.id} className="py-5 flex gap-4 items-center group">
                  <div className="relative h-14 w-14 rounded-xl overflow-hidden bg-zinc-50 border border-zinc-100 flex-shrink-0">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    {/* Product Name + Price in one row */}
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-zinc-800 truncate">{item.name}</h4>
                      <p className="text-sm font-black text-[#A6252A] whitespace-nowrap">
                        {Number(item.price).toFixed(2)} <span className="text-[9px] font-normal">EGP</span>
                      </p>
                    </div>

                    {/* Control Row: +/- and quantity number + delete button */}
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full bg-rose-50 px-2 py-1">
                        <button
                          type="button"
                          onClick={() => handleDecrease(item)}
                          className="h-7 w-7 flex items-center justify-center rounded-full text-[#A6252A] hover:bg-rose-100 text-xs"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-[11px] font-semibold text-zinc-700 min-w-[16px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleIncrease(item)}
                          className="h-7 w-7 flex items-center justify-center rounded-full text-[#A6252A] hover:bg-rose-100 text-xs"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => remove.mutate(item.id)}
                        className="h-7 w-7 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100"
                        aria-label="Remove item from cart"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {totalProducts > 0 && (
          <div className="p-6 bg-[#FFFCFC] border-t border-zinc-50 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Total</span>
              <span className="text-xl font-black text-[#741C21]">{totalPrice.toFixed(2)} EGP</span>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                onClick={() => router.push('/checkout')}
                className="w-full bg-[#A6252A] hover:bg-[#8A1F23] text-white py-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-maroon-100"
              >
                Go to Checkout
                <ArrowRight size={16} />
              </Button>
              <button
                onClick={() => router.push('/cart')}
                className="w-full py-2 text-[11px] font-bold text-zinc-400 hover:text-[#FF668B] transition-colors uppercase tracking-widest"
              >
                View Cart
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}