import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { updateCategory } from '@/lib/actions/categories/update-category.api';
import { useRouter } from '@/i18n/navigation';
import { UpdateCategoryResult } from '@/lib/types/update-category';

export function useUpdateCategory() {
  // Navigation
  const router = useRouter();

  // Mutation
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
    },

    onError: (err: Error) => {
      toast({
        description: `Failed to update category: ${err.message || 'Unknown error'}`,
        variant: 'destructive',
      });
    },
  });
}
