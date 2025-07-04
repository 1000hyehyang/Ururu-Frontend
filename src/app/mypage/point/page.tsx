import React from 'react';
import { MyPageLayout } from '@/components/mypage/MyPageLayout';
import {
  NoticeBanner,
  PointIcon,
  PointHistorySection,
  PointEarnMethodAccordion,
} from '@/components/common';
import { MOCK_POINT_BALANCE, MOCK_POINT_EARN_METHODS, MOCK_POINT_HISTORY } from '@/data/point';
import { formatPrice } from '@/lib/format-utils';

function NoticeCard() {
  return <NoticeBanner message="다양한 활동을 통해 포인트를 적립할 수 있어요!" className="mb-4" />;
}

function PointStatus() {
  return (
    <section className="flex flex-col items-center justify-center py-6">
      <div className="mb-2 flex items-center">
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
  return <PointHistorySection history={MOCK_POINT_HISTORY} />;
}

export default function PointPage() {
  return (
    <MyPageLayout>
      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
        <NoticeCard />
        <PointStatus />
        <EarnMethods />
        <PointHistoryList />
      </div>
    </MyPageLayout>
  );
}
