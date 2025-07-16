import api from '@/lib/axios';
import { ApiRefundsParams, ApiRefundsResponse } from '@/types/refund';

const PAGE_SIZE = 5;

// 클라이언트 status를 서버 형식으로 변환
function convertStatusForServer(status: string): string {
  const statusMap: Record<string, string> = {
    all: 'all',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
    PENDING: 'PENDING',
  };
  return statusMap[status] || status;
}

// 환불 내역 조회
export async function getRefunds(params: ApiRefundsParams = {}) {
  const { status = 'all', page = 1, size = PAGE_SIZE } = params;

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
      data: ApiRefundsResponse;
    }>('/refunds/my', {
      params: requestParams,
    });

    if (!response.data.success) {
      throw new Error(response.data.message || 'API 요청 실패');
    }

    return response.data.data;
  } catch (error) {
    console.error('환불 내역 조회 중 오류:', error);
    throw error;
  }
}
