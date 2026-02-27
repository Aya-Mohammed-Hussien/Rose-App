'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AddNewOccasion, useAddOccasion } from '@/lib/schemes/add-occasion.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAddNewOccasion } from '../_hooks/use-add-occasion';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl';
import ImageUploadInput from './image-upload-Input';

export default function AddOccasion() {
    // Translations
    const t = useTranslations();

    // Schema
    const { addSchema } = useAddOccasion();

    // Form
    const form = useForm<AddNewOccasion>({
        resolver: zodResolver(addSchema),
        defaultValues: {
            name: '',
            image: undefined,
        },
    });

    // Mutation
    const { isPending, mutate } = useAddNewOccasion();

    // Toast
    const { toast } = useToast();

    // Functions
    const onSubmit: SubmitHandler<AddNewOccasion> = (formValues) => {
        mutate(formValues, {
            onSuccess: () => {
                // Show success toast
                toast({ description: t('occasion-added-successfully') });
                // Reset form
                form.reset();
            },
            onError: (err: Error) => {
                // Handle duplicate name
                if (err.message === 'DUPLICATE_NAME') {
                    form.setError('name', {
                        type: 'manual',
                        message: t('occasion-name-already-exists'),
                    });
                } else {
                    toast({
                        description: err.message || t('error-adding-occasion'),
                        variant: 'destructive',
                    });
                }
            },
        });
    };

    return (
        <section className="w-full">
            <h2 className="font-semibold text-zinc-800 text-2xl">{t('add-a-new-occasion')}</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-10 bg-white shadow-md p-4 rounded-lg py-5">
                    {/* Name */}
                    <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-medium text-base text-zinc-800 flex items-center gap-1">
                                    {t('name')}
                                    <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter New Occasion"
                                        className="w-3/4 h-10"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Image */}
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                {/* Field Label */}
                                <FormLabel className="flex items-center gap-1 font-medium text-base text-zinc-800">
                                    {t('occasion-image')}
                                    <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                    <ImageUploadInput
                                        selectedFile={field.value}
                                        onFileSelect={field.onChange}
                                        uploadLabel={t('upload-file')}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit */}
                    <Button
                        variant="default"
                        type="submit"
                        loading={isPending}
                        disabled={isPending || (!form.formState.isValid && form.formState.isSubmitted)}
                        className="capitalize w-3/4 mt-10"
                    >
                        {t('add-occasion')}
                    </Button>
                </form>
            </Form>
        </section>
    );
}
