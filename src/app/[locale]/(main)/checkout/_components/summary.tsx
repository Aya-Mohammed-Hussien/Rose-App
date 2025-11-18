'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useApplyCoupon } from '@/hooks/coupons/use-apply-coupon';
import { couponSchema, CouponValues } from '@/lib/schemes/coupon.schema';
import { getCartResponse } from '@/lib/types/cart.api';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, TicketPercent } from 'lucide-react';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type SummaryProps = {
  cartData: getCartResponse;
};
export default function Summary({ cartData }: SummaryProps) {
  const coupons = cartData?.cart?.appliedCoupons ?? [];
  const isCouponExist = coupons.length > 0;

  const lastCoupon = isCouponExist ? coupons[coupons.length - 1] : null;

  const lastCouponValue = lastCoupon?.coupon?.discountValue ?? 0;

  const { isPending, addCoupon } = useApplyCoupon();

  const form = useForm<CouponValues>({
    defaultValues: {
      code: '',
    },

    resolver: zodResolver(couponSchema),
  });

  const onSubmit: SubmitHandler<CouponValues> = (coupon) => {
    addCoupon(coupon);
  };
  return (
    <section className="w-[27.625rem] flex flex-col gap-6">
      {/* header */}
      <header>
        {' '}
        <h2 className="font-semibold text-3xl text-zinc-800">Summary</h2>
      </header>

      {/* summary */}
      <div className="w-full flex flex-col gap-[0.625rem]  p-4 rounded-md bg-zinc-50 ">
        <Form {...form}>
          <form className="flex gap-[0.625rem] " onSubmit={form.handleSubmit(onSubmit)}>
            {/* Coupon Field */}
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="w-64" placeholder="Coupon Code" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isPending}
              type="submit"
              className="h-12 flex items-center font-semibold text-sm"
              variant={'default'}
            >
              {isPending ? (
                <>
                  Applying <Loader2 className="animate-spin" />
                </>
              ) : (
                <>
                  {' '}
                  <TicketPercent width={24} height={24} />
                  Apply Coupon{' '}
                </>
              )}
            </Button>
          </form>
        </Form>

        <ul
          className={cn(
            'w-full h-[15.125rem] border border-zinc-300 rounded-md',
            isCouponExist ? 'p-4 flex flex-col gap-[0.625rem]' : 'flex justify-center items-center'
          )}
        >
          {isCouponExist ? (
            coupons.map((coupon) => (
              <li
                key={coupon._id}
                className="w-full flex items-center justify-between p-3 border border-zinc-200 rounded-lg bg-white shadow-sm"
              >
                <div className="font-semibold text-zinc-800">{coupon.coupon.code}</div>

                <div className="font-semibold text-zinc-800">{coupon.coupon.discountValue}%</div>
              </li>
            ))
          ) : (
            <li className="text-zinc-400">No coupons applied</li>
          )}
        </ul>

        <div className="flex flex-col gap-[0.625rem] p-[0.625rem] text-zinc-800">
          {isCouponExist && (
            <>
              <div className="flex justify-between ">
                <p className="text-lg font-medium">Subtotal</p>
                <p className="font-semibold text-xl">{cartData.cart.totalPrice} EGP</p>
              </div>

              <div className="flex items-center w-full text-zinc-800">
                <hr className="flex-1 bg-zinc-300 h-px" />
                <span className="mx-[0.625rem] font-semibold">{lastCouponValue}% Discount</span>
                <hr className="flex-1 bg-zinc-300 h-px" />
              </div>
            </>
          )}

          <div className="flex justify-between text-zinc-800">
            <p className="text-2xl font-bold">Total</p>
            <p className="font-bold text-2xl">
              {isCouponExist ? cartData.cart.totalPriceAfterDiscount : cartData.cart.totalPrice} EGP
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
