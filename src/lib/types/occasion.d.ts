export type Occasion = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  isSuperAdmin: boolean;
  productsCount: number;
};

export type Metadata = {
  currentPage: number;
  limit: number;
  totalPages: number;
  totalItems: number;
};

export type OccasionsApiResponse = {
  message: string;
  metadata: Metadata;
  occasions: Occasion[];
};
