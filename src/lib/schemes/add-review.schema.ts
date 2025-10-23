import { z } from 'zod';

export const reviewSchema = z.object({
  rating: z
    .number('Rating Is Required')
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating cannot exceed 5'),
  title: z.string('Tittle is Required').min(1, 'Title is required'),
  comment: z.string('Comment is Required').min(1, 'Review is required'),
});

export type ReviewValues = z.infer<typeof reviewSchema>;
