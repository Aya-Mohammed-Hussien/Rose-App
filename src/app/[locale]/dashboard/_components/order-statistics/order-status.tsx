import React from 'react';
import { OrdersStatusChart } from './order-status-chart';
import { getOrderStatistics } from '@/lib/apis/order-statistics/order-statistics.api';

export default async function OrderStatus() {
  // orderStatstics Data
  const orderStatistics = await getOrderStatistics();
  // ordersByStatus Data
  const ordersByStatus = orderStatistics.statistics.ordersByStatus;

  return (
    // OrdersByStatus Section
    <section className="w-[17.25rem] h-full bg-white rounded-lg flex flex-col justify-between items-center p-4">
      {/* Orders Status Chart */}
      <OrdersStatusChart ordersByStatus={ordersByStatus} />
    </section>
  );
}
