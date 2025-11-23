'use client';

import { Button } from '@/components/ui/button';
import { getAddressesResponse, ShippingPayload } from '@/lib/types/address';
import { cn } from '@/lib/utils';
import { MoveRight, Phone } from 'lucide-react';
import React, { useState } from 'react';

// Props
type ShippingAddressProps = {
  setStep: (step: number) => void;
  setShippingPayload: (payload: ShippingPayload | null) => void;
  addresses: getAddressesResponse;
};

export default function ShippingAddress({
  setStep,
  addresses,
  setShippingPayload,
}: ShippingAddressProps) {
  // State
  const [SelectedAddress, setSelectedAddress] = useState<string | null>(
    addresses.addresses[0]?._id || null
  );

  // Functions
  const handleNextClick = () => {
    const selected = addresses.addresses.find((address) => address._id === SelectedAddress);

    // If selected assign this selected id's values to shippingPayload Object
    if (selected) {
      const payload: ShippingPayload = {
        shippingAddress: {
          street: selected.street,
          phone: selected.phone,
          city: selected.city,
          lat: selected.lat,
          long: selected.long,
        },
      };

      // put this payload object in shippingPayload state to send it to payment method component later
      setShippingPayload(payload);

      // step 2 (payment method component)
      setStep(2);
    } else {
      console.error('Selected address not found.');
    }
  };
  return (
    // Shipping Address Section
    <section className="flex-1 flex flex-col  gap-6">
      {/* Title */}
      <header className="text-3xl font-semibold text-zinc-800">Shipping Address</header>

      {/* Addresses List */}
      <ul className="flex flex-col gap-3">
        {addresses.addresses.map((address) => {
          const isSelectedAddress = SelectedAddress === address._id;
          return (
            <li
              onClick={() => setSelectedAddress(address._id)}
              key={address._id}
              className={cn(
                // Base
                'flex flex-col gap-[6px] h-[5.6875rem] border border-zinc-300 rounded-lg px-4 py-[0.875rem] cursor-pointer transition-all  duration-200',
                // Active Address take bg-maroon-600
                isSelectedAddress ? 'bg-maroon-600' : ''
              )}
            >
              {/* City */}
              <div className=" w-full h-[2.0625rem] items-center flex justify-between">
                <h3
                  className={cn(
                    // Base
                    'text-2xl font-semibold  transition-all  duration-200',
                    // Active Address
                    SelectedAddress === address._id ? 'text-zinc-50' : 'text-zinc-800'
                  )}
                >
                  {address.city}
                </h3>

                {/* Phone */}
                <div className="flex gap-[6px] items-center">
                  <div
                    className={cn(
                      // Base
                      'w-8 h-8 rounded-full flex justify-center items-center  transition-all  duration-200',
                      // Active Address
                      isSelectedAddress ? 'bg-zinc-50' : 'bg-maroon-600'
                    )}
                  >
                    {/* Phone Icon */}
                    <Phone
                      width={20}
                      height={20}
                      className={cn(
                        // Base
                        'transition-all  duration-200',
                        // Active Address
                        isSelectedAddress ? 'text-maroon-600' : 'text-zinc-50'
                      )}
                    />
                  </div>

                  <p
                    className={cn(
                      // Base
                      'text-lg  transition-all  duration-200',
                      // Active Address
                      isSelectedAddress ? 'text-zinc-50' : 'text-zinc-500'
                    )}
                  >
                    {address.phone}
                  </p>
                </div>
              </div>

              {/* Street */}
              <div
                className={cn(
                  // Base
                  'px-3 w-fit rounded-xl  transition-all  duration-200',
                  // Active Address
                  isSelectedAddress ? 'bg-zinc-800 text-zinc-50' : 'bg-zinc-200'
                )}
              >
                {address.street}
              </div>
            </li>
          );
        })}
      </ul>

      {/* OR Separartor */}
      <div className="flex items-center">
        <span className="flex-1 h-px bg-zinc-100"></span>
        <span className="mx-4 font-semibold text-zinc-500 text-lg">OR</span>
        <span className="flex-1 h-px bg-zinc-100"></span>
      </div>

      {/*  Add a New Address Button */}
      <Button variant={'destructive'} className="w-full">
        Add a New Address
      </Button>

      {/* Separator */}
      <span className="h-px bg-zinc-100 w-full mt-4"></span>

      {/* Next Button */}
      <div className="flex justify-end ">
        <Button onClick={handleNextClick} className="flex items-end" variant={'default'}>
          Next <MoveRight width={20} height={20} />
        </Button>
      </div>
    </section>
  );
}
