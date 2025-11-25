'use client';

import React, { useState } from 'react';
import ShippingAddress from './shipping-address';
import PaymentMethod from './payment-method';
import { getAddressesResponse, ShippingPayload } from '@/lib/types/address';

// Props
type CheckoutFlowProps = {
  addresses: getAddressesResponse;
};

export default function CheckoutFlow({ addresses }: CheckoutFlowProps) {
  // State
  const [step, setStep] = useState<number>(1);
  const [shippingPayload, setShippingPayload] = useState<ShippingPayload | null>(null);

  // Step 1
  if (step === 1)
    return (
      // Render ShippingAddress Component
      <ShippingAddress
        addresses={addresses}
        setStep={setStep}
        setShippingPayload={setShippingPayload}
      />
    );

  // Step 2
  if (step === 2)
    return (
      // Render ShippingAddress Component
      <PaymentMethod setStep={setStep} shippingPayload={shippingPayload} />
    );
}
