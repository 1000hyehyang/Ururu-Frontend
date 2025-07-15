import { useState, useEffect, useCallback } from 'react';
import { getOrders } from '@/services/orderService';
import { convertOrder } from '@/lib/utils';
import { Order, OrderStatusSummary, OrderStatusFilter, ApiOrder } from '@/types/order';

const PAGE_SIZE = 5;

export function useOrders(statusFilter: OrderStatusFilter = 'all') {
  const [allOrders, setAllOrders] = useState<ApiOrder[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [summary, setSummary] = useState<OrderStatusSummary>({
    inProgress: 0,
    confirmed: 0,
    refundPending: 0,
  });
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // 초기 데이터 로드
  const loadInitialData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const apiParams = {
        status: statusFilter as 'all' | 'in_progress' | 'confirmed' | 'refund_pending',
        page: 1,
        size: PAGE_SIZE,
      };

      const data = await getOrders(apiParams);

      setAllOrders(data.orders);
      const convertedOrders = data.orders.map(convertOrder);
      setOrders(convertedOrders);
      setSummary({
        inProgress: data.inProgress,
        confirmed: data.confirmed,
        refundPending: data.refundPending,
      });

      setPage(2);
      setHasMore(data.orders.length === PAGE_SIZE); // 정확히 PAGE_SIZE개면 더 있을 수 있음
    } catch (err) {
      console.error('주문 내역 조회 실패:', err);
      setError(`에러: ${err instanceof Error ? err.message : '알 수 없는 오류'}`);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  // 추가 데이터 로드 (무한 스크롤)
  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) {
      return;
    }

    try {
      setLoadingMore(true);

      const data = await getOrders({
        status: statusFilter as 'all' | 'in_progress' | 'confirmed' | 'refund_pending',
        page,
        size: PAGE_SIZE,
      });

      // 데이터가 없거나 5개 미만이면 더 이상 없음
      if (data.orders.length === 0) {
        setHasMore(false);
        return;
      }

      if (data.orders.length < PAGE_SIZE) {
        setHasMore(false);
      }

      // 기존 데이터에 새 데이터 추가 (함수형 업데이트)
      setAllOrders((prev) => {
        const newAllOrders = [...prev, ...data.orders];
        // 변환하여 UI 데이터 업데이트
        const newConvertedOrders = newAllOrders.map(convertOrder);
        setOrders(newConvertedOrders);
        return newAllOrders;
      });

      setPage((prev) => prev + 1);
    } catch (err) {
      console.error('추가 데이터 로드 실패:', err);
      // 에러 발생시 더 이상 로드하지 않음
      setHasMore(false);
    } finally {
      setLoadingMore(false);
    }
  }, [page, loadingMore, hasMore, statusFilter]);

  // statusFilter가 변경되면 데이터 다시 로드
  useEffect(() => {
    setAllOrders([]);
    setOrders([]);
    setPage(1);
    setHasMore(true);
    loadInitialData();
  }, [loadInitialData]);

  return {
    orders,
    summary,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
  };
}
