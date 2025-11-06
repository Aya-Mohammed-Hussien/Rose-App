'use client';

import * as React from 'react';
import { useGetAddresses } from '@/hooks/addresses/use-user-addresses';
import { Address } from '@/lib/types/addresses';
import { MapPin, Phone } from 'lucide-react';
import DeleteAddress from './delete-address-modal';
import EditAddress from './update-address-button';
import { useLocale, useTranslations } from 'next-intl';
import AddressListSkeleton from '@/components/skeletons/address-list.skeleton';

interface AddressListProps {
  setView: React.Dispatch<React.SetStateAction<'list' | 'add' | 'update'>>;
  setSelectedAddress:React.Dispatch<React.SetStateAction <Address | null> >
}

export default function AddressesList({ setView , setSelectedAddress }: AddressListProps) {
  // Translations
  const t = useTranslations('Addresses');

  // Hooks
  const locale = useLocale();
  const { addresses, isLoading } = useGetAddresses();

  // States
  const [selectedAddressId, setSelectedAddressId] = React.useState('');

  // Variables
  const isArabic = locale === 'ar';
  const labelArray = ['Home', 'Family', 'Work'];

  // Show skeleton while fetching data
  if (isLoading) {
    const skeletonCount = addresses?.length || 3;
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: skeletonCount }).map((_, idx) => (
          <AddressListSkeleton key={idx} />
        ))}
      </div>
    );
  }

  // In case has no addresses yet
  if (addresses?.length === 0 || !addresses)
    return (
      <p className="text-maroon-600 font-semibold text-2xl text-center">{t('no-addresses')}</p>
    );

  return (
    <div>
      {addresses?.map((add: Address, index) => {
        const label = labelArray[index % labelArray.length];
        const translatedLabel = t(label);
        const isSelected = selectedAddressId === add._id;
        const isLast = index === addresses.length - 1;
        return (
          <div
            key={add._id}
            onClick={() => setSelectedAddressId(add._id)}
            className={`rounded-2xl cursor-pointer ps-4 mt-3 me-[1.125rem] flex flex-col gap-4 relative border ${isSelected ? `border-maroon-600` : `border-zinc-300`} ${
              !isLast ? 'mb-9' : ''
            }`}
          >
            {/* Label Tag */}
            <div className="absolute top-0 -translate-y-[60%] bg-white px-1">
              <span className="font-semibold text-maroon-600 text-2xl ">{translatedLabel}</span>
            </div>

            {/* Delete & Edit */}
            <div
              className={`absolute flex flex-col gap-1.5 top-1/2 -translate-y-1/2 
              ${isArabic ? `left-0 -translate-x-1/2` : `right-0  translate-x-1/2`} `}
            >
              {/* Edit Address Button */}
              <EditAddress setView={setView} address={add} setSelectedAddress={setSelectedAddress}/>

              {/* Delete Address Button */}
              <DeleteAddress addressId={add._id} />
            </div>

            {/* City & Phone */}
            <div className="flex justify-between items-center mt-6">
              {/* City */}
              <div className="flex items-center gap-2.5">
                <div className="rounded-full bg-emerald-500 w-[1.875rem] h-[1.875rem] flex justify-center items-center">
                  <MapPin size={20} className="text-white" />
                </div>
                <span className="font-semibold text-2xl text-zinc-800">{add.city}</span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-1.5 me-9">
                <Phone size={20} strokeWidth={1.2} />
                <span className="text-zinc-600 font-medium text-lg">+2{add.phone}</span>
              </div>
            </div>

            {/* Street */}
            <div className="mb-5">
              <p className="text-zinc-800 font-medium text-base inline-block bg-zinc-100 py-1 px-3 rounded-full">
                {add.street}, {add.city}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
