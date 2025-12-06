'use client';

import { z } from 'zod';
import { useTranslations } from 'next-intl';

export const useProductsSearchSchema = () => {
  const t = useTranslations('dashboard.productsHeader');

  return z.object({
    search: z.string().trim().max(100, t('searchTooLong')).optional().or(z.literal('')),
  });
};

export type ProductsSearchFields = z.infer<ReturnType<typeof useProductsSearchSchema>>;
