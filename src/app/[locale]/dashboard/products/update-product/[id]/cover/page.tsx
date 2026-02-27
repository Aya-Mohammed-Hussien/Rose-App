import { getTranslations } from 'next-intl/server';
import { getProductDetails } from '@/lib/apis/products/product-details.api';
import Image from 'next/image';

type PageProps = {
  params: { id: string };
};

export default async function ProductCoverPage({ params: { id } }: PageProps) {
  const t = await getTranslations('dashboard.product_form');
  const { product } = await getProductDetails(id);

  return (
    <div className="bg-zinc-50 pt-7 pe-[1.875rem] ps-4 pb-[4.875rem]">
      <h3 className="text-2xl font-inter font-semibold text-zinc-800 mb-6">
        {t('View_product_cover')}: {product.title}
      </h3>
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl overflow-hidden">
        {product.imgCover ? (
          <div className="relative w-full aspect-[4/3] max-h-[500px] rounded-xl overflow-hidden">
            <Image
              src={product.imgCover}
              alt={`${product.title} - cover`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 672px"
            />
          </div>
        ) : (
          <p className="text-zinc-500 py-8 text-center">{t('View_product_cover')}</p>
        )}
      </div>
    </div>
  );
}
