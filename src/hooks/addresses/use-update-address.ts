import { updateAddressAction } from '@/lib/actions/addresses/update-address.action';
import { AddressValue } from '@/lib/schemes/address.schema';
import { useMutation } from '@tanstack/react-query';

export const useUpdateAddress = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: async ({ values, addressId }: { values: AddressValue; addressId: string}) => {
      return await updateAddressAction(values, addressId);
    },
  });
  return { isPending, error, updateAddress: mutate };
};
