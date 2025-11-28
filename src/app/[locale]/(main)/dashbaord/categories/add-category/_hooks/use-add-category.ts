import { useMutation } from '@tanstack/react-query';
import { AddNewCategory } from '@/lib/schemes/add-categories.schema';
import { addCategory } from '@/lib/apis/categories/add-category.api';

export const useAddNewCategory = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data: AddNewCategory) => {
      // Form Data
      const formData = new FormData();
      formData.append('name', data.name);

      if (data.image) formData.append('image', data.image);

      const result = await addCategory(formData);

      if (result.error) {
        let errorMessage = result.error;

        // Exist Name
        if (errorMessage.includes('E11000') || errorMessage.includes('duplicate key')) {
          errorMessage = 'Category name already exists. Please use a different name.';
        }

        throw new Error(errorMessage);
      }

      return result;
    },
    onSuccess: () => {
      return 'Category added successfully';
    },
    onError: () => {
      return 'Failed To Add Category';
    },
  });

  return { mutate, isPending, error };
};
