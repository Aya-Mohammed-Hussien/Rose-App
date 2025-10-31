export interface ApiResponse {
  message: string;
  metadata: Metadata;
  reviews: Review[];
}

export interface Metadata {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalItems: number;
}

export interface Review {
  _id: string;
  product: ProductSummary;
  user: UserSummary;
  rating: number;
  title: string;
  comment: string;
  status: 'pending' | 'approved' | 'rejected' | string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface ProductSummary {
  _id: string;
  title: string;
  imgCover?: string | null;
  id?: string;
}

export interface UserSummary {
  _id: string;
  firstName?: string;
  lastName?: string;
  photo?: string | null;
}
