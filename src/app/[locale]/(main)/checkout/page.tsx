import React from 'react';
import CheckoutFlow from './_components/checkout-flow';
import { getAddresses } from '@/lib/apis/checkout/addresses.api';
import Summary from './_components/summary';
import { getCart } from '@/lib/apis/cart/cart.api';

export default async function Page() {
  const addresses = await getAddresses();
  const cart = await getCart();
  return (
    <main className="flex gap-10  mx-8 my-5">
      <CheckoutFlow addresses={addresses} />
      <Summary cartData={cart} />
    </main>
  );
}
