export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  option: string;
  quantity: number;
  price: number;
  canWriteReview: boolean;
  hasReview: boolean;
  reviewId?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  orderDate: Date;
  status: 'in_progress' | 'confirmed' | 'failed';
  progressRate: number;
  totalAmount: number;
  shippingFee: number;
  items: OrderItem[];
  canRefund: boolean;
  canTrackDelivery: boolean;
  // 추가된 필드들
  deliveryStatus: 'preparing' | 'shipping' | 'delivered' | 'completed';
  refundDeadline: Date; // 환불 마감일
}

export interface OrderStatusSummary {
  inProgress: number;
  confirmed: number;
  failed?: number;
}

export type OrderStatusFilter = 'all' | 'in_progress' | 'confirmed' | 'failed';
