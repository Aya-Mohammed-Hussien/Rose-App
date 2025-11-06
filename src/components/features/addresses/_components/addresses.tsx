'use client';

import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import StepIndicator from '@/components/ui/step-indicator';

import { getAddresses } from '@/lib/apis/addresses/addresses.api';
import { Address } from '@/lib/types/addresses';
import AddressSkeleton from '@/components/skeletons/shipping-address.skeleton';

type ShippingAddressProps = {
  onNext: () => void;
  onSelectAddress: (addr: Address) => void;
};

export default function ShippingAddress({ onNext, onSelectAddress }: ShippingAddressProps) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selected, setSelected] = useState<Address | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await getAddresses();
        setAddresses(data.addresses);
      } catch (err: any) {
        if (err.message === 'unauthorized') {
          setError('Please log in to view your addresses.');
        } else {
          setError('Failed to load addresses.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, []);

  const handleSelect = (addr: Address) => {
    setSelected(addr);
    onSelectAddress(addr);
  };

  if (loading) {
    return (
      <div className="max-w-[782px] w-full mx-auto m-10 space-y-6 px-4">
        <StepIndicator currentStep={1} />
        <h2 className="font-primary font-semibold text-[30px] text-gray-800">Shipping Address</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <AddressSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error === 'Please log in to view your addresses.') {
    return (
      <div className="text-center py-20 text-red-600 text-lg">
        <p>{error}</p>
        <Button
          onClick={() => (window.location.href = '/login')}
          className="mt-4 bg-red-700 hover:bg-red-800 text-white rounded-[10px]"
        >
          Go to Login
        </Button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600 text-lg">
        <p>{error}</p>
      </div>
    );
  }

  if (addresses.length === 0) {
    return (
      <div className="max-w-[782px] w-full mx-auto m-10 space-y-6 px-4 text-center">
        <StepIndicator currentStep={1} />
        <h2 className="font-primary font-semibold text-[30px] text-gray-800">Shipping Address</h2>
        <p className="text-gray-500 mt-8 text-lg">🚫 مفيش عناوين لسه مضافة</p>
        <Button className="mt-6 w-full gap-[10px] text-red-600 bg-red-50 hover:bg-red-100 rounded-[10px] py-[14px] px-[16px] transition-all">
          Add a New Address
        </Button>
      </div>
    );
  }

  return (
    <div className="w-[782px] h-[592px] mx-auto m-10 space-y-6 px-4 opacity-100 rotate-0">
      <StepIndicator currentStep={1} />

      <h2 className="font-primary font-semibold text-[30px] text-gray-800">Shipping Address</h2>

      <div
        className="space-y-3 overflow-y-auto hide-scrollbar"
        style={{ maxHeight: '260px', paddingRight: '6px' }}
      >
        {addresses.map((addr) => (
          <Card
            key={addr._id}
            onClick={() => handleSelect(addr)}
            className={`cursor-pointer border border-gray-200 rounded-md transition-all
              ${selected?._id === addr._id ? 'bg-red-700 text-white' : 'bg-white hover:bg-gray-50'}`}
          >
            <CardContent className="flex justify-between items-center py-[14px] px-[16px]">
              <div>
                <h3 className="font-semibold text-[18px]">{addr.city}</h3>
                <p
                  className={`text-sm ${selected?._id === addr._id ? 'text-gray-100' : 'text-gray-500'}`}
                >
                  {addr.street}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Phone
                  className={`w-5 h-5 ${selected?._id === addr._id ? 'text-white' : 'text-gray-600'}`}
                />
                <span
                  className={`text-sm ${selected?._id === addr._id ? 'text-white' : 'text-gray-700'}`}
                >
                  {addr.phone}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center w-full">
        <p className="text-gray-400 text-sm mb-2">OR</p>
        <Button className="w-full text-red-600 bg-red-50 hover:bg-red-100 rounded-[10px] py-[14px] px-[16px] transition-all">
          Add a New Address
        </Button>
      </div>

      <div className="flex justify-end mt-10">
        <Button
          onClick={onNext}
          disabled={!selected}
          className={`min-w-[120px] sm:w-[152px] ${
            selected
              ? 'bg-red-700 hover:bg-red-800 text-white'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          } rounded-[10px] px-[16px] py-[10px] transition-all`}
        >
          Next →
        </Button>
      </div>
    </div>
  );
}
