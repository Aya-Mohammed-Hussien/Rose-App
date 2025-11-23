export type GetOrdersResponse = GetOrdersSuccessResponse | GetOrdersErrorResponse;

export interface GetOrdersSuccessResponse {
  message?: string;
  metadata: OrdersPaginationMeta;
  orders: Order[];
}

export interface GetOrdersErrorResponse {
  error: string;
  message?: string;
}

export interface OrdersPaginationMeta {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalItems: number;
}

export type OrderState = 'pending' | 'processing' | 'delivered' | 'cancelled';
export type PaymentType = 'cash' | 'card' | 'online';

export interface Order {
  _id: string;
  user: string;
  orderItems: OrderItem[];
  totalPrice: number;
  paymentType: PaymentType;
  isPaid: boolean;
  isDelivered: boolean;
  state: OrderState;
  createdAt: string;
  updatedAt: string;
  orderNumber: string;
}

export interface OrderItem {
  _id: string;
  product: OrderProduct;
  price: number;
  quantity: number;
}

export interface OrderProduct {
  _id: string;
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: string[];
  price: number;
  priceAfterDiscount: number;
  quantity: number;
  category: string;
  occasion: string;
  sold: number;
  rateAvg: number;
  rateCount: number;
}
