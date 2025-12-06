'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCategories } from '@/hooks/category/use-all-categories';
import { useTranslations } from 'next-intl';

/**
 * SelectCategoryField Component
 * ----------------------------
 * This component renders a dropdown (select) field for choosing a product category
 * in the Add Product form. It integrates with React Hook Form and fetches all
 * categories using a custom hook (`useCategories`). It displays a loading state
 * while fetching categories.
 */
export default function SelectCategoryField({ form }: { form: any }) {
  //Translations
  const t = useTranslations('dashboard.product_form');

  // Hooks
  const { data: categories, isLoading } = useCategories();

  return (
    <FormField
      name="category"
      control={form.control}
      render={({ field }) => (
        <FormItem className="mb-[1.125rem] w-[46.625rem]">
          {/* Form Label */}
          <FormLabel>
            {t('category')} <span className="text-red-600 font-medium text-sm">*</span>
          </FormLabel>

          {/* Dropdown select component */}
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            {/* Field */}
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
            </FormControl>

            {/* Dropdown content */}
            <SelectContent>
              {isLoading && (
                <SelectItem value="loading" disabled>
                  Loading ...
                </SelectItem>
              )}

              {/* Render each category as a selectable item */}
              {categories?.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Form validation message */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
