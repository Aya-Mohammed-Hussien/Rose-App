'use client';

import { PenLine } from 'lucide-react';

interface EditAddressProps {
  setView: React.Dispatch<React.SetStateAction<'list' | 'add' | 'update'>>;
}

export default function UpdateAddress({setView} :EditAddressProps ) {
  return (
    <button
    onClick={()=> setView("update")}
     className='w-9 h-9 rounded-full flex items-center bg-zinc-50 justify-center border border-zinc-400'>
      <PenLine size={18} className='text-zinc-800'/>
    </button>
  );
}
