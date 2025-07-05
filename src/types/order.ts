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
  status: 'in_progress' | 'confirmed' | 'failed' | 'refund_pending';
  progressRate: number;
  totalAmount: number;
  shippingFee: number;
  items: OrderItem[];
  canRefund: boolean;
  canTrackDelivery: boolean;
  // 추가된 필드들
  deliveryStatus: 'preparing' | 'shipping' | 'delivered' | 'completed';
  refundDeadline: Date; // 취소 마감일
  // 환불 관련 필드 추가
  refundRequestDate?: Date; // 환불 신청일
  refundReason?: string; // 환불 사유
  refundType?: 'CHANGE_OF_MIND' | 'DEFECTIVE_PRODUCT' | 'DELIVERY_ISSUE' | 'OTHER';
}

export interface OrderStatusSummary {
  inProgress: number;
  confirmed: number;
  refundPending: number; // 환불 대기중 추가
  // failed?: number; // 실패한 주문은 주문/배송 조회에서 제외
}

export type OrderStatusFilter = 'all' | 'in_progress' | 'confirmed' | 'refund_pending';
