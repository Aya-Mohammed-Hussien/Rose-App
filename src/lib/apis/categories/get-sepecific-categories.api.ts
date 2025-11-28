export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  isSuperAdmin: boolean;
  productsCount: number;
}

export interface CategoriesMetadata {
  currentPage: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}

export interface CategoriesResponse {
  message: string;
  metadata: CategoriesMetadata;
  categories: Category[];
}

export interface CategoryResponse {
  message: string;
  category: Category;
}

export interface ErrorResponse {
  message: string;
}

export async function getSpacificCategory(categoryId: string) {
  try {
    const res = await fetch(`https://flower.elevateegy.com/api/v1/categories/${categoryId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },

      next: { tags: ['category'] },
    });
    // If API returned error (e.g. 400 / 500)
    if (!res.ok) {
      let errorData: ErrorResponse | null = null;

      try {
        errorData = await res.json();
      } catch {
        // JSON parsing failed → raw text error
      }

      throw new Error(errorData?.message || 'Failed to fetch category');
    }

    // Success response
    const data: CategoryResponse = await res.json();
    return data;
  } catch (err: any) {
    // Fallback error handler
    return {
      data: null,
      error: err?.message || 'Unknown error occurred',
    };
  }
}
