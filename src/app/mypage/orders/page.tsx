'use client';

import React, { useState, useMemo } from 'react';
import { OrderStatusTabs, OrderCard } from '@/components/orders';
import { orderStatusSummary, mockOrders } from '@/data/orders';
import { OrderStatusFilter } from '@/types/order';

export default function OrdersPage() {
  const [activeFilter, setActiveFilter] = useState<OrderStatusFilter>('all');

  const filteredOrders = useMemo(() => {
    if (activeFilter === 'all') {
      return mockOrders;
    }
    return mockOrders.filter((order) => order.status === activeFilter);
  }, [activeFilter]);

  const handleFilterChange = (filter: OrderStatusFilter) => {
    setActiveFilter(filter);
  };

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      {/* 페이지 헤더 */}
      <div className="flex flex-col items-center gap-6 py-4">
        <h1 className="mb-2 text-xl font-semibold text-text-100 md:text-2xl">주문/배송 조회</h1>
        <div className="flex justify-center gap-16">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-text-100 md:text-4xl">
              {orderStatusSummary.inProgress}
            </span>
            <span className="mt-2 text-base font-medium text-text-200 md:text-lg">
              진행중인 공구
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-text-100 md:text-4xl">
              {orderStatusSummary.confirmed}
            </span>
            <span className="mt-2 text-base font-medium text-text-200 md:text-lg">확정된 공구</span>
          </div>
        </div>
      </div>

      {/* 상태별 필터 탭 */}
      <OrderStatusTabs
        summary={orderStatusSummary}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />

      {/* 주문 내역 리스트 */}
      <div className="space-y-12">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-lg font-medium text-text-200">주문 내역이 없습니다.</div>
            <div className="text-sm text-text-300">첫 주문을 시작해보세요!</div>
          </div>
        ) : (
          filteredOrders.map((order) => <OrderCard key={order.id} order={order} />)
        )}
      </div>
    </div>
  );
}
