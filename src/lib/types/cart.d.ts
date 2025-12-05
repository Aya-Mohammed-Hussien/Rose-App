// Cart item after being processed by the hook
export type CartItemFromHook = {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewsCount: number;
  price: number;
  quantity: number;
};

// Array of cart items
export type CartItemsArray = CartItemFromHook[];

// Optional: type for API response before processing in the hook
export type CartResponse = {
  cart: {
    cartItems: {
      product: {
        _id: string;
        title: string;
        imgCover: string;
        rateAvg?: number;
        rateCount?: number;
      };
      price: number;
      quantity: number;
    }[];
  };
};
