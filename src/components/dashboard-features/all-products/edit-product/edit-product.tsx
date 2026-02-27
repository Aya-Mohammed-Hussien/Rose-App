import { Pencil } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

interface EditProductProps {
    productId: string;
}

export default function EditProduct({ productId }: EditProductProps) {
    const t = useTranslations('dashboard.productsTable');

    return (
        <Link
            href={`/dashboard/products/update-product/${productId}`}
            className={cn(
                'inline-flex items-center gap-1 rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium shadow-sm',
                'bg-blue-100 border-blue-100 text-blue-600 hover:bg-blue-100 hover:text-blue-700'
            )}
        >
            <Pencil size={14} />
            {t('edit')}
        </Link>
    );
}
