import { useTranslations } from 'next-intl';
import z from 'zod';

export const useProductSchema = () => {
  const t = useTranslations('dashboard.product_validation');

  const productSchema = z.object({
    title: z.string().min(3, t('product_title')),
    description: z.string().min(10, t('description')),
    price: z.coerce.number().min(1, t('price')),
    discount: z.coerce.number().optional(),
    priceAfterDiscount: z.coerce.number().optional(),
    quantity: z.coerce.number().min(1, t('quantity')),
    category: z.string().min(1, t('category')),
    occasion: z.string().min(1, t('occasion')),
    imgCover: z.string().min(1, t('product_cover')),
    images: z.array(z.string().min(1, t('product_gallery'))).min(1),
  });
  return { productSchema };
};

type ProductValues = z.infer<ReturnType<typeof useProductSchema>['productSchema']>;

export type { ProductValues };
