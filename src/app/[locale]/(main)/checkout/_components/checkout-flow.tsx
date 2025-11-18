'use client';

import React, { useState } from 'react';
import ShippingAddress from './shipping-address';
import PaymentMethod from './payment-method';
import { getAddressesResponse, ShippingPayload } from '@/lib/types/address';

type CheckoutFlowProps = {
  addresses: getAddressesResponse;
};

export default function CheckoutFlow({ addresses }: CheckoutFlowProps) {
  const [step, setStep] = useState<number>(1);
  const [shippingPayload, setShippingPayload] = useState<ShippingPayload | null>(null);
  if (step === 1)
    return (
      <ShippingAddress
        addresses={addresses}
        setStep={setStep}
        setShippingPayload={setShippingPayload}
      />
    );
  if (step === 2) return <PaymentMethod setStep={setStep} shippingPayload={shippingPayload} />;
}
