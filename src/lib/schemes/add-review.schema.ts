import { useTranslations } from 'next-intl';
import { z } from 'zod';

export const useReviewSchema = () => {
  const t = useTranslations('validation.review');

  const reviewSchema = z.object({
    rating: z.number().min(1, t('rating.min')).max(5, t('rating.max')),
    title: z.string().nonempty(t('title.required')),
    comment: z.string().nonempty(t('comment.required')),
  });

  return { reviewSchema };
};

export type ReviewValues = z.infer<ReturnType<typeof useReviewSchema>['reviewSchema']>;
