export type OrdersByStatus = {
  _id: string | null;
  count: number;
};

export type DailyRevenue = {
  _id: string;
  revenue: number;
  count: number;
};

export type MonthlyRevenue = {
  _id: string;
  revenue: number;
  count: number;
};

export type Statistics = {
  ordersByStatus: OrdersByStatus[];
  dailyRevenue: DailyRevenue[];
  monthlyRevenue: MonthlyRevenue[];
};

export type GetOrderStatisticsResponse = {
  message: string;
  statistics: Statistics;
};
