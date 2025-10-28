'use client';

import { useMergeGuestCart } from '@/app/[locale]/cart/_hooks/use-merge-guest-cart';

export default function GuestCartMerger() {
  useMergeGuestCart();
  return null;
}
