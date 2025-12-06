export type Occasion = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  isSuperAdmin: boolean;
  productsCount: number;
  selected?: boolean;
  disabled?: boolean;
  onToggle?: (id: string) => void;
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

export type OccasionListProps = {
  occasions: Occasion[];
};

export type OccasionCardProps = {
  occasion: Occasion;
  selected?: boolean;
  disabled?: boolean;
  onToggle?: (id: string) => void;
};
