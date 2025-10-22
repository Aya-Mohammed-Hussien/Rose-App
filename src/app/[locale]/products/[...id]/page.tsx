import ProductDetails from '@/components/features/product-details/product-details';
import ProductGallery from '@/components/features/product-details/product-gallery';
import { getProductDetails } from '@/lib/apis/products/product-details.api';

type ProductProps = {
  params: { id: string[] };
};

export default async function page({ params: { id } }: ProductProps) {
  // If no ProductProps found
  if (!id || id.length < 2) {
    return <div>Product not found</div>;
  }

  // Variables
  const slug = id[0];
  const productId = id[1];
  // console.log('URL Segments:', { slug, productId });

  // Function
  const productDetails = await getProductDetails(productId);
 

  return (
    <div className="px-20 pt-[4.25rem] dark:bg-zinc-800 min-h-screen">
      <div className="flex gap-[4.375rem] min-h-[32.6875rem] items-end">
        {/* Product Gallery */}
        <ProductGallery
          images={productDetails.product.images}
          title={productDetails.product.title}
          coverImage={productDetails.product.imgCover}
        />

        {/* Product Details */}
        <ProductDetails product={productDetails.product} />
      </div>
    </div>
  );
}
