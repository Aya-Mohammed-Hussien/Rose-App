'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash, Loader2 } from 'lucide-react';

type ConfirmationModalProps = {
  isPendingDelete: boolean;
  deleteMyAccount: () => void;
};

export default function ConfirmationModal({
  isPendingDelete,
  deleteMyAccount,
}: ConfirmationModalProps) {
  return (
    //   Delete My Account Button with Confirmation Modal
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" className="text-maroon-500 px-4 py-3" variant="ghost">
          Delete My Account
        </Button>
      </DialogTrigger>

      {/* Confirmation Modal */}
      <DialogContent
        className="w-[29.625rem] h-[23.3125rem] p-6 rounded-[1rem] flex flex-col items-center justify-between"
        showCloseIcon={true}
      >
        {/* Modal Header */}
        <DialogHeader className="text-center mt-8">
          {/* Trash Icon */}
          <div className="mx-auto mb-[1.125rem] flex h-[6.5625rem] w-[6.5625rem] items-center justify-center rounded-full bg-[rgba(46,46,48,0.05)]">
            <DialogTitle className="h-[4.375rem] w-[4.375rem] bg-[rgba(46,46,48,0.15)] flex items-center justify-center rounded-full">
              <Trash size={29} strokeWidth={1.5} className="text-zinc-900" />
            </DialogTitle>
          </div>

          {/* Modal Description */}
          <DialogDescription className="font-semibold text-xl text-center text-[#2E2E30]">
            Are you sure you want to delete your account?
            <br />
            <span className="text-base text-maroon-500 font-normal">
              This action is permanent and cannot be undone.
            </span>
          </DialogDescription>
        </DialogHeader>

        {/* Modal Actions */}
        <DialogFooter className="flex justify-center items-center gap-3 mt-auto mb-6">
          {/* Cancel Button */}
          <DialogClose asChild>
            <Button
              variant="outline"
              type="button"
              className="w-52 border normal-case border-zinc-400 bg-zinc-50 hover:bg-zinc-200 text-zinc-800 py-3.5 h-[2.75rem]"
            >
              Nope, not doing it
            </Button>
          </DialogClose>

          {/* Confirm Delete Button */}
          <Button
            onClick={deleteMyAccount}
            disabled={isPendingDelete}
            type="button"
            variant="link"
            className="w-52 py-3.5 h-[2.75rem]"
          >
            {isPendingDelete ? (
              <span className="flex items-center justify-center gap-2">
                Deleting...
                <Loader2 className="animate-spin h-4 w-4" />
              </span>
            ) : (
              'Confirm'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
