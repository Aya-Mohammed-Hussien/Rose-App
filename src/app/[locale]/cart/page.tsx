// ===============================================================
// Server Component
// Renders the cart page with the user's cart and recommended products.

import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { getRecommendedProducts } from '@/lib/apis/cart/prouducts-you-may-like.api';
import CartList from './_components/cart-list';
import TitleProduct from '@/components/shared/products-section-title';
import ProductCarousel from '@/components/features/product-carousel/product-carousel';

// ===============================================================
// Functions
export default async function CartPage() {
  // --- Get current user session ---
  const session = await getServerSession(authOptions);
  const userId = session?.user?._id;

  // --- Fetch recommended products for the user ---
  const recommended = userId ? await getRecommendedProducts(userId) : [];
  const hasRecommendations = recommended && recommended.length > 0;

  // --- Render main page layout ---
  return (
    <main className="container mx-auto flex flex-col gap-12 px-6 md:px-20 py-8">
      {/* Cart list section */}
      <CartList />

      {/* Recommended products section (if available) */}
      {hasRecommendations && (
        <section>
          <TitleProduct title="productsYouMayLike" />
          <ProductCarousel products={recommended} itemsPerView={4} />
        </section>
      )}
    </main>
  );
}
