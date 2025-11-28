import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { updateCategory, UpdateCategoryResult } from '@/lib/apis/categories/update-category.api';

export function useUpdateCategory() {
  // Navigation
  const router = useRouter();

  // Mutaion
  return useMutation({
    mutationFn: ({ categoryId, data }: { categoryId: string; data: FormData }) =>
      updateCategory(categoryId, data),

    onSuccess: (res: UpdateCategoryResult) => {
      if ('error' in res) {
        toast({
          description: res.error,
          variant: 'destructive',
        });
        return;
      }
      toast({
        description: res.message || 'Category updated successfully!',
      });

      router.push('/dashbaord/categories');
      router.refresh();
    },

    onError: (err: Error) => {
      toast({
        description: `Failed to update category: ${err.message || 'Unknown error'}`,
        variant: 'destructive',
      });
    },
  });
}
