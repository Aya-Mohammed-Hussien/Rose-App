// Overall Statistics
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

// Product
export interface Product {
  title: string;
  price: number;
  imgCover: string;
  quantity: number;
  sold?: number;
}

// Product by category
export interface ProductsByCategory {
  _id: string;
  count: number;
  category: string;
  products: Product[];
}

// Top selling product
export interface TopSellingProduct {
  _id: string;
  title: string;
  imgCover: string;
  price: number;
  sold: number;
  id: string;
}

// Low stock product
export interface LowStockProduct {
  _id: string;
  title: string;
  imgCover: string;
  price: number;
  quantity: number;
  id: string;
}

// Orders Status
export interface OrdersByStatus {
  _id: string;
  count: number;
}

// Daily Revenue
export interface OrderDailyRevenue {
  _id: string;
  revenue: number;
  count: number;
}

// Monthly Revenue
export interface OrderMonthlyRevenue {
  _id: string;
  revenue: number;
  count: number;
}

// Orders Stats
export interface OrdersStats {
  ordersByStatus: OrdersByStatus[];
  dailyRevenue: OrderDailyRevenue[];
  monthlyRevenue: OrderMonthlyRevenue[];
}

// FINAL Statistics Data
export interface StatisticsData {
  productsByCategory: ProductsByCategory[];
  topSellingProducts: TopSellingProduct[];
  lowStockProducts: LowStockProduct[];
}

// FINAL Response
export interface StatisticsResponse {
  message: string;
  statistics: StatisticsData;
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
