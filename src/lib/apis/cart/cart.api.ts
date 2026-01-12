export async function getCart() {
  try {
    // Call API route
    const res = await fetch('/api/cart', { cache: 'no-store' });

    // If unauthorized (401), return empty array (user not logged in)
    if (res.status === 401) {
      return [];
    }

    // Handle other errors
    if (!res.ok) {
      throw new Error('Failed to fetch cart');
    }

    // Return cart data
    return res.json();
  } catch (error) {
    // Log error for debugging
    console.error('Error fetching cart:', error);
    // Return empty array on error instead of throwing
    // This allows the UI to show empty cart state
    return [];
  }
}

// import { getCartResponse } from '@/lib/types/cart.api';
// import { getToken } from '@/lib/utils/get-token.util';

// export const getCart = async (): Promise<getCartResponse> => {
//   try {
//     // Retrieve the access token from cookies
//     const token = await getToken();

//     // Get the base API URL from environment variables
//     const baseURL = process.env.NEXT_PUBLIC_API;

//     // Stop if no token is available
//     if (!token) {
//       throw new Error('No access token found');
//     }

//     // Send a GET request to the "cart" API endpoint
//     const response = await fetch(`${baseURL}/cart`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     // Parse the server response
//     const payload: getCartResponse = await response.json();

//     // If the response status is not OK, throw an error with the server message
//     if (!response.ok || 'error' in payload) {
//       throw new Error('failed to fetch cart');
//     }

//     // Return the server response
//     return payload;
//   } catch (error) {
//     // Catch any unexpected errors and return a descriptive message
//     throw error || 'Unexpected error while getting cart';
//   }
// };
