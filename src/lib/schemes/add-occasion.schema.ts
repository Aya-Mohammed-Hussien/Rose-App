import { useTranslations } from 'next-intl';
import { z } from 'zod';

export const useAddOccasion = () => {
  // Translations
  const t = useTranslations();

  // Schema
  const addSchema = z.object({
    name: z
      .string()
      .min(2, t('name-must-be-at-least-2-characters'))
      .max(20, t('name-cannot-exceed-10-characters')),
    image: z
      .instanceof(File, { message: t('image-is-required') })
      .refine((file) => file.size > 0, { message: t('image-cannot-be-empty') })
      .refine((file) => ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(file.type), {
        message: t('only-jpeg-png-and-gif-images-are-allowed'),
      })
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: t('image-size-must-be-less-than-5mb'),
      }),
  });

  return { addSchema };
};

export type AddNewOccasion = z.infer<ReturnType<typeof useAddOccasion>['addSchema']>;
