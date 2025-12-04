'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AddNewCategory, useAddCategory } from '@/lib/schemes/add-categories.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAddNewCategory } from '../_hooks/use-add-category'
import { useToast } from '@/hooks/use-toast'
import { useTranslations } from 'next-intl'
import ImageUploadInput from './image-upload-Input'

export default function AddCategory() {
    // Translations
    const t = useTranslations();

    // Shema
    const { addSchema } = useAddCategory();

    // Form
    const form = useForm<AddNewCategory>({
        resolver: zodResolver(addSchema),
        defaultValues: {
            name: '',
            image: undefined,
        },
    });

    // Mutation
    const { isPending, mutate } = useAddNewCategory();

    //Toast
    const { toast } = useToast();

    // Functions
    const onSubmit: SubmitHandler<AddNewCategory> = (formValues) => {
        mutate(formValues, {
            onSuccess: () => {
                // Show success toast
                toast({ description: t('category-added-successfully-0') });
                // Reset form
                form.reset();
            },
            onError: (err: Error) => {
                // Handle duplicate name 
                if (err.message === 'DUPLICATE_NAME') {
                    form.setError('name', {
                        type: 'manual',
                        message: t('category-name-already-exists'),
                    });
                } else {
                    toast({
                        description: err.message || t('error-adding-category'),
                        variant: 'destructive'
                    });
                }
            },
        });
    };

    return (
        <section className=' w-3/5'>
            <h2 className='font-semibold text-zinc-800 mt-10 text-2xl'>{t('add-a-new-category')}</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-10 bg-white shadow-md p-4 rounded-lg py-5" >

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
                                        placeholder="Enter New Category"
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
                                    {t('category-image')}
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
                    <Button variant="default"
                        type="submit"
                        loading={isPending}
                        disabled={isPending || (!form.formState.isValid && form.formState.isSubmitted)}
                        className="capitalize w-3/4 mt-10">
                        {t('add-category')}
                    </Button>
                </form>
            </Form>
        </section>
    )
}
