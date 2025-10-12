import { useMutation } from '@tanstack/react-query';
import { subscribeAction } from '../_actions/subscribe.action';
import { SubscribeValue } from '@/lib/schemes/subscribe.schema';

export default function useSubscribe() {
  const { isPending, mutate } = useMutation({
    mutationFn: async (values: SubscribeValue) => {
      const response = await subscribeAction(values);
      console.log(response);
    },
  });
  return { isPending, subscribe: mutate };
}
