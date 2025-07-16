export interface RefundItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  option: string;
  quantity: number;
  price: number;
  refundAmount: number;
}

export type RefundType =
  | 'CHANGE_OF_MIND'
  | 'DEFECTIVE_PRODUCT'
  | 'DELIVERY_ISSUE'
  | 'GROUPBUY_FAIL'
  | 'OTHER';
export type RefundStatus = 'APPROVED' | 'COMPLETED' | 'REJECTED' | 'FAILED';
export type RefundScope = 'FULL_ORDER' | 'INDIVIDUAL_GROUP_BUY'; // 전체 주문 환불 vs 개별 공구 환불

export interface Refund {
  id: string;
  paymentId: string; // FK → Payment.id
  refundNumber: string;
  type: RefundType;
  reason: string;
  amount: number; // 환불 금액
  status: RefundStatus;
  rejectReason?: string; // 거부 사유
  refundedAt?: Date; // 환불 완료일
  createdAt: Date;
  updatedAt: Date;

  // 프론트엔드 추가 필드
  scope: RefundScope; // 전체 주문 환불 vs 개별 공구 환불
  items: RefundItem[]; // 환불 상품 목록
  estimatedCompletionDate?: Date; // 예상 완료일
}

export interface RefundStatusSummary {
  approved: number;
  completed: number;
  rejected: number;
  failed: number;
}

export type RefundStatusFilter = 'all' | 'APPROVED' | 'COMPLETED' | 'REJECTED' | 'FAILED';

export type RefundTypeFilter =
  | 'all'
  | 'CHANGE_OF_MIND'
  | 'DEFECTIVE_PRODUCT'
  | 'DELIVERY_ISSUE'
  | 'GROUPBUY_FAIL'
  | 'OTHER';

// API 응답 타입들
export interface ApiRefundItem {
  groupbuyOptionId: number;
  productOptionId: number;
  optionImage: string;
  productName: string;
  optionName: string;
  quantity: number;
  price: number;
}

export interface ApiRefund {
  refundId: string;
  createdAt: string;
  type: 'GROUPBUY_FAILED' | 'CHANGE_OF_MIND' | 'DEFECTIVE_PRODUCT' | 'DELIVERY_ISSUE' | 'OTHER';
  reason: string;
  status: 'APPROVED' | 'REJECTED' | 'PENDING';
  rejectionReason?: string; // API에서는 rejectionReason로 옴
  refundAt?: string; // API에서는 refundAt로 옴
  totalAmount: number;
  refundItems: ApiRefundItem[];
}

export interface ApiRefundsResponse {
  refunds: ApiRefund[];
  page: number;
  size: number;
  total: number;
}

export interface ApiRefundsParams {
  status?: 'all' | 'APPROVED' | 'COMPLETED' | 'REJECTED' | 'FAILED' | 'PENDING';
  page?: number;
  size?: number;
}

export const getRefundTypeLabel = (type: RefundType): string => {
  switch (type) {
    case 'CHANGE_OF_MIND':
      return '단순 변심';
    case 'DEFECTIVE_PRODUCT':
      return '불량품';
    case 'DELIVERY_ISSUE':
      return '배송 문제';
    case 'GROUPBUY_FAIL':
      return '공구 실패';
    case 'OTHER':
      return '기타';
    default:
      return '기타';
  }
};

export const getRefundStatusLabel = (status: RefundStatus): string => {
  switch (status) {
    case 'APPROVED':
      return '환불 승인';
    case 'COMPLETED':
      return '환불 완료';
    case 'REJECTED':
      return '환불 거절';
    case 'FAILED':
      return '환불 실패';
    default:
      return '알 수 없음';
  }
};
