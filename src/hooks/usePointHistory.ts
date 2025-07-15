import { useState, useEffect, useCallback } from 'react';
import { getPointTransactions } from '@/services/pointService';
import { groupPointHistoryByDate } from '@/lib/utils';
import { GroupedPointHistory, PointTransactionResponse } from '@/types/point';

const PAGE_SIZE = 10;

export function usePointHistory() {
  const [allTransactions, setAllTransactions] = useState<PointTransactionResponse[]>([]);
  const [history, setHistory] = useState<GroupedPointHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // 초기 데이터 로드
  const loadInitialData = useCallback(async () => {
    try {
      console.log('포인트 내역 초기 로드...');
      setLoading(true);
      setError(null);

      const data = await getPointTransactions({ page: 1 });
      console.log('API 응답:', data);

      setAllTransactions(data.transactions);
      const groupedHistory = groupPointHistoryByDate(data.transactions);
      setHistory(groupedHistory);

      setPage(2);
      setHasMore(data.transactions.length === PAGE_SIZE);
    } catch (err) {
      console.error('포인트 내역 조회 실패:', err);
      setError(`에러: ${err instanceof Error ? err.message : '알 수 없는 오류'}`);
    } finally {
      setLoading(false);
    }
  }, []);

  // 추가 데이터 로드 (무한 스크롤)
  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    try {
      console.log(`페이지 ${page} 로드 중...`);
      setLoadingMore(true);

      const data = await getPointTransactions({ page });
      console.log(`페이지 ${page} 응답:`, data);

      if (data.transactions.length === 0) {
        setHasMore(false);
        return;
      }

      // 기존 데이터에 새 데이터 추가 (함수형 업데이트)
      setAllTransactions((prev) => {
        const newAllTransactions = [...prev, ...data.transactions];
        // 전체 데이터를 다시 그룹핑
        const newGroupedHistory = groupPointHistoryByDate(newAllTransactions);
        setHistory(newGroupedHistory);
        return newAllTransactions;
      });

      setPage((prev) => prev + 1);
      setHasMore(data.transactions.length === PAGE_SIZE);
    } catch (err) {
      console.error('추가 데이터 로드 실패:', err);
    } finally {
      setLoadingMore(false);
    }
  }, [page, loadingMore, hasMore]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  return {
    history,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
  };
}
