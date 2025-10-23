import { AddReviewAction } from '@/lib/apis/review-products/add.review';
import { ReviewData } from '@/lib/types/add-review';
import { useMutation } from '@tanstack/react-query';

export function useAddReview() {
  const { mutate, isError, error, isSuccess } = useMutation({
    mutationFn: async (data: ReviewData) => {
      const res = await AddReviewAction(data);
      if (!res) throw new Error('No response from server');
      return res;
    },
  });

  return { mutate, isError, error, isSuccess };
}
