import { getTranslations } from 'next-intl/server';
import { getProductDetails } from '@/lib/apis/products/product-details.api';
import ProductGallery from '@/components/features/product-details/product-gallery';

type PageProps = {
  params: { id: string };
};

export default async function ProductGalleryPage({ params: { id } }: PageProps) {
  const t = await getTranslations('dashboard.product_form');
  const { product } = await getProductDetails(id);

  const coverImage = product.imgCover || '';
  const images = product.images || [];

  return (
    <div className="bg-zinc-50 pt-7 pe-[1.875rem] ps-4 pb-[4.875rem]">
      <h3 className="text-2xl font-inter font-semibold text-zinc-800 mb-6">
        {t('View_product_gallery')}: {product.title}
      </h3>
      <div className="bg-white rounded-2xl p-6 w-full max-w-4xl">
        {coverImage || images.length > 0 ? (
          <ProductGallery
            coverImage={coverImage}
            images={images}
            title={product.title}
          />
        ) : (
          <p className="text-zinc-500 py-8 text-center">{t('View_product_gallery')}</p>
        )}
      </div>
    </div>
  );
}
