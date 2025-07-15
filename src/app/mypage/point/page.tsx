'use client';

import React from 'react';
import { MyPageLayout } from '@/components/mypage/MyPageLayout';
import {
  NoticeBanner,
  PointIcon,
  PointHistorySection,
  PointEarnMethodAccordion,
} from '@/components/common';
import { MOCK_POINT_BALANCE, MOCK_POINT_EARN_METHODS } from '@/data/point';
import { formatPrice } from '@/lib/format-utils';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { usePointHistory } from '@/hooks/usePointHistory';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

function NoticeCard() {
  return <NoticeBanner message="다양한 활동을 통해 포인트를 적립할 수 있어요!" className="mb-4" />;
}

function PointStatus() {
  return (
    <section className="flex flex-col items-center justify-center py-6">
      <div className="mb-2 flex items-center gap-3">
        <PointIcon size="md" />
        <span className="text-lg font-bold text-text-100">보유 포인트</span>
      </div>
      <div className="mb-1 text-4xl font-semibold text-primary-300">
        {formatPrice(MOCK_POINT_BALANCE)}
      </div>
    </section>
  );
}

function EarnMethods() {
  return (
    <section className="mb-6">
      <h2 className="mb-4 text-lg font-semibold text-text-100">포인트 적립 방법</h2>
      <PointEarnMethodAccordion methods={MOCK_POINT_EARN_METHODS} />
    </section>
  );
}

function PointHistoryList() {
  const { history, loading, loadingMore, error, hasMore, loadMore } = usePointHistory();
  const sentinelRef = useInfiniteScroll({
    hasMore,
    loading: loadingMore,
    onLoadMore: loadMore,
  });

  if (loading) {
    return <div className="p-4 text-center">포인트 내역을 불러오는 중...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <div>
      <PointHistorySection history={history} />

      {/* 무한 스크롤 감지용 요소 */}
      <div ref={sentinelRef} className="h-4" />

      {/* 추가 로딩 표시 */}
      {loadingMore && (
        <div className="p-4 text-center text-gray-500">더 많은 내역을 불러오는 중...</div>
      )}

      {/* 더 이상 데이터가 없을 때 */}
      {!hasMore && history.length > 0 && (
        <div className="p-4 text-center text-gray-400">모든 포인트 내역을 확인했습니다.</div>
      )}
    </div>
  );
}

function PointPageContent() {
  return (
    <MyPageLayout>
      <div className="flex flex-1 flex-col gap-6 py-4 md:py-6">
        <NoticeCard />
        <PointStatus />
        <EarnMethods />
        <PointHistoryList />
      </div>
    </MyPageLayout>
  );
}

export default function PointPage() {
  return (
    <AuthGuard requireAuth={true}>
      <PointPageContent />
    </AuthGuard>
  );
}
