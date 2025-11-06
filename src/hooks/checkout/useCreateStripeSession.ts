'use client';

import { createStripeSession } from '@/lib/apis/checkout/createStripeSession';
import { useMutation } from '@tanstack/react-query';

export const useCreateStripeSession = () => {
  return useMutation({
    mutationFn: createStripeSession,
    onSuccess: (data) => {
      if (data?.session?.url) {
        window.location.href = data.session.url;
      }
    },
    onError: (err: any) => {
      console.error(err);
      alert(err.message || 'Something went wrong while redirecting to Stripe.');
    },
  });
};
