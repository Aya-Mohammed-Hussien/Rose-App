'use client';

import SummaryCard from '@/components/features/summary/summary';

export default function ShoppingLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex justify-center gap-10 px-6 py-10">
      {/*  Left Section — Dynamic (Address, Payment ) */}
      <div className="flex-1 max-w-[782px]">{children}</div>

      {/*  Right Section — Summary  */}
      <div className="w-[458px] shrink-0">
        <SummaryCard />
      </div>
    </main>
  );
}
