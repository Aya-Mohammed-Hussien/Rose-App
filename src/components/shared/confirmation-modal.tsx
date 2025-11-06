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

// Props
type ConfirmationModalProps = {
  isPendingDelete: boolean;
  deleteAction: () => void;
  confirmButtonTitle: string;
  cancelButtonTitle: string;
  deleteButtonTitle: string;
  questionTitle: string;
  warningTitle?: string;
};

export default function ConfirmationModal({
  isPendingDelete,
  deleteAction,
  confirmButtonTitle,
  cancelButtonTitle,
  deleteButtonTitle,
  questionTitle,
  warningTitle,
}: ConfirmationModalProps) {
  return (
    <Dialog>
      {/* Delete Button */}
      <DialogTrigger asChild>
        <Button
          type="button"
          className="text-maroon-500 hover:bg-red-600 transition-all duration-200 hover:text-white px-4 py-3"
          variant="ghost"
        >
          {deleteButtonTitle}
        </Button>
      </DialogTrigger>

      {/* Confirmation Modal */}
      <DialogContent
        className="w-[29.625rem]  h-[23.3125rem] p-6 rounded-[1rem] flex flex-col items-center justify-between"
        showCloseIcon={true}
      >
        {/* Modal Header */}
        <DialogHeader className="text-center b flex flex-col justify-between h-[17.25rem]  mt-8">
          <div>
            {/* Trash Icon */}
            <div className="mx-auto mb-[1.125rem] flex h-[6.5625rem] w-[6.5625rem] items-center justify-center rounded-full bg-[rgba(46,46,48,0.05)]">
              <DialogTitle className="h-[4.375rem] w-[4.375rem] bg-[rgba(46,46,48,0.15)] flex items-center justify-center rounded-full">
                <Trash size={29} strokeWidth={1.5} className="text-zinc-900" />
              </DialogTitle>
            </div>

            {/* Modal Description */}
            <DialogDescription className="font-semibold text-xl text-center text-[#2E2E30]">
              {/* Question */}
              {questionTitle}

              {/* Warning */}
              {warningTitle && (
                <span className="text-base text-maroon-500 font-normal">{warningTitle}</span>
              )}
            </DialogDescription>
          </div>

          {/* Modal Actions */}
          <DialogFooter className="flex  justify-center items-center gap-3 mt-auto mb-6">
            {/* Cancel Button */}
            <DialogClose asChild>
              <Button
                variant="outline"
                type="button"
                className="w-52 border normal-case border-zinc-400 bg-zinc-50 hover:bg-zinc-200 text-zinc-800 py-3.5 h-[2.75rem]"
              >
                {cancelButtonTitle}
              </Button>
            </DialogClose>

            {/* Confirm Delete Button */}
            <Button
              onClick={deleteAction}
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
                confirmButtonTitle
              )}
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
