import { AddressesResponse } from '@/lib/types/addresses';

export const getAddresses = async (): Promise<AddressesResponse> => {
  const response = await fetch(`/api/addresses`, { cache: 'no-store' });
  if (!response.ok) {throw new Error (`Failed to fetch addresses`)} ;
  return response.json();
};
