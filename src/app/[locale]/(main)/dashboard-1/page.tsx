import React from 'react';
import OrderStatus from './_components/order-status';
import Revenue from './_components/revenue';

export default function Page() {
  return (
    <main className="flex flex-row bg-zinc-100 justify-end items-center min-h-screen px-4">
      {/* Orders Statistics Section */}
      <section className="w-[68.5rem] h-[23.8125rem] flex gap-6">
        {/* OrderStatus Section */}
        <OrderStatus />

        {/* Revenue Section */}
        <Revenue />
      </section>
    </main>
  );
}
