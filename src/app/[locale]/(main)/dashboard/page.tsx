import React from 'react';
import OrderStatus from './_components/order-status';
import Revenue from './_components/revenue';

export default function Page() {
  return (
    <main className="flex flex-row bg-zinc-100 justify-end items-center min-h-screen px-4">
      <section className="w-[68.5rem] h-[23.8125rem] flex gap-6">
        <OrderStatus />
        <Revenue />
      </section>
    </main>
  );
}
