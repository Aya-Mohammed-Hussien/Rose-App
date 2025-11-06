import { deleteAddressAction } from '@/lib/actions/addresses/delete-address.action';
import { useMutation } from '@tanstack/react-query';

export const useDeleteAddress = () => {
  const { mutate, isPending, error  } = useMutation({
    mutationFn: async (id: string) => {
      return await deleteAddressAction(id);
    },
  });
  return { isPending, error, deleteAddress: mutate };
};
