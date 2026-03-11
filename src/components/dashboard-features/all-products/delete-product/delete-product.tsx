import { useRouter } from 'next/navigation';
import { DeleteProduct } from '@/lib/actions/products/delete-product.api';
import ConfirmationModal from '@/components/shared/confirmation-modal';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl';

interface DeleteProductButtonProps {
    productId: string;
}

export default function DeleteProductButton({ productId }: DeleteProductButtonProps) {
    // Translations
    const t = useTranslations('dashboard.productsTable');

    // State
    const [isLoading, setIsLoading] = useState(false);

    // Hook
    const router = useRouter();

    // Toast
    const { toast } = useToast();

    const handleDelete = async () => {
        setIsLoading(true);

        try {
            const result = await DeleteProduct(productId);

            if (result.error) {
                toast({
                    variant: 'destructive',
                    title: t('deleteError'),
                    description: result.error,
                });
            } else {
                toast({
                    title: t('success'),
                    description: t('deleteSuccess'),
                });
                router.refresh();
            }
        } catch {
            toast({
                variant: 'destructive',
                description: t('deleteError'),
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ConfirmationModal
            deleteAction={handleDelete}
            isPendingDelete={isLoading}
            questionTitle={t('deleteQuestion')}
            confirmButtonTitle="Yes"
            cancelButtonTitle="No"
            triggerButton={
                <Button
                    variant="outline"
                    size="sm"
                    className="bg-red-100 border-red-100 text-red-600 hover:bg-red-100 hover:text-red-700 gap-1"
                    disabled={isLoading}
                    onClick={(e) => e.stopPropagation()}
                >
                    <Trash2 size={14} />
                    {t('delete')}
                </Button>
            }
        />
    );
}
