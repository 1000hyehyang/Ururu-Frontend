import api from '@/lib/axios';
import { ApiOrdersParams, ApiOrdersResponse } from '@/types/order';

// 클라이언트 status를 서버 형식으로 변환
function convertStatusForServer(status: string): string {
  const statusMap: Record<string, string> = {
    all: 'all',
    in_progress: 'inprogress',
    confirmed: 'confirmed',
    refund_pending: 'refundpending',
  };
  return statusMap[status] || status;
}

// 주문 내역 조회
export async function getOrders(params: ApiOrdersParams = {}) {
  const { status = 'all', page = 1, size = 5 } = params;

  // 서버 형식으로 변환
  const serverStatus = convertStatusForServer(status);

  const requestParams = {
    ...(status !== 'all' && { status: serverStatus }),
    page,
    size,
  };

  try {
    const response = await api.get<{
      success: boolean;
      message: string;
      data: ApiOrdersResponse;
    }>('/orders/my', {
      params: requestParams,
    });

    if (!response.data.success) {
      throw new Error(response.data.message || 'API 요청 실패');
    }

    return response.data.data;
  } catch (error) {
    console.error('주문 내역 조회 중 오류:', error);
    throw error;
  }
}
