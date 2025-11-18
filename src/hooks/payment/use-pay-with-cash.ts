'use client';

import { payWithCash } from '@/lib/actions/payment/pay-with-cash.action';
import { ShippingPayload } from '@/lib/types/address';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '../use-toast';
import { useRouter } from '@/i18n/navigation';

export const usePayWithCash = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { isPending: isPendingCash, mutate: payUsingCash } = useMutation({
    mutationFn: (shippingAddressPayload: ShippingPayload) => payWithCash(shippingAddressPayload),

    onSuccess: () => {
      toast({
        variant: 'default',
        description: "Order placed successfully! You'll pay in cash upon delivery. ",
      });

      router.push('/order');
    },

    onError: (error: Error) => {
      const errorMessage = error?.message || 'Something went wrong while processing your payment.';
      toast({
        variant: 'destructive',
        description: errorMessage,
      });
    },
  });

  return { isPendingCash, payUsingCash };
};
