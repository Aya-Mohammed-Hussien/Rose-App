'use server';

import { JSON_HEADER } from '@/lib/constants/shared.constant';
import { getToken } from '@/lib/utils/get-token.util';

interface ShippingAddress {
  street: string;
  phone: string;
  city: string;
  lat: string;
  long: string;
}

interface CreateOrderPayload {
  shippingAddress: ShippingAddress;
}

interface OrderResponse {
  message: string;
  status: string;
  orderId?: string;
}

export const createCashOrder = async (payload: CreateOrderPayload): Promise<OrderResponse> => {
  try {
    const token = await getToken();
    if (!token) throw new Error('You must be logged in first.');

    const response = await fetch('https://flower.elevateegy.com/api/v1/orders', {
      method: 'POST',
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create order.');
    }

    return data as OrderResponse;
  } catch (error: any) {
    throw new Error(error.message || 'Something went wrong while creating order.');
  }
};
