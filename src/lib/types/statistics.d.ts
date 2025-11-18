export interface OverallStatistics {
  totalProducts: number;
  totalOrders: number;
  totalCategories: number;
  totalRevenue: number;
}

// Category
export interface Category {
  _id: string;
  name: string;
  totalProducts: number;
  totalRevenue: number;
}

// Overall Statistics Response
export interface OverallStatisticsResponse {
  message: string;
  statistics: OverallStatistics;
}

// All Categories statistics Response
export interface CategoriesStatisticsResponse {
  message: string;
  statistics: Category[];
}
