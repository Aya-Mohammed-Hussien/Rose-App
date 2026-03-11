import { useMutation } from '@tanstack/react-query';
import { AddNewOccasion } from '@/lib/schemes/add-occasion.schema';
import { addOccasion } from '@/lib/actions/occasions/add-occasion.api';
import { useRouter } from 'next/navigation';

export const useAddNewOccasion = () => {
  const router = useRouter();

  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: async (data: AddNewOccasion) => {
      // Prepare form data for API request
      const formData = new FormData();
      formData.append('name', data.name);

      // Optionally append image if provided
      if (data.image) formData.append('image', data.image);

      // Call API
      const result = await addOccasion(formData);

      // Handle API errors
      if (result.error) {
        const errorMessage = result.error;

        // Check for duplicate name error (MongoDB E11000)
        if (errorMessage.includes('E11000') || errorMessage.includes('duplicate') || errorMessage.includes('already exists')) {
          throw new Error('DUPLICATE_NAME'); // Throw specific error code
        }

        throw new Error(errorMessage);
      }

      return result;
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  return {
    mutate,
    isPending,
    error,
    isSuccess,
  };
};
