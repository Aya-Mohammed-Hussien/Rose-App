type WishlistProduct = {
  _id: string;
  user: string;
  products: {
    _id: string;
    title: string;
    imgCover: string;
    price: number;
    priceAfterDiscount?: number;
    rateAvg: number;
    id: string;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type GetWishlistResponse = {
  message: string;
  count: number;
  wishlist: WishlistProduct;
};

export type WishlistResponse = {
  message: string;
  wishlist?: WishlistProduct;
};

export type AddToWishlistPayload = {
  productId: string;
};
