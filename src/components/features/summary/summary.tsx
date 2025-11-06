'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { Card, CardContent } from '@/components/ui/card';
import SummarySkeleton from '@/components/skeletons/summary-skeleton';
import ApplyCoupon from '../copon/apply-coupon';

export default function SummaryCard() {
  const queryClient = useQueryClient();
  const [coupon, setCoupon] = useState('');

  const {
    data: cartData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const res = await fetch('/api/summary', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to load cart');
      return res.json();
    },
  });

  const {
    mutate: applyCoupon,
    data: couponData,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (code: string) => {
      const res = await fetch('/api/applycoupon', {
        method: 'POST',
        body: JSON.stringify({ code }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Invalid coupon');
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  if (isLoading) return <SummarySkeleton />;
  if (isError) return <p className="text-red-500">Failed to load cart.</p>;

  const subtotal = cartData?.cart?.totalPrice || 0;
  const discount = couponData?.discountAmount || 0;
  const total = couponData?.cart?.totalPriceAfterDiscount || subtotal - discount;

  return (
    <Card className="w-[458px] h-[605px] rounded-xl flex flex-col gap-6 p-6">
      <CardContent className="flex flex-col gap-6 p-0">
        <h2 className="text-2xl font-semibold">Summary</h2>

        <ApplyCoupon
          coupon={coupon}
          setCoupon={setCoupon}
          applyCoupon={applyCoupon}
          isPending={isPending}
          couponError={error}
          couponData={couponData}
        />

        <div className="flex justify-between text-sm text-zinc-700">
          <span>Subtotal</span>
          <span className="font-medium">{subtotal} EGP</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm font-semibold text-[#A6252A]">
            <span>Discount</span>
            <span>-{discount} EGP</span>
          </div>
        )}

        <hr className="border-zinc-200" />

        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span className="text-[#1F1F1F]">{total} EGP</span>
        </div>
      </CardContent>
    </Card>
  );
}
