'use client';

import { useState } from 'react';
import ShippingAddress from '@/components/features/addresses/_components/addresses';
import PaymentMethodPage from '@/components/features/checkout/checkout';

type StepHandler = () => void;

export default function ShoppingFlow() {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const goToNext: StepHandler = () => setStep(2);
  const goToPrev: StepHandler = () => setStep(1);

  return (
    <>
      {step === 1 && (
        <ShippingAddress onNext={goToNext} onSelectAddress={(addr) => setSelectedAddress(addr)} />
      )}
      {step === 2 && <PaymentMethodPage onBack={goToPrev} selectedAddress={selectedAddress} />}
    </>
  );
}
