'use server';

import { JSON_HEADER } from '@/lib/constants/shared.constant';
import { AddressesResponse } from '@/lib/types/addresses';
import { getToken } from '@/lib/utils/get-token.util';

export const DeleteAddressAction = async (addressId: string) => {
  try {
    const token = await getToken();
    if (!token) throw new Error('No access token found');

    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/addresses/${addressId}`, {
      method: 'DELETE',
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete the address');
    }

    const payload: AddressesResponse = await response.json();
    return payload;
    
  } catch (error) {
    throw error;
  }
};
