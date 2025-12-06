import { AddReviewAction } from '@/lib/actions/reviews/add.review.action';
import { ReviewData } from '@/lib/types/add-review';
import { useMutation } from '@tanstack/react-query';

export function useAddReview() {
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ReviewData) => {
      const res = await AddReviewAction(data);
      if (!res) throw new Error('No response from server');
      return res;
    },
  });

  return { mutate, isPending };
}
