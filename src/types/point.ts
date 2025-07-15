// 포인트 적립/사용 타입
export type PointHistoryType = '적립' | '사용';

// 포인트 적립/사용 내역 한 건
export interface PointHistoryItem {
  id: string;
  date: string; // yyyy.mm.dd
  type: PointHistoryType;
  title: string; // 예: '포토 리뷰 작성', '공동 구매 보상 적립금'
  description?: string; // 상세 설명 (상품명 등)
  amount: number; // +100, -100 등
}

// 날짜별 그룹핑된 포인트 내역
export interface GroupedPointHistory {
  date: string;
  items: PointHistoryItem[];
}

// 포인트 적립 방법 카드 정보
export interface PointEarnMethod {
  icon: string; // 이모지 또는 아이콘명
  label: string;
  amount: number;
}

// API 응답 타입들
export interface PointTransactionResponse {
  id: number;
  type: 'USED' | 'EARNED';
  source: 'GROUPBUY' | 'REVIEW' | 'INVITE' | 'ADMIN' | 'REFUND';
  amount: number;
  reason: string;
  createdAt: string;
}

export interface PointTransactionsResponse {
  transactions: PointTransactionResponse[];
  page: number;
  size: number;
  total: number;
}

export interface PointTransactionParams {
  type?: 'all' | 'USED' | 'EARNED';
  source?: 'all' | 'GROUPBUY' | 'REVIEW' | 'INVITE' | 'ADMIN' | 'REFUND';
  page?: number;
  size?: number;
}
