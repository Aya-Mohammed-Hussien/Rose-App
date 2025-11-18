'use client';

import * as React from 'react';
import { Trash2 } from 'lucide-react';
import { useClearCart } from '../_hooks/use-clear-cart';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import ConfirmationModal from '@/components/shared/confirmation-modal';

type Props = {
  className?: string;
  disabled?: boolean;
};

export default function ClearCartButton({ className, disabled }: Props) {
  // Translation
  const t = useTranslations('ClearCartButton');

  // Hooks
  const { mutate: clearCart, isPending } = useClearCart();

  // Confirm action
  const deleteCart = () => {
    clearCart(undefined);
  };

  return (
    <ConfirmationModal
      deleteAction={deleteCart}
      isPendingDelete={isPending}
      confirmButtonTitle={t('confirm')}
      cancelButtonTitle={t('cancel')}
      questionTitle={t('confirmMessage')}
      warningTitle={t('warningMessage')}
      triggerButton={
        <Button
          type="button"
          className={`bg-maroon-50 text-maroon-600 font-semibold border border-maroon-100
            hover:bg-maroon-100 flex items-center justify-center gap-2 rounded-[10px]
            px-4 py-2.5 ${className}`}
          disabled={disabled || isPending}
        >
          <Trash2 size={18} strokeWidth={2} />
          {isPending ? t('clearing') : t('clearCart')}
        </Button>
      }
    />
  );
}
