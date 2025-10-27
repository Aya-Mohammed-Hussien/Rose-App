'use server';

import { JSON_HEADER } from '@/lib/constants/shared.constant';
import { getToken } from '@/lib/utils/get-token.util';

// Props
export type AddToCartData = {
  product: string;
  quantity: number;
};
export async function addToCartAction(data: AddToCartData) {
  const token = await getToken();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/cart`, {
    method: 'POST',
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const payload = await response.json();
  return payload;
}
