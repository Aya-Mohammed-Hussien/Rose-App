'use server';

import { JSON_HEADER } from '@/lib/constants/shared.constant';
import { ProductValues } from '@/lib/schemes/product.schema';
import { getToken } from '@/lib/utils/get-token.util';

export type UpdateProductValues = Omit<ProductValues, 'imgCover' | 'images'>;

export const updateProductAction = async (productId: string, data: UpdateProductValues) => {
  try {
    // Retrieve the access token from cookies
    const token = await getToken();

    // Send a Put request to the "update product" API endpoint
    const response = await fetch(`${process.env.API_URL}/products/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('RESPONSE STATUS:', response.status);
    // Parse the server response
    const payload = await response.json();
    console.log('SERVER RESPONSE:', payload);
    if (!response.ok) {
      throw new Error(payload.error || 'Something went wrong');
    }

    // Return the server response
    return payload;
  } catch (error) {
    // Catch any unexpected errors and return a descriptive message
    throw new Error(
      error instanceof Error ? error.message : 'Unexpected error while adding product'
    );
  }
};
