// ===============================================================
// Server Component
// Renders the cart page with the user's cart and recommended products.

import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { getRecommendedProducts } from '@/lib/apis/cart/prouducts-you-may-like.api';
import CartList from './_components/cart-list';
import TitleProduct from '@/components/shared/products-section-title';
import ProductCarousel from '@/components/features/product-carousel/product-carousel';
import { Product } from '@/lib/types/product';
import { getCart } from '@/lib/apis/cart/cart-summary.api';
import type { getCartResponse } from '@/lib/types/cart.api';
import Header from '@/components/layout/header/header';

// ===============================================================
// Functions
export default async function CartPage() {
  try {
    // Cart API
    const cartData = await getCart();
    // --- Get current user session ---
    const session = await getServerSession(authOptions);
    const userId = session?.user?._id;

    // --- Fetch recommended products for the user ---
    let recommended: Product[] = [];
    if (userId) {
      try {
        recommended = await getRecommendedProducts(userId);
      } catch (error) {
        // If fetching recommendations fails, continue without them
        console.error('Error fetching recommended products:', error);
        recommended = [];
      }
    }
    const hasRecommendations = recommended && recommended.length > 0;

    // --- Render main page layout ---
    return (
      <>
        <Header />

        <main className="container mx-auto flex flex-col gap-8 sm:gap-10 lg:gap-12 px-4 sm:px-6 lg:px-20 py-4 sm:py-6 lg:py-8">
          {/* Cart list section */}
          <CartList cartData={cartData} />

          {/* Recommended products section (if available) */}
          {hasRecommendations && (
            <section className="px-2 sm:px-0">
              <TitleProduct title="ProductsYouMayLike" />
              <ProductCarousel products={recommended} itemsPerView={4} />
            </section>
          )}
        </main>
      </>
    );
  } catch (error) {
    // Log error for debugging
    console.error('Error loading cart page:', error);

    // Fallback to an empty cart structure so the page can still render
    const emptyCartData: getCartResponse = {
      message: 'Failed to load cart',
      numOfCartItems: 0,
      cart: {
        _id: '',
        user: '',
        cartItems: [],
        appliedCoupons: [],
        totalPrice: 0,
        createdAt: '',
        updatedAt: '',
        __v: 0,
      },
    };

    return (
      <>
        <Header />

        <main className="container mx-auto flex flex-col gap-8 sm:gap-10 lg:gap-12 px-4 sm:px-6 lg:px-20 py-4 sm:py-6 lg:py-8">
          <CartList cartData={emptyCartData} />
        </main>
      </>
    );
  }
}
