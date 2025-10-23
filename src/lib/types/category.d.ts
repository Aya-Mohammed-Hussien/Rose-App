export type Category = {
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

export type CategoryApiResponse = {
  message: string;
  metadata: Metadata;
  occasions: Category[];
};
