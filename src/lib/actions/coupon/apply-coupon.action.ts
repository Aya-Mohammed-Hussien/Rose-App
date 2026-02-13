'use server';

import { JSON_HEADER } from '@/lib/constants/shared.constant';
import { CouponValues } from '@/lib/schemes/coupon.schema';
import { getToken } from '@/lib/utils/get-token.util';
import { revalidateTag } from 'next/cache';

export const applyCoupon = async (couponPayload: CouponValues) => {
  try {
    // Retrieve the access token from cookies
    const token = await getToken();

    // Get the base API URL from environment variables
    const baseURL = process.env.NEXT_PUBLIC_API;

    // Stop if no token is available
    if (!token) {
      throw new Error('No access token found');
    }

    // Send a POST request to the "coupons" API endpoint
    const response = await fetch(`${baseURL}/coupons/apply`, {
      method: 'POST',
      body: JSON.stringify(couponPayload),
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
    });

    // Parse the server response
    const payload = await response.json();

    // If the response status is not OK, throw an error with the server message
    if (!response.ok) {
      throw new Error(payload.error || 'failed to apply coupon');
    }

    // Revalidate any cached cart data so Summary reflects the new totals
    revalidateTag('cart');

    // Return the server response
    return payload;
  } catch (error) {
    // Catch any unexpected errors and return a descriptive message
    throw error || 'Unexpected error while applying coupon';
  }
};
