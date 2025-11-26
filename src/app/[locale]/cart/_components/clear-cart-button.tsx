'use client';

import * as React from 'react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Trash2, X } from 'lucide-react';
// import { useClearCart } from '../_hooks/use-clear-cart';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { useClearCart } from '../_hooks/use-clear-cart';

type Props = {
  className?: string;
  disabled?: boolean;
};

export default function ClearCartButton({ className, disabled }: Props) {
  // ===============================================================
  // Translation
  // ===============================================================
  const t = useTranslations('ClearCartButton');

  // ===============================================================
  // Hooks
  // ===============================================================
  const { mutate: clearCart, isPending } = useClearCart();

  // ===============================================================
  // State
  // ===============================================================
  const [open, setOpen] = React.useState(false);

  // ===============================================================
  // Functions
  // ===============================================================
  const onConfirm = () => {
    clearCart(undefined, {
      onSuccess: () => setOpen(false),
      onError: () => setOpen(false),
    });
  };

  // ===============================================================
  // Render
  // ===============================================================
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {/* --- Main button --- */}
      <AlertDialogTrigger asChild>
        <Button
          className={cn(
            'bg-maroon-50 text-maroon-600 font-semibold border border-maroon-100 hover:bg-maroon-100',
            'flex items-center justify-center gap-2 rounded-[10px] px-4 py-2.5',
            (disabled || isPending) && 'opacity-60 cursor-not-allowed',
            className
          )}
          disabled={disabled || isPending}
        >
          <Trash2 size={18} strokeWidth={2} />
          {isPending ? t('clearing') : t('clearCart')}
        </Button>
      </AlertDialogTrigger>

      {/* --- Modal content --- */}
      <AlertDialogContent className="w-full text-center p-6 rounded-2xl overflow-hidden">
        {/* --- Icon --- */}
        <div className="flex justify-center pt-6">
          <div className="rounded-full bg-[#2E2E300D] p-5">
            <div className="rounded-full bg-[#2E2E3026] p-5">
              <Trash2 className="h-10 w-10 text-[#A6252A]" strokeWidth={2} />
            </div>
          </div>
        </div>

        {/* --- Title & message --- */}
        <AlertDialogHeader className="flex flex-col items-center pt-6">
          <AlertDialogTitle className="text-[20px] font-semibold leading-[100%] text-[#2E2E30]">
            {t('confirmMessage')}
          </AlertDialogTitle>
        </AlertDialogHeader>

        {/* --- Footer buttons --- */}
        <AlertDialogFooter className="pt-16 gap-3 sm:justify-center">
          {/* Cancel button */}
          <AlertDialogCancel
            className="bg-yellow-500 flex flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-[10px]"
            disabled={isPending}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <X size={20} />
            </button>
            {t('cancel')}
          </AlertDialogCancel>

          {/* Confirm button */}
          <AlertDialogAction
            onClick={onConfirm}
            className="flex flex-1 bg-[#A6252A] hover:bg-[#8e1f24] text-white rounded-[10px] py-2.5"
            disabled={isPending}
          >
            {isPending ? t('clearing') : t('confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
