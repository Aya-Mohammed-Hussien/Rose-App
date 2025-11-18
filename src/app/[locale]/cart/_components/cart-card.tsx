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

  // Hooks
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

  // Effects
  useEffect(() => {
    form.setValue('quantity', initialQty, { shouldValidate: false, shouldDirty: false });
  }, [initialQty, form]);

  // Render
  // Display product card with image, info, rating, and quantity controls
  return (
    <div className="flex relative py-5">
      {/* ===== LEFT SIDE (PRODUCT IMAGE) ===== */}
      <div className="flex justify-start rtl:pl-4 ltr:pr-4">
        <div className="relative w-[117px] h-[140px] rounded-[8px] overflow-hidden bg-white">
          <Image src={image} alt={name} fill className="object-cover object-center" sizes="117px" />
        </div>
      </div>

      {/* ===== RIGHT SIDE (DETAILS & ACTIONS) ===== */}
      <div className="flex flex-col justify-between flex-1">
        {/* ----- TOP SECTION (TITLE + REMOVE) ----- */}
        <div className="flex flex-col">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1.5">
              <h3 className="font-semibold text-lg text-maroon-700">{name}</h3>

              {/* Product rating display */}
              <div className="flex items-center gap-1 text-base font-medium">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <span>
                  {t('ratingLabel')}: {rating.toFixed(1)}/5
                </span>
                <span className="text-blue-600 text-base font-medium">
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
              className="flex items-center justify-center gap-1.5 p-2.5 rounded-[10px] bg-[#DC2626] hover:bg-[#b91c1c] text-white font-primary font-medium text-sm leading-[100%]"
            >
              <Trash2 className="h-5 w-5" />
              <span className="font-primary font-medium text-sm leading-[100%]">
                {t('removeButton')}
              </span>
            </Button>
          </div>
        </div>

        {/* ----- BOTTOM SECTION (PRICE + QUANTITY CONTROL) ----- */}
        <div className="flex justify-between items-end">
          {/* Price info */}
          <div className="flex items-end gap-2">
            <span className="text-base font-medium text-maroon-600">
              (x{form.watch('quantity')})
            </span>
            <span className="text-2xl font-bold text-zinc-800">{Number(price).toFixed(2)}</span>
            <span className="text-base font-medium text-zinc-800">{t('currency')}</span>
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
                    <div className="flex items-center gap-2.5">
                      {/* Decrease button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        className="h-12 w-12 py-2.5 px-4 rounded-[10px] bg-maroon-50 text-red-600 hover:bg-maroon-100"
                        onClick={handleDecrease}
                      >
                        <Minus className="h-5 w-5" />
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
                        className="h-12 w-24 border border-zinc-300 text-sm text-zinc-400 focus-visible:ring-0"
                      />

                      {/* Increase button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        className="h-12 w-12 py-2.5 px-4 rounded-[10px] bg-maroon-50 text-red-600 hover:bg-maroon-100"
                        onClick={handleIncrease}
                      >
                        <Plus className="h-5 w-5" />
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
