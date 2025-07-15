import api from '@/lib/axios';
import { PointTransactionParams, PointTransactionsResponse } from '@/types/point';

// 포인트 거래 내역 조회
export async function getPointTransactions(params: PointTransactionParams = {}) {
  const { type = 'all', source = 'all', page = 1, size = 10 } = params;

  try {
    const response = await api.get<{
      success: boolean;
      message: string;
      data: PointTransactionsResponse;
    }>('/member/me/point-transactions', {
      params: {
        ...(type !== 'all' && { type }),
        ...(source !== 'all' && { source }),
        page,
        size,
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.message || 'API 요청 실패');
    }

    return response.data.data;
  } catch (error) {
    console.error('포인트 거래 내역 조회 중 오류:', error);
    throw error;
  }
}
