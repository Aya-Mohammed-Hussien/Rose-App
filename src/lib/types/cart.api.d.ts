import { Product } from './product';

export type CartItem = {
  _id: string;
  product: Product;
  price: number;
  quantity: number;
};

export type Coupon = {
  _id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
};

export type AppliedCoupon = {
  _id: string;
  coupon: Coupon;
  discountAmount: number;
  appliedAt: string;
};

export type Cart = {
  _id: string;
  user: string;
  cartItems: CartItem[];
  appliedCoupons: AppliedCoupon[];
  totalPrice: number;
  discount?: number;
  totalPriceAfterDiscount?: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type getCartResponse = {
  message: string;
  numOfCartItems: number;
  cart: Cart;
};
