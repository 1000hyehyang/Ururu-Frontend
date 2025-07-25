import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// 포인트 관련 변환 함수들
import {
  PointTransactionResponse,
  PointHistoryItem,
  GroupedPointHistory,
  PointHistoryType,
} from '@/types/point';

// 주문 관련 변환 함수들
import { ApiOrder, ApiOrderItem, Order, OrderItem } from '@/types/order';

// 환불 관련 변환 함수들
import {
  ApiRefund,
  ApiRefundItem,
  Refund,
  RefundItem,
  RefundType,
  RefundStatus,
} from '@/types/refund';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// source를 한국어로 변환
function getSourceLabel(source: string): string {
  const sourceMap: Record<string, string> = {
    GROUPBUY: '공동 구매',
    REVIEW: '리뷰',
    INVITE: '초대',
    ADMIN: '관리자',
    REFUND: '환불',
  };
  return sourceMap[source] || source;
}

// API 타입을 UI 타입으로 변환
export function convertPointTransaction(transaction: PointTransactionResponse): PointHistoryItem {
  const sourceLabel = getSourceLabel(transaction.source);
  const typeLabel = transaction.type === 'USED' ? '사용' : '적립';

  return {
    id: transaction.id.toString(),
    date: new Date(transaction.createdAt)
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\. /g, '.')
      .replace(/\.$/, ''),
    type: typeLabel as PointHistoryType,
    title: `${sourceLabel} ${typeLabel}`,
    description: transaction.reason,
    amount: transaction.type === 'USED' ? -transaction.amount : transaction.amount,
  };
}

// 포인트 내역을 날짜별로 그룹핑
export function groupPointHistoryByDate(
  transactions: PointTransactionResponse[],
): GroupedPointHistory[] {
  const grouped = transactions.reduce(
    (acc, transaction) => {
      const item = convertPointTransaction(transaction);
      const date = item.date;

      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    },
    {} as Record<string, PointHistoryItem[]>,
  );

  return Object.entries(grouped)
    .sort(([a], [b]) => b.localeCompare(a)) // 최신 날짜 먼저
    .map(([date, items]) => ({ date, items }));
}

// API 주문 아이템을 UI 타입으로 변환
export function convertOrderItem(apiItem: ApiOrderItem): OrderItem {
  return {
    id: `${apiItem.groupbuyOptionId}-${apiItem.productOptionId}`,
    productId: apiItem.productOptionId.toString(),
    productName: apiItem.productName,
    productImage: apiItem.optionImage,
    option: apiItem.optionName,
    quantity: apiItem.quantity,
    price: apiItem.price,
    canWriteReview: apiItem.status === 'SUCCESS', // 성공한 주문만 리뷰 작성 가능
    hasReview: false, // API에서 제공되지 않으므로 기본값
    reviewId: undefined,
  };
}

// orderItems의 status들로 주문 전체 상태 판단
export function determineOrderStatus(
  orderItems: ApiOrderItem[],
  hasRefundInfo: boolean,
): Order['status'] {
  if (hasRefundInfo) {
    return 'refund_pending';
  }

  const statuses = orderItems.map((item) => item.status);

  // SUCCESS나 FAIL 모두 확정으로 처리 (FAIL은 공구실패지만 실제로는 없을 예정)
  if (statuses.every((status) => status === 'SUCCESS' || status === 'FAIL')) {
    return 'confirmed';
  } else {
    return 'in_progress'; // OPEN이 하나라도 있으면 진행중
  }
}

// API 주문을 UI 타입으로 변환
export function convertOrder(apiOrder: ApiOrder): Order {
  const hasRefundInfo = !!(apiOrder.refundType || apiOrder.refundReason);
  const items = apiOrder.orderItems.map(convertOrderItem);

  // progressRate는 아이템들의 rate 평균으로 계산
  const averageRate =
    apiOrder.orderItems.length > 0
      ? apiOrder.orderItems.reduce((sum, item) => sum + item.rate, 0) / apiOrder.orderItems.length
      : 0;

  // 공구 상품인지 판단 (groupbuyOptionId가 0이 아니면 공구)
  const isGroupBuy = apiOrder.orderItems.some((item) => item.groupbuyOptionId !== 0);

  return {
    id: apiOrder.orderId,
    orderNumber: apiOrder.orderId, // UUID 그대로 사용
    orderDate: new Date(apiOrder.createdAt),
    status: determineOrderStatus(apiOrder.orderItems, hasRefundInfo),
    progressRate: averageRate,
    totalAmount: apiOrder.totalAmount, // API 값 그대로 사용 (할인 적용된 실제 결제 금액)
    shippingFee: 0, // API에서 제공되지 않으므로 기본값
    items,
    canRefund: apiOrder.canRefundOthers,
    canRefundOthers: apiOrder.canRefundOthers,
    canTrackDelivery: !!apiOrder.trackingNumber,
    isGroupBuy, // 공구 상품 여부
    trackingNumber: apiOrder.trackingNumber,
    deliveryStatus: 'preparing', // API에서 제공되지 않으므로 기본값
    refundReason: apiOrder.refundReason,
    refundType: apiOrder.refundType,
  };
}

// API 환불 아이템을 UI 타입으로 변환
export function convertRefundItem(apiItem: ApiRefundItem): RefundItem {
  return {
    id: `${apiItem.groupbuyOptionId}-${apiItem.productOptionId}`,
    productId: apiItem.productOptionId.toString(),
    productName: apiItem.productName,
    productImage: apiItem.optionImage,
    option: apiItem.optionName,
    quantity: apiItem.quantity,
    price: apiItem.price,
    refundAmount: apiItem.price, // API에서 제공되지 않으므로 price와 동일하게 설정
  };
}

// API 환불 타입을 UI 타입으로 변환
function convertRefundType(apiType: string): RefundType {
  const typeMap: Record<string, RefundType> = {
    GROUPBUY_FAILED: 'GROUPBUY_FAIL', // API에서는 GROUPBUY_FAILED로 옴
    CHANGE_OF_MIND: 'CHANGE_OF_MIND',
    DEFECTIVE_PRODUCT: 'DEFECTIVE_PRODUCT',
    DELIVERY_ISSUE: 'DELIVERY_ISSUE',
    OTHER: 'OTHER',
  };

  return typeMap[apiType] || 'OTHER';
}

// API 환불 상태를 UI 상태로 변환
function convertRefundStatus(apiStatus: string): RefundStatus {
  const statusMap: Record<string, RefundStatus> = {
    APPROVED: 'APPROVED',
    COMPLETED: 'COMPLETED',
    REJECTED: 'REJECTED',
    FAILED: 'FAILED',
    PENDING: 'APPROVED', // 대기중은 승인으로 처리
  };
  return statusMap[apiStatus] || 'APPROVED';
}

// API 환불을 UI 타입으로 변환
export function convertRefund(apiRefund: ApiRefund): Refund {
  const items = apiRefund.refundItems.map(convertRefundItem);

  return {
    id: apiRefund.refundId,
    paymentId: apiRefund.refundId, // API에서 제공되지 않으므로 refundId로 대체
    refundNumber: apiRefund.refundId, // API에서 제공되지 않으므로 refundId로 대체
    type: convertRefundType(apiRefund.type),
    reason: apiRefund.reason,
    amount: apiRefund.totalAmount,
    status: convertRefundStatus(apiRefund.status),
    rejectReason: apiRefund.rejectionReason, // API 필드명 수정
    refundedAt: apiRefund.refundAt ? new Date(apiRefund.refundAt) : undefined, // API 필드명 수정
    createdAt: new Date(apiRefund.createdAt),
    updatedAt: new Date(apiRefund.createdAt), // API에서 제공되지 않으므로 createdAt으로 대체
    scope: 'INDIVIDUAL_GROUP_BUY', // API에서 제공되지 않으므로 기본값
    items,
    estimatedCompletionDate: undefined, // API에서 제공되지 않으므로 기본값
  };
}
