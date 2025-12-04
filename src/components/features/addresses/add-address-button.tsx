'use client';

import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

interface AddAddressProps {
  setView: React.Dispatch<React.SetStateAction<'list' | 'add' | 'update'>>;
}

export default function AddAddress({ setView }: AddAddressProps) {
  // Transaltions
  const t = useTranslations('Addresses');

  return (
    <Button variant="destructive" className="py-3.5 normal-case" onClick={() => setView('add')}>
      {t('add-address')}
    </Button>
  );
}
