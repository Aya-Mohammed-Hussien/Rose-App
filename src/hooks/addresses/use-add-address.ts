import { addAddressAction } from '@/lib/actions/addresses/add-address.action';
import { AddressValue } from '@/lib/schemes/address.schema';
import { useMutation } from '@tanstack/react-query';

export const useAddAddress = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: AddressValue) => {
      return await addAddressAction(values);
    },
  });
  return { isPending, addAddress: mutate };
};
