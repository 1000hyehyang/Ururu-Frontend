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
  canRefundOthers: boolean; // 기타 사유 환불 가능 여부
  canTrackDelivery: boolean;
  isGroupBuy: boolean; // 공구 상품 여부
  trackingNumber?: string; // 운송장번호
  // 추가된 필드들
  deliveryStatus: 'preparing' | 'shipping' | 'delivered' | 'completed';
  // 환불 관련 필드 추가
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

// API 응답 타입들
export interface ApiOrderItem {
  groupbuyOptionId: number;
  productOptionId: number;
  status: 'OPEN' | 'SUCCESS' | 'FAIL';
  rate: number;
  optionImage: string;
  productName: string;
  optionName: string;
  quantity: number;
  price: number;
}

export interface ApiOrder {
  orderId: string;
  createdAt: string;
  trackingNumber?: string;
  totalAmount: number;
  canRefundChangeOfMind: boolean;
  canRefundOthers: boolean;
  refundType?: 'CHANGE_OF_MIND' | 'DEFECTIVE_PRODUCT' | 'DELIVERY_ISSUE' | 'OTHER';
  refundReason?: string;
  orderItems: ApiOrderItem[];
}

export interface ApiOrdersResponse {
  inProgress: number;
  confirmed: number;
  refundPending: number;
  orders: ApiOrder[];
  page: number;
  size: number;
  total: number;
}

export interface ApiOrdersParams {
  status?: 'all' | 'in_progress' | 'confirmed' | 'refund_pending';
  page?: number;
  size?: number;
}
