'use client';

import { applyCoupon } from '@/lib/actions/coupon/apply-coupon.action';
import { CouponValues } from '@/lib/schemes/coupon.schema';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '../use-toast';
import { useRouter } from '@/i18n/navigation';

export const useApplyCoupon = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { isPending, mutate: addCoupon } = useMutation({
    mutationFn: (couponPayload: CouponValues) => applyCoupon(couponPayload),
    onSuccess: () => {
      toast({
        variant: 'default',
        description: 'Coupon applied successfully!',
      });

      router.refresh();
    },

    onError: (error) => {
      const errorMessage = error?.message || 'Something went wrong while applying your coupon.';
      toast({
        variant: 'destructive',
        description: errorMessage,
      });
    },
  });

  return { isPending, addCoupon };
};
