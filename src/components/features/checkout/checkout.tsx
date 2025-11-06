'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import StepIndicator from '@/components/ui/step-indicator';
import Image from 'next/image';
import { Address } from '@/lib/types/addresses';
import { useToast } from '@/hooks/use-toast';
import { useCreateCashOrder } from '@/hooks/checkout/useCreateCashOrder';
import { useCreateStripeSession } from '@/hooks/checkout/useCreateStripeSession';

type PaymentMethodPageProps = {
  onBack?: () => void;
  selectedAddress?: Address | null;
};

export default function PaymentMethodPage({ onBack, selectedAddress }: PaymentMethodPageProps) {
  const [selected, setSelected] = useState<'cash' | 'card' | null>(null);
  const { toast } = useToast();

  const { mutate: createCashOrder, isPending: isCashPending } = useCreateCashOrder();
  const { mutate: createStripeSession, isPending: isStripePending } = useCreateStripeSession();

  const handleCheckout = () => {
    //confirm selecte payment
    if (!selected) {
      toast({
        title: 'Please select a payment method',
        description: 'You need to choose how you want to pay before continuing.',
      });
      return;
    }

    // confirm select addresses
    if (!selectedAddress) {
      toast({
        title: 'No address selected',
        description: 'Please select or add a shipping address first.',
      });
      return;
    }

    // use plain object to avoid sending extra data
    const shippingAddress = {
      street: selectedAddress.street,
      phone: selectedAddress.phone,
      city: selectedAddress.city,
      lat: selectedAddress.lat || '',
      long: selectedAddress.long || '',
    };

    //  when by cash
    if (selected === 'cash') {
      createCashOrder(shippingAddress);
    }

    // when by credit (stripe)
    if (selected === 'card') {
      createStripeSession({ shippingAddress });
    }
  };

  const isPending = isCashPending || isStripePending;

  return (
    <div className="max-w-[782px] w-full mx-auto m-10 space-y-6 px-4">
      <StepIndicator currentStep={2} />

      {/* addresses and button back*/}
      <div className="flex items-center gap-4 h-[41px] w-full">
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center justify-center gap-1 w-[77px] h-[41px] rounded-[10px] bg-[#F4F4F5] px-[10px] text-zinc-700 hover:text-[#A6252A] hover:bg-[#e8e8ea]"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back</span>
        </Button>

        <h2 className="font-primary font-semibold text-[30px] text-gray-800 leading-none">
          Payment Method
        </h2>
      </div>

      {/* option payment card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/*  Cash on Delivery */}
        <Card
          onClick={() => setSelected('cash')}
          className={`cursor-pointer w-[373px] h-[299px] rounded-[12px] p-4 border transition ${
            selected === 'cash'
              ? 'border-[#A6252A] bg-[#FFF5F5]'
              : 'border-[#E4E4E7] hover:border-zinc-300'
          }`}
        >
          <CardContent className="flex flex-col items-center justify-center gap-[10px] h-full">
            <Image
              src="/assets/images/aa43c8e130e4ab17a61b0267cac7a94f1c9d2f66.png"
              alt="Cash on Delivery"
              width={195}
              height={195}
            />
            <div className="text-center px-2">
              <h3
                className={`font-primary font-semibold text-[24px] ${
                  selected === 'cash' ? 'text-[#A6252A]' : 'text-[#27272A]'
                }`}
              >
                Cash on Delivery
              </h3>
              <p className="text-[14px] text-[#71717A] mt-1">
                You’ll pay in cash when your order is delivered.
              </p>
            </div>
          </CardContent>
        </Card>

        {/*  Credit Card */}
        <Card
          onClick={() => setSelected('card')}
          className={`cursor-pointer w-[373px] h-[299px] rounded-[12px] p-4 border transition ${
            selected === 'card'
              ? 'border-[#A6252A] bg-[#FFF5F5]'
              : 'border-[#E4E4E7] hover:border-zinc-300'
          }`}
        >
          <CardContent className="flex flex-col items-center justify-center gap-[10px] h-full">
            <Image
              src="/assets/images/0748295196c534fc421c5720d15a6d16e24def02.png"
              alt="Credit Card"
              width={195}
              height={195}
            />
            <div className="text-center px-2">
              <h3
                className={`font-primary font-semibold text-[24px] ${
                  selected === 'card' ? 'text-[#A6252A]' : 'text-[#27272A]'
                }`}
              >
                Credit Card
              </h3>
              <p className="text-[14px] text-[#71717A] mt-1">
                You’ll be securely redirected to Stripe to complete your payment.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/*  button  Checkout */}
      <div className="flex justify-end pt-4">
        <Button
          onClick={handleCheckout}
          disabled={!selected || isPending}
          className={`flex items-center gap-2 px-6 py-2 rounded-md text-white transition ${
            selected ? 'bg-[#A6252A] hover:bg-[#8b1f24]' : 'bg-zinc-300 cursor-not-allowed'
          }`}
        >
          {isPending ? 'Processing...' : 'Checkout'}
          <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
}
