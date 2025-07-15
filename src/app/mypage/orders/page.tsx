'use client';

import React, { useState, useMemo } from 'react';
import { OrderStatusTabs, OrderCard } from '@/components/orders';
import { EmptyState, PageHeader } from '@/components/common';
import { OrderStatusFilter } from '@/types/order';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { useOrders } from '@/hooks/useOrders';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

function OrdersPageContent() {
  const [activeFilter, setActiveFilter] = useState<OrderStatusFilter>('all');
  const { orders, summary, loading, loadingMore, error, hasMore, loadMore } =
    useOrders(activeFilter);

  // 무한 스크롤 감지
  const sentinelRef = useInfiniteScroll({
    hasMore,
    loading: loadingMore,
    onLoadMore: loadMore,
  });

  // activeFilter에 맞는 주문만 필터링
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // failed 상태는 항상 제외
      if (order.status === 'failed') return false;

      // all 필터면 모든 주문 표시
      if (activeFilter === 'all') return true;

      // 각 필터에 맞는 상태만 표시
      return order.status === activeFilter;
    });
  }, [orders, activeFilter]);

  const handleFilterChange = (filter: OrderStatusFilter) => {
    setActiveFilter(filter);
  };

  if (loading) {
    return <div className="p-4 text-center">주문 내역을 불러오는 중...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-1 flex-col gap-6 py-4 md:py-6">
      {/* 페이지 헤더 */}
      <PageHeader title="주문/배송 조회" />

      {/* 통계 정보 */}
      <div className="flex flex-col items-center gap-6 py-4">
        <div className="flex justify-center gap-4 md:gap-16">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-text-100 md:text-4xl">
              {summary.inProgress}
            </span>
            <span className="mt-2 whitespace-nowrap text-center text-sm font-medium text-text-200 md:text-lg">
              공구 진행중
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-text-100 md:text-4xl">
              {summary.confirmed}
            </span>
            <span className="mt-2 whitespace-nowrap text-center text-sm font-medium text-text-200 md:text-lg">
              공구 확정
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-text-100 md:text-4xl">
              {summary.refundPending}
            </span>
            <span className="mt-2 whitespace-nowrap text-center text-sm font-medium text-text-200 md:text-lg">
              환불 대기중
            </span>
          </div>
        </div>
      </div>

      {/* 상태별 필터 탭 */}
      <OrderStatusTabs
        summary={summary}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />

      {/* 주문 내역 리스트 */}
      <div className="space-y-12">
        {filteredOrders.length === 0 ? (
          <EmptyState title="주문 내역이 없습니다." description="첫 주문을 시작해보세요!" />
        ) : (
          <>
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}

            {/* 무한 스크롤 감지용 요소 */}
            <div ref={sentinelRef} className="h-0" />

            {/* 추가 로딩 표시 */}
            {loadingMore && (
              <div className="p-4 text-center text-gray-500">더 많은 주문을 불러오는 중...</div>
            )}

            {/* 더 이상 데이터가 없을 때 */}
            {!hasMore && filteredOrders.length > 0 && (
              <div className="p-4 text-center text-gray-400">모든 주문 내역을 확인했습니다.</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <AuthGuard requireAuth={true}>
      <OrdersPageContent />
    </AuthGuard>
  );
}
