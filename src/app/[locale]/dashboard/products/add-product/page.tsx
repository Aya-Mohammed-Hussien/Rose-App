import { getTranslations } from 'next-intl/server';
import AddNewProductForm from './_components/add-new-product-form';

export default async function AddProductPage() {
  // Translation
  const t = await getTranslations('dashboard');

  return (
    <div className='bg-zinc-50  pt-7 pe-[1.875rem] ps-4 pb-[4.875rem]'>
      {/* Add new product title */}
      <h3 className="text-2xl font-inter font-semibold text-zinc-800 mb-6">{t('add_a_new_product')}</h3>

      {/* Add new product form */}
      <AddNewProductForm/>
    </div>
  );
}
