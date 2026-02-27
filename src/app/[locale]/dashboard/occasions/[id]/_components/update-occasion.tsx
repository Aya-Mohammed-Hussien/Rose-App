'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateOccasion } from '../_hooks/use-update-occasion';
import { UpdateOccasionFormData, UpdateOccasionSchema } from '@/lib/schemes/update-occasion.schema';
import { useMemo } from 'react';
import { ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function UpdateOccasionForm({ id, name, image }: { id: string; name: string; image: string }) {
    // Translations
    const t = useTranslations();

    // State
    const imagePreview = useMemo(() => image, [image]);

    // Schema
    const { updateSchema } = UpdateOccasionSchema();

    // Form
    const form = useForm<UpdateOccasionFormData>({
        resolver: zodResolver(updateSchema),
        defaultValues: {
            name: name || '',
        },
    });

    // Mutation
    const { mutate, isPending } = useUpdateOccasion();

    // Function
    const onSubmit: SubmitHandler<UpdateOccasionFormData> = (values) => {
        const formData = new FormData();
        formData.append('name', values.name);

        if (values.image instanceof File) {
            formData.append('image', values.image);
        }

        mutate({ occasionId: id, data: formData });
    };

    return (
        <section className="w-full">
            <h2 className="font-semibold text-zinc-800 text-2xl">
                {t('update-occasion')}: {name}
            </h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-10 bg-white shadow-md p-6 rounded-lg">
                    {/* Name */}
                    <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                {/* Label */}
                                <FormLabel className="font-medium text-base text-zinc-800 flex items-center gap-1">
                                    {t('name-0')}
                                    {/* Red asterisk to indicate required field */}
                                    <span className="text-red-500">*</span>
                                </FormLabel>

                                {/* Input Control */}
                                <FormControl>
                                    <Input
                                        placeholder="Enter Occasion Name"
                                        className="w-3/5 h-11"
                                        {...field}
                                    />
                                </FormControl>

                                {/* Error Message */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* View Image */}
                    {imagePreview && (
                        <div className="flex flex-col gap-2 items-center me-5">
                            <Link
                                href={imagePreview}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-48 flex justify-center items-center gap-2 text-blue-600 text-sm hover:text-blue-700 transition-colors cursor-pointer border border-gray-300 rounded-md p-2"
                            >
                                <ImageIcon className="w-4 h-4" />
                                <span className="text-center">{t('view-occasion-image')}</span>
                            </Link>
                        </div>
                    )}

                    {/* Submit Button */}
                    <Button
                        variant="default"
                        type="submit"
                        loading={isPending}
                        disabled={isPending}
                        className="capitalize w-3/5 mt-6"
                    >
                        {t('update-occasion-0')}
                    </Button>
                </form>
            </Form>
        </section>
    );
}
