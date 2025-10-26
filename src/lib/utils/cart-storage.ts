import { Product } from '@/lib/types/product';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imgCover: string;
  rateAvg: number;
  rateCount: number;
  quantity: number;
};

export function productToCartItem(product: Product): CartItem {
  return {
    id: product._id,
    title: product.title,
    price: product.priceAfterDiscount ?? product.price,
    imgCover: product.imgCover,
    rateAvg: product.rateAvg,
    rateCount: product.rateCount,
    quantity: 1,
  };
}

const localStorageCartKey = 'guestCart';

//  Get products from localStorage
export function getGuestCart(): CartItem[] {
  const data = localStorage.getItem(localStorageCartKey);
  return data ? (JSON.parse(data) as CartItem[]) : [];
}

//  Save products to localStorage
export function saveGuestCart(items: CartItem[]) {
  localStorage.setItem(localStorageCartKey, JSON.stringify(items));
}

//  Add a new product or update its quantity
export function addItemToGuestCart(newItem: CartItem) {
  // Check if the product is already in the cart then  we increase its quantity
  const items = getGuestCart();
  const existingItem = items.find((item) => item.id === newItem.id);

  if (existingItem) {
    existingItem.quantity += newItem.quantity;
  } else {
    items.push(newItem);
  }

  saveGuestCart(items);
}

// Removing item from guest cart
export function removeItemFromGuestCart(id: string) {
  const items = getGuestCart().filter((item) => item.id !== id);
  saveGuestCart(items);
}

// Removing all products from guest cart
export function clearGuestCart() {
  localStorage.removeItem(localStorageCartKey);
}
