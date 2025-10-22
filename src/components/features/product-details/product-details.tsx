import { Product } from '@/lib/types/product';
import { Package, Star } from 'lucide-react';
import AddToWishlistButton from './add-to-wishlist-button';
import AddToCartButton from './add-to-cart-button';

// props
type ProductDetailsProps = {
  product: Product;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  // variables
  const hasDiscount =
    product.priceAfterDiscount !== undefined && product.priceAfterDiscount < product.price;

  return (
    // Product Details Section
    <section className="w-1/2">
      {/* Product Title */}
      <h2 className="font-semibold text-3xl text-zinc-800 dark:text-zinc-50 mb-2">
        {product.title}
      </h2>

      {/* Price & In Stock */}
      <div className="flex gap-3.5 pb-4 border-b border-zinc-100 dark:border-zinc-700">
        {/* Product Price */}
        <div className="flex gap-1.5">
          {/* Product Price Before Discount*/}
          {hasDiscount && (
            <span className="text-3xl font-bold text-zinc-300 dark:text-zinc-500 line-through">
              {product.price}
            </span>
          )}

          {/* Product Price After Discount*/}
          <span className="text-3xl font-bold text-zinc-800 dark:text-zinc-50">
            {hasDiscount ? product.priceAfterDiscount : product.price}
            <span className="text-3xl font-semibold text-zinc-800 dark:text-zinc-50">EGP</span>
          </span>
        </div>

        {/* Left in stock */}
        <div className="flex gap-x-1.5 bg-zinc-100 dark:bg-zinc-700 py-1.5 px-3 rounded-2xl items-center">
          <Package size={20} className="text-zinc-600 dark:text-zinc-400" />
          <span className="text-zinc-800 text-sm font-medium dark:text-zinc-50 ">
            {product.quantity > 0 ? `${product.quantity} Left in stock` : `Out of stock`}
          </span>
        </div>
      </div>

      {/* Rating */}
      <div className="flex gap-1.5 py-4 border-b border-zinc-100 dark:border-zinc-700">
        {/* Star Icon */}
        <Star size={20} className="text-[#ffa508] fill-[#ffa508]" />

        {/* Rating */}
        <span className="text-black dark:text-zinc-50 capitalize font-normal text-base">
          Rating:{' '}
        </span>
        <span className="text-black dark:text-zinc-50 font-medium text-base">
          {product.rateAvg}/5
        </span>

        {/* Rate count */}
        <span className="text-blue-600 dark:text-blue-400 font-medium text-base">
          ({product.rateCount} ratings)
        </span>
      </div>

      {/* Description */}
      <div className="mb-4 h-[19.1875rem] overflow-auto text-zinc-600 text-base font-normal dark:text-zinc-400 pt-4">
        {product.description}
      </div>

      {/* Add to cart & Add to wishlist */}
      <div className="flex items-center gap-2.5">
        {/* Add to wishlist */}
        <AddToWishlistButton />

        {/* Add to cart */}
        <AddToCartButton product={product} />
      </div>
    </section>
  );
}
