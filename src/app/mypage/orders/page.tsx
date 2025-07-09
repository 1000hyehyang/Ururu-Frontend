'use client';

import { OrderCard, OrderStatusTabs } from '@/components/orders';
import { EmptyState, PageHeader } from '@/components/common';
import { useAuthGuard } from '@/hooks';
import { mockOrders, orderStatusSummary } from '@/data/orders';
import { useState, useMemo } from 'react';
import type { OrderStatusFilter } from '@/types/order';

export default function OrdersPage() {
  const { isLoggedIn, isLoading } = useAuthGuard();
  const [activeFilter, setActiveFilter] = useState<OrderStatusFilter>('all');

  // 필터링된 주문 목록
  const filteredOrders = useMemo(() => {
    if (activeFilter === 'all') return mockOrders;
    return mockOrders.filter((order) => order.status === activeFilter);
  }, [activeFilter]);

  const hasOrders = filteredOrders.length > 0;

  // 로딩 중이거나 로그인하지 않은 경우 로딩 화면 표시
  if (isLoading || !isLoggedIn) {
    return (
      <div className="flex flex-1 flex-col gap-6 py-4 md:py-6">
        <div className="flex items-center justify-center py-16">
          <div className="text-text-200">로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6 py-4 md:py-6">
      {/* 페이지 헤더 */}
      <PageHeader title="주문/배송 조회" />

      {/* 주문 상태 요약 */}
      <div className="rounded-2xl bg-bg-100 p-6">
        <h2 className="mb-4 text-lg font-semibold text-text-100">주문 현황</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Object.entries(orderStatusSummary).map(([status, count]) => (
            <div key={status} className="text-center">
              <div className="text-2xl font-bold text-primary-300">{count}</div>
              <div className="text-sm text-text-200">{status}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 주문 상태 탭 */}
      <OrderStatusTabs
        summary={orderStatusSummary}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* 주문 목록 */}
      {hasOrders ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <EmptyState title="주문 내역이 없습니다" description="첫 번째 주문을 시작해보세요!" />
      )}
    </div>
  );
}
