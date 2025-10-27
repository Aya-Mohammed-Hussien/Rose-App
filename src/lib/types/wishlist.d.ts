// export type WishlistErrorResponse = {
//   error: string;
// };

export type WishlistResponse = {
  message: string;
  wishlist?: {
    _id: string;
    user: string;
    products: {
      _id: string;
      title: string;
      imgCover: string;
      price: number;
      priceAfterDiscount: number;
      rateAvg: number;
      id: string;
    }[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
};

export type AddToWishlistPayload = {
  productId: string;
};
