'use client';

import * as React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { ProductsHeaderProps } from '@/lib/types/product';
import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import AddProduct from './add-product/add-product';

// Form & validation
const searchSchema = z.object({
  search: z.string().trim().max(100, 'Search is too long').optional().or(z.literal('')),
});

type SearchFormValues = z.infer<typeof searchSchema>;

export function ProductsHeader({ search, onSearchChange }: ProductsHeaderProps) {
  // Translation
  const t = useTranslations('dashboard.productsHeader');

  // Form & validation
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: { search },
  });

  // Effects
  React.useEffect(() => {
    form.setValue('search', search);
  }, [search, form]);

  // Functions
  const handleSubmit = (values: SearchFormValues) => {
    const value = values.search ?? '';
    onSearchChange(value);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-0 mt-5">
        <h1 className="text-2xl font-semibold text-zinc-800">{t('title')}</h1>
        <AddProduct />
      </div>

      {/* Search */}
      <div className="relative w-full px-3 mb-5 mt-3">
        <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
            <FormField
              name="search"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <input
                      type="text"
                      placeholder={t('searchPlaceholder')}
                      className="pl-10 w-full border border-gray-200 bg-white rounded-xl px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-800"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        onSearchChange(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </>
  );
}
