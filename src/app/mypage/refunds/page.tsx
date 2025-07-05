'use client';

import React, { useState, useMemo } from 'react';
import { RefundStatusTabs, RefundCard } from '@/components/refunds';
import { EmptyState, PageHeader } from '@/components/common';
import { allRefunds, refundStatusSummary } from '@/data/refunds';
import { RefundStatusFilter } from '@/types/refund';

export default function RefundsPage() {
  const [activeFilter, setActiveFilter] = useState<RefundStatusFilter>('all');

  const filteredRefunds = useMemo(() => {
    if (activeFilter === 'all') {
      return allRefunds;
    }

    return allRefunds.filter((refund) => refund.status === activeFilter);
  }, [activeFilter]);

  const handleFilterChange = (filter: RefundStatusFilter) => {
    setActiveFilter(filter);
  };

  return (
    <div className="flex flex-1 flex-col gap-6 py-4 md:py-6">
      {/* 페이지 헤더 */}
      <PageHeader title="취소/환불 내역" />

      {/* 상태별 필터 탭 */}
      <RefundStatusTabs
        summary={refundStatusSummary}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />

      {/* 취소/환불 내역 리스트 */}
      <div className="space-y-12">
        {filteredRefunds.length === 0 ? (
          <EmptyState title="취소/환불 내역이 없습니다." description="안전한 쇼핑을 도와드려요!" />
        ) : (
          filteredRefunds.map((refund) => <RefundCard key={refund.id} refund={refund} />)
        )}
      </div>
    </div>
  );
}
