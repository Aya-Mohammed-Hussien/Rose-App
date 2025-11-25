import React from 'react';
import { RevenueChart } from './charts/revenue-chart';
import { getOrderStatistics } from '@/lib/apis/order-statistics/order-statistics.api';

export default async function Revenue() {
  // OrderStatistics Data
  const orderStatistics = await getOrderStatistics();
  return (
    // Revenue Section
    <section className="flex-1 h-full rounded-lg bg-white py-4 px-6">
      {/* Revenue Chart Component */}
      <RevenueChart orderStatistics={orderStatistics} />
    </section>
  );
}
