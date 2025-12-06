import React from 'react';
import CheckoutFlow from './_components/checkout-flow';
import { getAddresses } from '@/lib/apis/checkout/addresses.api';
import Summary from './_components/summary';
import { getCart } from '@/lib/apis/cart/cart-summary.api';


export default async function Page() {
  // Addresses API
  const addresses = await getAddresses();
  // Cart API
  const cart = await getCart();

  return (
    <main className="flex gap-10  mx-8 my-5">
      {/* Checkout Flow - Controller */}
      <CheckoutFlow addresses={addresses} />

      {/* Summary Section */}
      <Summary cartData={cart} />
    </main>
  );
}
