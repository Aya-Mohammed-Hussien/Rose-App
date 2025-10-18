export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: string[];
  price: number;
  priceAfterDiscount?: number;
  discount?: number;
  quantity: number;
  category: string;
  occasion: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isSuperAdmin: boolean;
  sold: number;
  rateAvg: number;
  rateCount: number;
  favoriteId: string | null;
  isInWishlist: boolean;
}

export interface ProductsMetadata {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalItems: number;
}

export interface ProductsByOccasionResponse {
  message: string;
  metadata: ProductsMetadata;
  products: Product[];
}
