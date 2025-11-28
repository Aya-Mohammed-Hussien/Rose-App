import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { useTranslations } from 'next-intl';
import Link from 'next/link'
interface DeleteCategoryButtonProps {
    categoryId: string;
}

export default function EditCategory({ categoryId }: DeleteCategoryButtonProps) {

    // Translations
    const t = useTranslations();

    return (
        <Button variant="outline" size="sm" className="bg-blue-100 border-blue-100 text-blue-600 hover:bg-blue-100 hover:text-blue-700 gap-1">
            <Pencil size={14} />
            <Link href={`categories/${categoryId}`}>{t('edit-0')}</Link>
        </Button>
    )
}
