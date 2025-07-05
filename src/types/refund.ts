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

export type RefundType = 'CHANGE_OF_MIND' | 'DEFECTIVE_PRODUCT' | 'DELIVERY_ISSUE' | 'OTHER';
export type RefundStatus = 'COMPLETED' | 'REJECTED'; // 신청됨/실패/승인 제거
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
  completed: number;
  rejected: number;
}

export type RefundStatusFilter = 'all' | 'COMPLETED' | 'REJECTED';

export type RefundTypeFilter =
  | 'all'
  | 'CHANGE_OF_MIND'
  | 'DEFECTIVE_PRODUCT'
  | 'DELIVERY_ISSUE'
  | 'OTHER';

export const getRefundTypeLabel = (type: RefundType): string => {
  switch (type) {
    case 'CHANGE_OF_MIND':
      return '단순 변심';
    case 'DEFECTIVE_PRODUCT':
      return '하자/오배송';
    case 'DELIVERY_ISSUE':
      return '배송 문제';
    case 'OTHER':
      return '기타';
    default:
      return '기타';
  }
};

export const getRefundStatusLabel = (status: RefundStatus): string => {
  switch (status) {
    case 'COMPLETED':
      return '환불 완료';
    case 'REJECTED':
      return '환불 거절';
    default:
      return '알 수 없음';
  }
};
