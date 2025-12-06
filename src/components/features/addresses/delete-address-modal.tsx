'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useDeleteAddress } from '@/hooks/addresses/use-delete-address';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { Trash, Trash2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

export default function DeleteAddress({ addressId }: { addressId: string }) {
  // Translations
  const t = useTranslations('Addresses');

  // Hooks
  const queryClient = useQueryClient();
  const locale = useLocale();
  const { toast } = useToast();

  //Mutations
  const { isPending, deleteAddress } = useDeleteAddress();

  // Functions
  const handleDeleteAddress = () => {
    deleteAddress(addressId, {
      onSuccess: () => {
        toast({
          description: t('delete-success-message'),
        });

        // Refetch addresses after toast (optional slight delay for smoother UX)
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ['addresses'] });
        }, 300);
      },
      onError: () => {
        toast({
          description: t('delete-error-message'),
          variant: 'destructive',
        });
      },
    });
  };

  return (
    <Dialog>
      {/* Delete Address Button */}
      <DialogTrigger asChild>
        <button className="bg-red-600 w-9 h-9 rounded-full flex items-center justify-center">
          <Trash2 size={18} className="text-white" />
        </button>
      </DialogTrigger>

      {/* Delete Address Modal */}
      <DialogContent
        className="w-[29.625rem] h-[23.3125rem] p-6 rounded-[1rem]"
        showCloseIcon={true}
      >
        {/* Modal Header */}
        <DialogHeader className=" pt-12">
          {/* Trash icon */}
          <div className="mx-auto mb-[1.125rem] flex h-[6.5625rem] w-[6.5625rem] items-center justify-center rounded-full bg-[rgba(46,46,48,0.05)]">
            <DialogTitle className="h-[4.375rem] w-[4.375rem] bg-[rgba(46,46,48,0.15)] flex items-center justify-center rounded-full">
              <Trash size={29} strokeWidth={1.5} className="text-zinc-900" />
            </DialogTitle>
          </div>

          {/* Modal Description */}
          <DialogDescription className="text-#2E2E30 font-semibold text-xl text-center">
            {t('delete-address-description')}
          </DialogDescription>
        </DialogHeader>

        {/*Modal Footer */}
        <DialogFooter
          className={`mt-[3.875rem] flex justify-center items-center  ${locale === 'ar' ? 'gap-2.5' : 'gap-0.5'}`}
        >
          {/* Cancel Button */}
          <DialogClose asChild>
            <Button
              variant="outline"
              type="button"
              className="w-52 border border-zinc-400 bg-zinc-50 text-zinc-800 py-3.5 h-[2.75rem]"
            >
              {t('cancel')}
            </Button>
          </DialogClose>

          {/* Delete Button */}
          <Button
            onClick={handleDeleteAddress}
            disabled={isPending}
            loading={isPending}
            type="submit"
            variant="link"
            className="w-52 py-3.5 h-[2.75rem]"
          >
            {t('confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
