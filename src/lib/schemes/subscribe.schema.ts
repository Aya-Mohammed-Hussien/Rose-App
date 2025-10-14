import * as z from 'zod';

// Subscribe schema
export const subscribeSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid Email Address'),
});
export type SubscribeValue = z.infer<typeof subscribeSchema>;
