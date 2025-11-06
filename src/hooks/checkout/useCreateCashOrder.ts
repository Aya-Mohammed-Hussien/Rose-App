'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { createCashOrder } from '@/lib/actions/checkout/delivery.action';

interface ShippingAddress {
  street: string;
  phone: string;
  city: string;
  lat: string;
  long: string;
}

export const useCreateCashOrder = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (address: ShippingAddress) => createCashOrder({ shippingAddress: address }),

    onSuccess: (data) => {
      toast({
        description: '✅ Order created successfully!',
      });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },

    onError: (error: any) => {
      toast({
        variant: 'destructive',
        description: error.message || 'Failed to create order.',
      });
    },
  });
};
