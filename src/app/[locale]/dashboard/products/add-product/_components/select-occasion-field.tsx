'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useOccasions } from '@/hooks/occasions/use-all-occasions';
import { useTranslations } from 'next-intl';
import { UseFormReturn, Path } from 'react-hook-form';

type FormWithOccasion = {
  occasion: string;
};

export default function SelectOccasionField<T extends FormWithOccasion>({ form }: { form: UseFormReturn<T> }) {
  //Translations
  const t = useTranslations('dashboard.product_form');

  // Hooks
  const { data: occasions, isLoading } = useOccasions();

  return (
    <FormField
      name={"occasion" as Path<T>}
      control={form.control}
      render={({ field }) => (
        <FormItem className="mb-[1.125rem] w-[46.625rem]">
          {/* Form Label */}
          <FormLabel>
            {t('occasion')} <span className="text-red-600 font-medium text-sm">*</span>
          </FormLabel>

          <Select onValueChange={field.onChange} defaultValue={field.value}>
            {/* Field */}
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {isLoading && (
                <SelectItem value="loading" disabled>
                  Loading ...
                </SelectItem>
              )}
              {occasions?.map((occasion) => (
                <SelectItem key={occasion._id} value={occasion._id}>
                  {occasion.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
