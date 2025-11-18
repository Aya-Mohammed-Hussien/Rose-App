import React from 'react';
import { OrdersStatusChart } from './charts/order-status-chart';
import { GetOrderStatistics } from '@/lib/apis/order-statistics/order-statistics.api';

export default async function OrderStatus() {
  const orderStatistics = await GetOrderStatistics();
  const ordersByStatus = orderStatistics.statistics.ordersByStatus;
  return (
    <section className="w-[17.25rem] h-full bg-white rounded-lg flex flex-col justify-between items-center p-4">
      <OrdersStatusChart ordersByStatus={ordersByStatus} />
    </section>
  );
}
