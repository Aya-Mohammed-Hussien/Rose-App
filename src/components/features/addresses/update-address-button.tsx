'use client';

import { Button } from '@/components/ui/button';
import { Address } from '@/lib/types/addresses';
import { PenLine } from 'lucide-react';

interface EditAddressProps {
  setView: React.Dispatch<React.SetStateAction<'list' | 'add' | 'update'>>;
  address: Address;
  setSelectedAddress: React.Dispatch<React.SetStateAction<Address | null>>;
}

export default function UpdateAddress({ setView, address, setSelectedAddress }: EditAddressProps) {
  return (
    <Button
      onClick={() => {
        setView('update');
        setSelectedAddress(address);
      }}
      className="w-9 h-9 rounded-full flex items-center bg-zinc-50 justify-center border border-zinc-400 hover:bg-white"
    >
      <PenLine size={18} className="text-zinc-800" />
    </Button>
  );
}
