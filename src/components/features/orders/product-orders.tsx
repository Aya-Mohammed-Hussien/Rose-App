import { getOrders } from '@/lib/apis/orders/get-orders';
import React from 'react';
import OrderCard from './orders';
import { redirect } from 'next/navigation';

export default async function ProductOrders() {
  try {
    // Response
    const response = await getOrders();

    // Handle Error Response (if API returns error object)
    if ('error' in response) {
      // If it's an authentication error, redirect to login
      if (response.error.includes('token') || response.error.includes('access')) {
        redirect('/login');
      }
      return <div className="text-red-500 p-4">Error: {response.error}</div>;
    }

    // All Orders
    const orders = response.orders;

    // If No Orders or length 0
    if (!orders || orders.length === 0) {
      return (
        <div className="text-center p-8 text-gray-500">
          No orders found
        </div>
      );
    }

    return (
      <div className="space-y-5">
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    );
  } catch (error) {
    // Handle thrown errors
    const errorMessage = error instanceof Error ? error.message : 'Failed to load orders';

    // If it's an authentication error, redirect to login
    if (errorMessage.includes('token') || errorMessage.includes('access') || errorMessage.includes('log in')) {
      redirect('/login');
    }

    // Otherwise, show error message
    return (
      <div className="text-red-500 p-4">
        Error: {errorMessage}
      </div>
    );
  }
}
