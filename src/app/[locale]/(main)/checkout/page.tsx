import React from 'react';
import CheckoutFlow from './_components/checkout-flow';
import { getAddresses } from '@/lib/apis/checkout/addresses.api';
import Summary from './_components/summary';
import { getCart } from '@/lib/apis/cart/cart-summary.api';
import { redirect } from 'next/navigation';

export default async function Page() {
  try {
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
  } catch (error) {
    // Log error for debugging
    console.error('Error loading checkout data:', error);

    // If it's an authentication error, redirect to login
    if (error instanceof Error && (error.message.includes('token') || error.message.includes('access'))) {
      redirect('/login');
    }

    // Otherwise, throw to trigger error boundary
    throw error;
  }
}
