'use client';

import { Button } from '@/components/ui/button';
import { ShippingPayload } from '@/lib/types/address';
import { ArrowLeft, Loader2, MoveRight } from 'lucide-react';
import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { usePayWithCash } from '@/hooks/payment/use-pay-with-cash';
import { usePayWithCredit } from '@/hooks/payment/use-pay-with-credit';

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

  const handlePayment = () => {
    if (selectedPaymentMethod === 'cash') {
      handleCashPayment();
    }
    if (selectedPaymentMethod === 'credit') {
      handleCreditPayment();
    }
  };

  const handleCashPayment = () => {
    if (!shippingPayload) return;
    payUsingCash(shippingPayload);
  };

  const handleCreditPayment = () => {
    if (!shippingPayload) return;
    payUsingCredit(shippingPayload);
  };

  return (
    <section className="flex-1 flex flex-col gap-6">
      <header className="flex gap-4">
        <Button
          onClick={() => setStep(1)}
          className="text-zinc-800 flex items-center border-none bg-zinc-100 hover:bg-zinc-200 "
          variant={'secondary'}
        >
          <ArrowLeft width={20} height={20} />
          Back
        </Button>

        <h1 className="text-zinc-800 font-semibold text-3xl">Payment Method</h1>
      </header>

      <div className="flex w-full p-[0.625rem] h-80 gap-4">
        {/* Cash */}
        <label className="w-1/2 ">
          <input
            type="radio"
            className="hidden"
            name="paymentMethod"
            value="cash"
            onChange={() => setSelectedPaymentMethod('cash')}
            checked={selectedPaymentMethod === 'cash'}
          />
          <div
            className={cn(
              'cursor-pointer p-4 h-[18.6875rem] flex flex-col gap-[0.625rem] justify-center items-center rounded-xl border border-zinc-200',
              selectedPaymentMethod === 'cash' ? 'bg-zinc-50' : null
            )}
          >
            <Image
              src={'/assets/images/cash.png'}
              width={195}
              height={195}
              alt="cash on delivery"
            />

            <h2
              className={cn(
                'font-semibold text-2xl',
                selectedPaymentMethod === 'cash' ? 'text-maroon-600' : 'text-zinc-800'
              )}
            >
              Cash on Delivery
            </h2>
            <p className="text-zinc-500 text-sm font-medium">
              You'll pay in cash when your order is delivered.
            </p>
          </div>
        </label>

        {/* Credit */}
        <label className="w-1/2 group">
          <input
            type="radio"
            className="hidden"
            name="paymentMethod"
            value="credit"
            onChange={() => setSelectedPaymentMethod('credit')}
            checked={selectedPaymentMethod === 'credit'}
          />

          <div
            className={cn(
              'cursor-pointer p-4 h-[18.6875rem] flex flex-col gap-[0.625rem] justify-center items-center rounded-xl border border-zinc-200',
              selectedPaymentMethod === 'credit' ? 'bg-zinc-50' : null
            )}
          >
            <Image src={'/assets/images/credit.png'} width={195} height={195} alt="Credit Card" />

            <h2
              className={cn(
                'font-semibold text-2xl',
                selectedPaymentMethod === 'credit' ? 'text-maroon-600' : 'text-zinc-800'
              )}
            >
              Credit Card
            </h2>
            <p className="text-zinc-500 text-sm font-medium text-center">
              You'll be securely redirected to Stripe to complete your payment.
            </p>
          </div>
        </label>
      </div>

      <hr className="bg-zinc-100 h-px" />
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
