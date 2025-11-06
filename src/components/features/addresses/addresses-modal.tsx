'use client';

import * as React from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useTranslations } from 'next-intl';
import AddAddress from './add-address-button';
import AddressesList from './addresses-list';
import AddressWizard from './address-wizard';
import { Address } from '@/lib/types/addresses';

export default function AddressesModal() {
  // translations
  const t = useTranslations('Addresses');

  //states
  const [view, setView] = React.useState<'list' | 'add' | 'update'>('list');
  const [selectedAddress, setSelectedAddress] = React.useState<Address | null>(null);

  return (
    <DialogContent
      className={`flex flex-col min-w-[53.125rem] ps-6 ${view === 'list' ? 'max-h-[35.4375rem]' : 'max-h-[41.625rem]'}`}
      showCloseIcon={false}
    >
      <DialogHeader
        className={`flex flex-row justify-between items-center flex-shrink-0 ${view === 'list'} "border-b border-zinc-200 pb-4"`}
      >
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
        {view === 'list' && <AddressesList setView={setView} setSelectedAddress={setSelectedAddress}/>}
        {view === 'add' && <AddressWizard mode="add" initialData={null} />}
        {view === 'update' && selectedAddress && (
          <AddressWizard mode="update" initialData={selectedAddress} />
        )}
      </div>
    </DialogContent>
  );
}
