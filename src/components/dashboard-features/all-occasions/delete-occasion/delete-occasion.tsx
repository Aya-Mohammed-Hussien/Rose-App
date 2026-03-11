import { useRouter } from 'next/navigation';
import { DeleteOccasion } from '@/lib/actions/occasions/delete-occasion.api';
import ConfirmationModal from '@/components/shared/confirmation-modal';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl';

interface DeleteOccasionButtonProps {
    occasionId: string;
}

export default function DeleteOccasionButton({ occasionId }: DeleteOccasionButtonProps) {
    // Translations
    const t = useTranslations();

    // State
    const [isLoading, setIsLoading] = useState(false);

    // Hook
    const router = useRouter();

    // Toast
    const { toast } = useToast();

    const handleDelete = async () => {
        setIsLoading(true);

        try {
            await DeleteOccasion(occasionId);
            toast({
                title: t('success'),
                description: t('occasion-deleted-successfully'),
            });
            router.refresh();
        } catch (err) {
            toast({
                variant: 'destructive',
                title: t('error'),
                description: err instanceof Error ? err.message : t('an-unexpected-error-occurred'),
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ConfirmationModal
            deleteAction={handleDelete}
            isPendingDelete={isLoading}
            questionTitle="Are you sure you want to delete this occasion?"
            warningTitle="This action is permanent and cannot be undone."
            confirmButtonTitle="Yes"
            cancelButtonTitle="No"
            triggerButton={
                <Button
                    variant="outline"
                    size="sm"
                    className="bg-red-100 border-red-100 text-red-600 hover:bg-red-100 hover:text-red-700 gap-1"
                >
                    <Trash2 size={14} />
                    {t('delete')}
                </Button>
            }
        />
    );
}
