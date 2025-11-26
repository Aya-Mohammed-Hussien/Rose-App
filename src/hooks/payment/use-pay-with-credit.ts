'use client';

import { ShippingPayload } from '@/lib/types/address';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '../use-toast';
import { useRouter } from '@/i18n/navigation';
import { payWithCredit } from '@/lib/actions/payment/pay-with-credit.action';

export const usePayWithCredit = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { isPending: isPendingCredit, mutate: payUsingCredit } = useMutation({
    mutationFn: (shippingAddressPayload: ShippingPayload) => payWithCredit(shippingAddressPayload),

    onSuccess: (data) => {
      router.push(data.session.url);
    },

    onError: (error: Error) => {
      const errorMessage = error?.message || 'Something went wrong while processing your payment.';
      toast({
        variant: 'destructive',
        description: errorMessage,
      });
    },
  });

  return { isPendingCredit, payUsingCredit };
};
