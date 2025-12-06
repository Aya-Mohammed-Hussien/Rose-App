import { useTranslations } from 'next-intl';
import z from 'zod';

export const useProductSchema = () => {
  const t = useTranslations('dashboard.product_validation');

  const productSchema = z.object({
    title: z.string().min(3, t('product_title')),
    description: z.string().min(10, t('description')),
    price: z.number().min(1, t('price')),
    discount: z.number().min(0).max(99).optional(),
    priceAfterDiscount: z.number().optional(),
    quantity: z.number().min(1, t('quantity')),
    category: z.string().min(1, t('category')),
    occasion: z.string().min(1, t('occasion')),
    imgCover: z.instanceof(File, { message: t('product_cover') }),
    images: z
      .array(z.instanceof(File, { message: t('product_gallery') }))
      .min(1, { message: t('product_gallery') }),
  });

  const updateProductSchema = productSchema.omit({ imgCover: true, images: true });

  return { productSchema, updateProductSchema };
};

type ProductValues = z.infer<ReturnType<typeof useProductSchema>['productSchema']>;

export type { ProductValues };

export type UpdateProductValues = z.infer<
  ReturnType<typeof useProductSchema>['updateProductSchema']
>;
