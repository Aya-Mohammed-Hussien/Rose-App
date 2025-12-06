import { getTranslations } from 'next-intl/server';
import UpdateProductForm from './_components/update-product-form';
import { getProductDetails } from '@/lib/apis/products/product-details.api';

type ProductProps = {
  params: { id: string };
};

export default async function UpdateProductPage({ params: { id } }: ProductProps) {
  // Translation
  const t = await getTranslations('dashboard.product_form');

  // Fetch specific product details
  const product = await getProductDetails(id);

  return (
    <div className="bg-zinc-50 pt-7 pe-[1.875rem] ps-4 pb-[4.875rem]">
      {/* Add new product title */}
      <h3 className="text-2xl font-inter font-semibold text-zinc-800 mb-6 line-clamp-1 w-[59.8125rem]">
        {t('update_product')} :

        {/* Product title & description */}
        {product.product.title}, {product.product.description}
      </h3>

      {/* Update new product form */}
      <UpdateProductForm product={product.product} />
    </div>
  );
}
