'use server';

import { JSON_HEADER } from '@/lib/constants/shared.constant';
import { AddressValue } from '@/lib/schemes/address.schema';
import { AddressesResponse } from '@/lib/types/addresses';
import { getToken } from '@/lib/utils/get-token.util';

export const addAddressAction = async (data: AddressValue) => {
  try {
    const token = await getToken();
    if (!token) throw new Error('No access token found');

    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/addresses`, {
      method: 'PATCH',
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to add new address');
    }
    const payload: ApiResponse<AddressesResponse> = await response.json();
    return payload;
    
  } catch (error) {
    throw error;
  }
};
