import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

export default function AddOccasion() {
    // Translations
    const t = useTranslations();

    return (
        <Button className="bg-[#A6252A] hover:bg-[#A6252A] text-white gap-2 text-sm">
            <Plus size={16} />
            <Link href="occasions/add-occasion">{t('add-a-new-occasion-0')}</Link>
        </Button>
    );
}
