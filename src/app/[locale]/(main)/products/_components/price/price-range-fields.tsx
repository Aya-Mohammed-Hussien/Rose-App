'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { PriceFilterValues, priceFilterSchema } from '@/lib/schemes/price.schema';
import SubmissionMessage from '@/components/shared/submission-message';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { usePriceFilter } from '../../_hooks/price/use-price-filter';

export default function PriceRangeForm() {
  // Translation
  const t = useTranslations('price');

  // Form & validation
  const form = useForm<PriceFilterValues>({
    defaultValues: { min: undefined, max: undefined },
    resolver: zodResolver(priceFilterSchema(t)),
    mode: 'onChange',
  });

  // Functions
  const { reset } = usePriceFilter(form);

  // Render
  return (
    <Form {...form}>
      <div className="w-full">
        {/* Title + Reset */}
        <div className="flex items-center justify-between mb-[10px]">
          <h3 className="text-base text-zinc-800 font-semibold">{t('title')}</h3>
          {(form.watch('min') !== undefined || form.watch('max') !== undefined) && (
            <Button
              onClick={reset}
              variant="ghost"
              className="flex items-center justify-center gap-1 text-sm text-red-600 hover:bg-transparent"
            >
              <X className="w-4 h-4" />
              {t('reset')}
            </Button>
          )}
        </div>

        {/* Fields Row */}
        <div className="grid grid-cols-2 gap-3">
          {/* Min */}
          <FormField
            name="min"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-zinc-800 font-medium">{t('from')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    inputMode="numeric"
                    placeholder={t('placeholder.min')}
                    className="h-12 rounded-lg"
                    value={field.value ?? ''}
                    onChange={(e) => {
                      const v = e.target.value;
                      field.onChange(v === '' ? undefined : Number(v));
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Max */}
          <FormField
            name="max"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-zinc-800 font-medium">{t('to')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    inputMode="numeric"
                    placeholder={t('placeholder.max')}
                    className="h-12 rounded-lg"
                    value={field.value ?? ''}
                    onChange={(e) => {
                      const v = e.target.value;
                      field.onChange(v === '' ? undefined : Number(v));
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Error */}
        <SubmissionMessage>
          {form.formState.errors.max?.message || form.formState.errors.min?.message}
        </SubmissionMessage>
      </div>
    </Form>
  );
}
