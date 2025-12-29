import { useMutation } from '@tanstack/react-query';
import { subscribeAction } from '../_actions/subscribe.action';
import { SubscribeValue } from '@/lib/schemes/subscribe.schema';
import { SubscriptionResponse } from '@/lib/types/subscription';

export default function useSubscribe() {
  const { isPending, mutate } = useMutation<
    ApiResponse<SubscriptionResponse>,
    Error,
    SubscribeValue
  >({
    mutationFn: async (values: SubscribeValue): Promise<ApiResponse<SubscriptionResponse>> => {
      const response = await subscribeAction(values);
      return response;
    },
  });
  return { isPending, subscribe: mutate };
}
