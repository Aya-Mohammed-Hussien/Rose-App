// Base interface for all product types (shared fields)
export interface BaseProduct {
  _id: string;
  title: string;
  imgCover: string;
  price: number;
  priceAfterDiscount?: number;
  discount?: number;
  rateAvg: number;
  rateCount: number;
}

// Full product type (used in product listing or details pages)
export interface Product extends BaseProduct {
  slug: string;
  description: string;
  images: string[];
  quantity: number;
  category: string;
  occasion: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isSuperAdmin: boolean;
  sold: number;
  favoriteId: string | null;
  isInWishlist: boolean;
}

// Simplified product type (used for recommendations or related products)
export interface RelatedProduct extends BaseProduct {
  id: string;
}

// Pagination and metadata for product responses
export interface ProductsMetadata {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalItems: number;
}

// API response for fetching products by occasion
export interface ProductsByOccasionResponse {
  message: string;
  metadata: ProductsMetadata;
  products: Product[];
}

// API response for fetching a single product’s details
export interface ProductDetailsResponse {
  message: string;
  product: Product;
}
