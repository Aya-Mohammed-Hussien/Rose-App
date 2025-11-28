export interface Category {
  name: string;
  slug: string;
  image: string;
  isSuperAdmin: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesResponse {
  message: string;
  metadata: CategoriesMetadata;
  categories: Category[];
}

export interface DuplicateErrorResponse {
  error?: string;
  message?: string;
}

export interface CategoryData {
  _id: string;
  name: string;
  slug: string;
  image: string;
  isSuperAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateCategoryResponse {
  message: string;
  category: CategoryData;
}

export type AddCategoryResponse = CategoryResponse | DuplicateErrorResponse | string;
