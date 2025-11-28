'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AddNewCategory, useAddCategory } from '@/lib/schemes/add-categories.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Upload } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAddNewCategory } from '../_hooks/use-add-category'
import { useToast } from '@/hooks/use-toast'
import { useTranslations } from 'next-intl'

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
                toast({ description: t('category-added-successfully-0') });
                form.reset();
            },
            onError: (err: any) => {
                const errorMessage = err.message || 'Error adding category';

                if (errorMessage.includes('already exists')) {
                    form.setError('name', {
                        type: 'manual',
                        message: errorMessage,
                    });
                } else {
                    toast({
                        description: errorMessage,
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
                                <FormLabel className="flex items-center gap-1 font-medium text-base text-zinc-800">
                                    {t('category-image')}
                                    <span className="text-red-500">*</span>
                                </FormLabel>

                                <FormControl>
                                    <div
                                        className="w-3/4 h-10 border border-zinc-300 rounded-xl flex items-center justify-between px-3 cursor-pointer"
                                        onClick={() => document.getElementById("category-image")?.click()}
                                    >
                                        <span className="text-sm text-zinc-500">
                                            {field.value ? field.value.name : ""}
                                        </span>

                                        <span className="text-red-500 flex items-center gap-1 text-sm">
                                            <Upload size={18} />
                                            {t('upload-file')}
                                        </span>
                                        <Input
                                            id="category-image"
                                            type="file"
                                            className=" hidden"
                                            accept="image/*"
                                            onChange={(e) => field.onChange(e.target.files?.[0])}
                                        />
                                    </div>
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
