'use server';

import { JSON_HEADER } from '@/lib/constants/shared.constant';
import { ProductValues } from '@/lib/schemes/product.schema';
import { getToken } from '@/lib/utils/get-token.util';

export type UpdateProductValues = Omit<ProductValues, 'imgCover' | 'images'>;

/** Payload accepted by the API (backend may reject discount & occasion on update) */
type UpdateProductPayload = Omit<UpdateProductValues, 'discount' | 'occasion' | 'priceAfterDiscount'> & {
  priceAfterDiscount?: number;
};

export const updateProductAction = async (productId: string, data: UpdateProductValues) => {
  try {
    const token = await getToken();

    // Only send fields the API allows (backend rejects "discount" and "occasion" on update)
    const requestBody: UpdateProductPayload = {
      title: data.title,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      category: data.category,
      ...(data.priceAfterDiscount != null && { priceAfterDiscount: data.priceAfterDiscount }),
    };

    const response = await fetch(`${process.env.API_URL}/products/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(requestBody),
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
    });

    // Parse the server response
    const result = await response.json();

    if (!response.ok) {
      throw new Error((result as { error?: string }).error || 'Something went wrong');
    }

    // Return the server response
    return result;
  } catch (error) {
    // Catch any unexpected errors and return a descriptive message
    throw new Error(
      error instanceof Error ? error.message : 'Unexpected error while adding product'
    );
  }
};
