'use client';

import { Button } from '@/components/ui/button';
import { ShippingPayload } from '@/lib/types/address';
import { ArrowLeft, Loader2, MoveRight } from 'lucide-react';
import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { usePayWithCash } from '@/hooks/payment/use-pay-with-cash';
import { usePayWithCredit } from '@/hooks/payment/use-pay-with-credit';

// Props
type PaymentMethodProps = {
  setStep: (step: number) => void;
  shippingPayload: ShippingPayload | null;
};

export default function PaymentMethod({ setStep, shippingPayload }: PaymentMethodProps) {
  // State
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'credit' | 'cash' | null>(
    'cash'
  );

  // Mutation
  const { isPendingCash, payUsingCash } = usePayWithCash();
  const { isPendingCredit, payUsingCredit } = usePayWithCredit();

  // Functions
  const handlePayment = () => {
    // If selected 'cash' execute handleCashPayment
    if (selectedPaymentMethod === 'cash') {
      handleCashPayment();
    }

    // If selected 'credit' execute handleCreditPayment
    if (selectedPaymentMethod === 'credit') {
      handleCreditPayment();
    }
  };

  // handleCashPayment execute payUsingCash mutation
  const handleCashPayment = () => {
    if (!shippingPayload) return;
    payUsingCash(shippingPayload);
  };

  // handleCashPayment execute payUsingCredit mutation
  const handleCreditPayment = () => {
    if (!shippingPayload) return;
    payUsingCredit(shippingPayload);
  };

  return (
    // Payment Method Section
    <section className="flex-1 flex flex-col gap-6">
      {/* Header */}
      <header className="flex gap-4">
        {/* Back Button */}
        <Button
          // back to step 1 (shipping address section)
          onClick={() => setStep(1)}
          className="text-zinc-800 flex items-center border-none bg-zinc-100 hover:bg-zinc-200 "
          variant={'secondary'}
        >
          {/* Arrow Left Icon */}
          <ArrowLeft width={20} height={20} />
          Back
        </Button>

        {/* Title */}
        <h1 className="text-zinc-800 font-semibold text-3xl">Payment Method</h1>
      </header>

      {/* Cash & Credit Container */}
      <div className="flex w-full p-[0.625rem] h-80 gap-4">
        {/* Cash Card */}
        <label className="w-1/2 ">
          {/* Hidden Input */}
          <input
            type="radio"
            className="hidden"
            name="paymentMethod"
            value="cash"
            onChange={() => setSelectedPaymentMethod('cash')}
            checked={selectedPaymentMethod === 'cash'}
          />

          {/* Content */}
          <div
            className={cn(
              'cursor-pointer p-4 h-[18.6875rem] flex flex-col gap-[0.625rem] justify-center items-center rounded-xl border border-zinc-200',
              selectedPaymentMethod === 'cash' ? 'bg-zinc-50' : null
            )}
          >
            {/* Image */}
            <Image
              src={'/assets/images/cash.png'}
              width={195}
              height={195}
              alt="cash on delivery"
            />

            {/* Title */}
            <h2
              className={cn(
                'font-semibold text-2xl',
                selectedPaymentMethod === 'cash' ? 'text-maroon-600' : 'text-zinc-800'
              )}
            >
              Cash on Delivery
            </h2>

            {/* Description */}
            <p className="text-zinc-500 text-sm font-medium">
              You'll pay in cash when your order is delivered.
            </p>
          </div>
        </label>

        {/* Credit Card */}
        <label className="w-1/2 group">
          {/* Hidden Input */}
          <input
            type="radio"
            className="hidden"
            name="paymentMethod"
            value="credit"
            onChange={() => setSelectedPaymentMethod('credit')}
            checked={selectedPaymentMethod === 'credit'}
          />

          {/* Content */}
          <div
            className={cn(
              'cursor-pointer p-4 h-[18.6875rem] flex flex-col gap-[0.625rem] justify-center items-center rounded-xl border border-zinc-200',
              selectedPaymentMethod === 'credit' ? 'bg-zinc-50' : null
            )}
          >
            {/* Image */}
            <Image src={'/assets/images/credit.png'} width={195} height={195} alt="Credit Card" />

            {/* Title */}
            <h2
              className={cn(
                'font-semibold text-2xl',
                selectedPaymentMethod === 'credit' ? 'text-maroon-600' : 'text-zinc-800'
              )}
            >
              Credit Card
            </h2>

            {/* Description */}
            <p className="text-zinc-500 text-sm font-medium text-center">
              You'll be securely redirected to Stripe to complete your payment.
            </p>
          </div>
        </label>
      </div>

      {/* Separator */}
      <hr className="bg-zinc-100 h-px" />

      {/* Checkout Button */}
      <div className="w-full flex justify-end">
        <Button
          variant={'default'}
          disabled={isPendingCash || isPendingCredit}
          onClick={() => handlePayment()}
        >
          Checkout <MoveRight />
          {(isPendingCash || isPendingCredit) && <Loader2 className=" animate-spin" />}
        </Button>
      </div>
    </section>
  );
}
