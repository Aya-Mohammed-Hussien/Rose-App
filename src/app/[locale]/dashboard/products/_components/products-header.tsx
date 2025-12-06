'use client';

import * as React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { ProductsHeaderProps } from '@/lib/types/product';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

// Form & validation
const searchSchema = z.object({
  search: z.string().trim().max(100, 'Search is too long').optional().or(z.literal('')),
});

type SearchFormValues = z.infer<typeof searchSchema>;

export function ProductsHeader({ search, onSearchChange }: ProductsHeaderProps) {
  // Translation
  const t = useTranslations('dashboard.productsHeader');

  // Navigation
  const router = useRouter();

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
    <div className="mb-6 flex flex-col gap-4">
      {/* title + primary CTA */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-zinc-800">{t('title')}</h1>

        {/* Add new product button */}
        <Button
          variant="default"
          type="button"
          onClick={() => router.push(`/dashboard/products/add-product`)}
        >
          <Plus className="h-4 w-4" />
          <span>{t('addNewProduct')}</span>
        </Button>
      </div>

      {/* search field */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
          <FormField
            name="search"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="relative w-full">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />

                    <Input
                      {...field}
                      placeholder={t('searchPlaceholder')}
                      className="
                        h-12
                        w-full
                        rounded-lg
                        border border-gray-200
                        bg-white
                        pl-10 pr-4
                        text-sm
                        placeholder:text-gray-400
                        focus-visible:ring-0
                        focus-visible:border-red-700
                      "
                      onChange={(e) => {
                        field.onChange(e);
                        onSearchChange(e.target.value);
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
