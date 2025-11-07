import { getOrders } from '@/lib/apis/orders/get-orders';
import React from 'react';
import OrderCard from './orders';
import { useTranslations } from 'next-intl';

export default async function ProductOrders() {
  // Response
  const response = await getOrders();

  //  Handle Error
  if ('error' in response) {
    return <div>Error: {response.error}</div>;
  }
  // All Orders
  const orders = response.orders;
  // If No Orderer or length 0
  if (!orders || orders.length === 0) {
    return <div> No orders found</div>;
  }

  return (
    <div className="space-y-5">
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
}
