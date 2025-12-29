// 'use server';

// import { JSON_HEADER } from '@/lib/constants/shared.constant';
// import { ShippingPayload } from '@/lib/types/address';
// // import { CheckoutSession } from '@/lib/types/checkout-session';
// import { getToken } from '@/lib/utils/get-token.util';

// export const payWithCredit = async (
//   shippingAddressPayload: ShippingPayload
// ): Promise<CheckoutSession> => {
//   try {
//     // Retrieve the access token from cookies
//     const token = await getToken();

//     // Get the base API URL from environment variables
//     const baseURL = process.env.NEXT_PUBLIC_API;

//     // Stop if no token is available
//     if (!token) {
//       throw new Error('No access token found');
//     }

//     // Send a POST request to the "checkout session" API endpoint
//     const response = await fetch(`${baseURL}/orders/checkout?url=http://localhost:3000`, {
//       method: 'POST',
//       body: JSON.stringify(shippingAddressPayload),
//       headers: {
//         ...JSON_HEADER,
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     // Parse the server response
//     const payload: CheckoutSession = await response.json();

//     // If the response status is not OK, throw an error with the server message
//     if (!response.ok) {
//       const errorPayload: any = payload;
//       throw new Error(errorPayload.error || errorPayload.message || 'failed to pay with credit');
//     }

//     // Return the server response
//     return payload;
//   } catch (error) {
//     // Catch any unexpected errors and return a descriptive message
//     throw error;
//   }
// };

'use server';

import { JSON_HEADER } from '@/lib/constants/shared.constant';
import { ShippingPayload } from '@/lib/types/address';
// import { CheckoutSession } from '@/lib/types/checkout-session';
import { getToken } from '@/lib/utils/get-token.util';

export const payWithCredit = async (shippingAddressPayload: ShippingPayload) => {
  try {
    // Retrieve the access token from cookies
    const token = await getToken();

    // Get the base API URL from environment variables
    const baseURL = process.env.NEXT_PUBLIC_API;

    // Stop if no token is available
    if (!token) {
      throw new Error('No access token found');
    }

    // Send a POST request to the "checkout session" API endpoint
    const response = await fetch(`${baseURL}/orders/checkout?url=http://localhost:3000`, {
      method: 'POST',
      body: JSON.stringify(shippingAddressPayload),
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
    });

    // Parse the server response
    const payload = await response.json();

    // If the response status is not OK, throw an error with the server message
    if (!response.ok) {
      const errorPayload: ErrorResponse = payload;
      throw new Error(errorPayload.error || 'failed to pay with credit');
    }

    // Return the server response
    return payload;
  } catch (error) {
    // Catch any unexpected errors and return a descriptive message
    throw error;
  }
};
