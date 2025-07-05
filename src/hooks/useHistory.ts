'use client';

import { useMemo, useState, useEffect } from 'react';
import { mockHistoryProducts } from '@/data/history';
import { HISTORY_CONSTANTS } from '@/constants/history';
import {
  sortHistoryProducts,
  filterValidHistoryProducts,
  limitHistoryProducts,
} from '@/lib/history-utils';

export const useHistory = () => {
  const [sortBy, setSortBy] = useState<
    (typeof HISTORY_CONSTANTS.SORT.OPTIONS)[keyof typeof HISTORY_CONSTANTS.SORT.OPTIONS]
  >(HISTORY_CONSTANTS.SORT.DEFAULT);
  const [isClient, setIsClient] = useState(false);

  // 클라이언트 사이드에서만 실행
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 실제로는 API에서 가져올 데이터 (현재는 mock 데이터 사용)
  const rawHistoryProducts = useMemo(() => {
    if (!isClient) return [];
    return mockHistoryProducts;
  }, [isClient]);

  // 유효한 상품들만 필터링
  const validProducts = useMemo(() => {
    if (!isClient) return [];
    return filterValidHistoryProducts(rawHistoryProducts);
  }, [rawHistoryProducts, isClient]);

  // 정렬된 상품들
  const sortedProducts = useMemo(() => {
    if (!isClient) return [];
    return sortHistoryProducts(validProducts, sortBy);
  }, [validProducts, sortBy, isClient]);

  // 제한된 상품들 (캐시 용량 제한)
  const historyProducts = useMemo(() => {
    if (!isClient) return [];
    return limitHistoryProducts(sortedProducts);
  }, [sortedProducts, isClient]);

  // 상품이 있는지 확인
  const hasProducts = useMemo(() => {
    if (!isClient) return false;
    return historyProducts.length > 0;
  }, [historyProducts, isClient]);

  // 상품 개수
  const productCount = useMemo(() => {
    if (!isClient) return 0;
    return historyProducts.length;
  }, [historyProducts, isClient]);

  // 정렬 옵션 변경 핸들러
  const handleSortChange = (
    newSortBy: (typeof HISTORY_CONSTANTS.SORT.OPTIONS)[keyof typeof HISTORY_CONSTANTS.SORT.OPTIONS],
  ) => {
    if (isClient) {
      setSortBy(newSortBy);
    }
  };

  return {
    historyProducts,
    hasProducts,
    productCount,
    sortBy,
    handleSortChange,
    sortOptions: HISTORY_CONSTANTS.SORT.OPTIONS,
    isClient,
  };
};
