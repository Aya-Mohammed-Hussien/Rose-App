import { getAddresses } from '@/lib/apis/addresses/addresses.api';
import { AddressesResponse } from '@/lib/types/addresses';
import { useQuery } from '@tanstack/react-query';

export const useGetAddresses = () => {
  const { data, isError, error, isLoading , refetch } = useQuery<AddressesResponse>({
    queryKey: ['addresses'],
    queryFn: getAddresses,
    staleTime: 60000 ,
  });

  return { addresses: data?.addresses, isError, error, isLoading , refetch };
};
