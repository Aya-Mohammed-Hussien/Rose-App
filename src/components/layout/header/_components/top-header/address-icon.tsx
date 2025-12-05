'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Address } from '@/lib/types/addresses';
import { MapPinPen } from 'lucide-react';
import { useTranslations } from 'next-intl';
import AddressesModal from '@/components/features/addresses/addresses-modal';

// Props
type AddressIconProps = {
  addresses: Address[];
};

export default function AddressIcon({ addresses }: AddressIconProps) {
  //Translations
  const t = useTranslations('Addresses');

  if (!addresses || addresses.length === 0) return null;

  //Variables
  const userFirstAddress = addresses?.[0].city || 'Cairo';

  return (
    <div className="flex flex-col gap-1 px-2.5 me-4 ">
      {/* Label above the address */}
      <span className="text-sm font-normal text-zinc-500 leading-none whitespace-nowrap">
        {t('deliver-to')}:
      </span>

      {/* Row containing the address icon and city name => opens modal */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="p-0 h-auto hover:bg-transparent flex justify-center items-center gap-1.5 text-maroon-700 dark:text-softPink-200"
          >
            {/* Map pin icon */}
            <MapPinPen size={20} />

            {/* City name (First Address for user) */}
            <span className="text-base font-medium">{userFirstAddress}</span>
          </Button>
        </DialogTrigger>

        {/* Modal Content */}
        <AddressesModal />

      </Dialog>
    </div>
  );
}
