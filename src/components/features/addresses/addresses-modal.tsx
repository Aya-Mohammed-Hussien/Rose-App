'use client';

import * as React from 'react';
import AddAddressContent from './add-address-content';
import UpdateAddressContent from './update-address-content';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useTranslations } from 'next-intl';
import AddAddress from './add-address';
import AddressesList from './addresses-list';

export default function AddressesModal() {
  // translations
  const t = useTranslations('Addresses');

  //states
  const [view, setView] = React.useState<'list' | 'add' | 'update'>('list');
  const [step, setStep] = React.useState<1 | 2>(1);

  return (
    <DialogContent
      className="flex flex-col min-w-[53.125rem] max-h-[35.4375rem] ps-6"
      showCloseIcon={false}
    >
      <DialogHeader className="flex flex-row justify-between items-center border-b border-zinc-200 pb-4 flex-shrink-0">
        {/* Modal Title */}
        <DialogTitle className="font-bold text-3xl text-zinc-800 capitalize">
          {view === 'list' && t('addresses')}
          {view === 'add' && t('add-address')}
          {view === 'update' && t('update-address-info')}
        </DialogTitle>

        {/* Add new address button in addresses list only */}
        {view === 'list' && <AddAddress setView={setView} />}
      </DialogHeader>

      <div className="flex-1 overflow-y-scroll">
        {view === 'list' && <AddressesList setView={setView} />}
        {view === 'add' && <AddAddressContent step={step} setStep={setStep} setView={setView} />}
        {view === 'update' && (
          <UpdateAddressContent step={step} setStep={setStep} setView={setView} />
        )}
      </div>
    </DialogContent>
  );
}
