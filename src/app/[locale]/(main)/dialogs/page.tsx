'use client';
import ConfirmationModal from '@/components/shared/confirmation-modal';
import ImageDialog from '@/components/shared/image-preview-dialog';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

export default function page() {
  // State
  const [isPending, setisPending] = useState(false);

  // Functions
  const deleteAction = () => {
    console.log('deleted');
  };

  return (
    <main className="min-h-screen flex gap-2 justify-center items-center">
      {/*Image Dialog */}
      <ImageDialog
        images={[
          'https://picsum.photos/800/400?random=1',
          'https://picsum.photos/800/400?random=2',
          'https://picsum.photos/800/400?random=3',
          'https://picsum.photos/800/400?random=4',
        ]}
        trigger={<Button variant="secondary">Open Gallery</Button>}
      />

      {/* Delete Modal */}
      <ConfirmationModal
        triggerButton={<Button variant="secondary">Delete</Button>}
        cancelButtonTitle="Cancel"
        confirmButtonTitle="Confirm"
        deleteAction={deleteAction}
        isPendingDelete={isPending}
        questionTitle="Are you sure you want to delete this product?"
      />
    </main>
  );
}
