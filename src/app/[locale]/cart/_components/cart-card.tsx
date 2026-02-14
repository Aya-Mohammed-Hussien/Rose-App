'use client';

import Image from 'next/image';
import { Trash2, Star, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CartItemFromHook } from '@/lib/types/cart';
import { useRemoveItemAction } from '../_hooks/use-remove-item';
import { quantitySchema, QuantityValues } from '@/lib/schemes/cart-item.schema';
import { useUpdateCartItemQty } from '../_hooks/update-cart-qty';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function CartItem({
  id,
  name,
  image,
  rating,
  reviewsCount,
  price,
  quantity: initialQty,
}: CartItemFromHook) {
  // Translation
  const t = useTranslations('CartItem');

  // Hooks - Must be called before any early returns
  // Initialize form with validation for quantity field
  const form = useForm<QuantityValues>({
    resolver: zodResolver(quantitySchema),
    defaultValues: { quantity: initialQty },
  });

  // Mutations
  // Hook to remove item from cart
  const remove = useRemoveItemAction();
  // Hook to update item quantity in cart
  const updateQty = useUpdateCartItemQty();

  // Effects
  useEffect(() => {
    form.setValue('quantity', initialQty, { shouldValidate: false, shouldDirty: false });
  }, [initialQty, form]);

  // Validate required fields - after hooks
  if (!id || !name) {
    console.error('CartItem: Missing required fields', { id, name });
    return null;
  }

  // Functions
  // Increase product quantity by 1 and update backend
  const handleIncrease = () => {
    const currentQty = form.getValues('quantity');
    if (currentQty < 20) {
      const newQty = currentQty + 1;
      form.setValue('quantity', newQty);
      updateQty.mutate({ id, quantity: newQty });
    }
  };

  // Decrease product quantity (not below 1) and update backend
  const handleDecrease = () => {
    const current = form.getValues('quantity');

    if (current > 1) {
      const newQty = current - 1;
      form.setValue('quantity', newQty);
      updateQty.mutate({ id, quantity: newQty });
    } else {
      // remove item if quantity goes below 1
      remove.mutate(id);
    }
  };

  // Render
  // Display product card with image, info, rating, and quantity controls
  return (
    <div className="flex relative py-4 sm:py-5">
      {/* ===== LEFT SIDE (PRODUCT IMAGE) ===== */}
      <div className="flex justify-start rtl:pl-2 sm:rtl:pl-4 ltr:pr-2 sm:ltr:pr-4 flex-shrink-0">
        <div className="relative w-20 h-24 sm:w-[100px] sm:h-[120px] lg:w-[117px] lg:h-[140px] rounded-[8px] overflow-hidden bg-white">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 80px, (max-width: 1024px) 100px, 117px"
              onError={() => {
                console.error('Failed to load cart item image:', image);
                // You can set a fallback image here if needed
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-xs">
              No Image
            </div>
          )}
        </div>
      </div>

      {/* ===== RIGHT SIDE (DETAILS & ACTIONS) ===== */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        {/* ----- TOP SECTION (TITLE + REMOVE) ----- */}
        <div className="flex flex-col gap-2 sm:gap-0">
          <div className="flex justify-between items-start gap-2">
            <div className="flex flex-col gap-1 sm:gap-1.5 flex-1 min-w-0">
              <h3 className="font-semibold text-sm sm:text-base lg:text-lg text-maroon-700 truncate">{name}</h3>

              {/* Product rating display */}
              <div className="flex items-center gap-1 text-xs sm:text-sm lg:text-base font-medium flex-wrap">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-yellow-500" />
                <span>
                  {t('ratingLabel')}: {rating.toFixed(1)}/5
                </span>
                <span className="text-blue-600 text-xs sm:text-sm lg:text-base font-medium">
                  ({reviewsCount} {t('ratingsCountLabel')})
                </span>
              </div>
            </div>

            {/* Remove item button */}
            <Button
              variant="destructive"
              size="sm"
              type="button"
              onClick={() => remove.mutate(id)}
              className="flex items-center justify-center gap-1 sm:gap-1.5 p-1.5 sm:p-2.5 rounded-[10px] bg-[#DC2626] hover:bg-[#b91c1c] text-white font-primary font-medium text-xs sm:text-sm leading-[100%] flex-shrink-0"
            >
              <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline font-primary font-medium text-sm leading-[100%]">
                {t('removeButton')}
              </span>
            </Button>
          </div>
        </div>

        {/* ----- BOTTOM SECTION (PRICE + QUANTITY CONTROL) ----- */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 sm:gap-0 mt-3 sm:mt-0">
          {/* Price info */}
          <div className="flex items-end gap-1.5 sm:gap-2 flex-wrap">
            <span className="text-sm sm:text-base font-medium text-maroon-600">
              (x{form.watch('quantity')})
            </span>
            <span className="text-xl sm:text-2xl font-bold text-zinc-800">{Number(price).toFixed(2)}</span>
            <span className="text-sm sm:text-base font-medium text-zinc-800">{t('currency')}</span>
          </div>

          {/* Quantity control form */}
          <Form {...form}>
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">{t('quantityLabel')}</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      {/* Decrease button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        className="h-10 w-10 sm:h-12 sm:w-12 py-2 sm:py-2.5 px-3 sm:px-4 rounded-[10px] bg-maroon-50 text-red-600 hover:bg-maroon-100"
                        onClick={handleDecrease}
                      >
                        <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
                      </Button>

                      {/* Quantity input field */}
                      <Input
                        type="number"
                        min={1}
                        max={20}
                        {...field}
                        value={field.value}
                        onChange={(e) => {
                          const value = Math.min(20, Math.max(1, Number(e.target.value) || 1));
                          field.onChange(value);
                        }}
                        onBlur={() => {
                          const qty = form.getValues('quantity');
                          updateQty.mutate({ id, quantity: qty });
                        }}
                        className="h-10 w-16 sm:h-12 sm:w-24 border border-zinc-300 text-xs sm:text-sm text-zinc-400 focus-visible:ring-0"
                      />

                      {/* Increase button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        className="h-10 w-10 sm:h-12 sm:w-12 py-2 sm:py-2.5 px-3 sm:px-4 rounded-[10px] bg-maroon-50 text-red-600 hover:bg-maroon-100"
                        onClick={handleIncrease}
                      >
                        <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
        </div>
      </div>
    </div>
  );
}
