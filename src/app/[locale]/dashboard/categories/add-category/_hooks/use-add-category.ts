import { useMutation } from '@tanstack/react-query';
import { AddNewCategory } from '@/lib/schemes/add-categories.schema';
import { addCategory } from '@/lib/actions/categories/add-category.api';
import { useRouter } from '@/i18n/navigation';

export const useAddNewCategory = () => {
  const router = useRouter();

  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: async (data: AddNewCategory) => {
      // Prepare form data for API request
      const formData = new FormData();
      formData.append('name', data.name);

      // Optionally append image if provided
      if (data.image) formData.append('image', data.image);

      // Call API
      const result = await addCategory(formData);

      // Handle API errors
      if (result.error) {
        const errorMessage = result.error;

        // Check for duplicate name error (MongoDB E11000)
        if (errorMessage.includes('E11000') || errorMessage.includes('duplicate key')) {
          throw new Error('DUPLICATE_NAME'); // Throw specific error code
        }

        throw new Error(errorMessage);
      }

      return result;
    },
    onSuccess: () => {
      router.push('/dashbaord/categories');
    },
  });

  return {
    mutate,
    isPending,
    error,
    isSuccess,
  };
};
