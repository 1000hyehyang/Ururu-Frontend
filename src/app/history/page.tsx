'use client';

import React from 'react';
import { CustomLayout } from '@/components/layout/layouts';
import { HistoryPageHeader, HistoryProductGrid, EmptyHistoryState } from '@/components/history';
import { useHistory } from '@/hooks';

export default function HistoryPage() {
  const { historyProducts, hasProducts, isClient } = useHistory();

  // 서버사이드 렌더링 중에는 로딩 상태 표시
  if (!isClient) {
    return (
      <CustomLayout
        showTopBar={true}
        showSearchBar={true}
        showMainNav={true}
        showFooter={true}
        showBottomNav={true}
      >
        <div className="mx-auto w-full max-w-[1248px] px-6 py-8 md:px-9 md:py-10 xl:px-12">
          <HistoryPageHeader />
          <div className="flex items-center justify-center py-20">
            <div className="text-sm text-text-200">로딩 중...</div>
          </div>
        </div>
      </CustomLayout>
    );
  }

  return (
    <CustomLayout
      showTopBar={true}
      showSearchBar={true}
      showMainNav={true}
      showFooter={true}
      showBottomNav={true}
    >
      <div className="mx-auto w-full max-w-[1248px] px-6 py-8 md:px-9 md:py-10 xl:px-12">
        <HistoryPageHeader />

        {hasProducts ? <HistoryProductGrid products={historyProducts} /> : <EmptyHistoryState />}
      </div>
    </CustomLayout>
  );
}
