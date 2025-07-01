import React from 'react';
import { NoFooterLayout } from '@/components/layout/layouts';
import { Sidebar } from '@/components/mypage/Sidebar';
import { MobileSidebarList } from '@/components/mypage/MobileSidebarList';
import { ProfileCard } from '@/components/mypage/ProfileCard';
import { OrderStatus } from '@/components/mypage/OrderStatus';

export default function MyPage() {
  return (
    <NoFooterLayout className="bg-bg-100">
      <div className="mx-auto flex w-full max-w-[1248px] flex-col items-start justify-center gap-0 px-6 py-12 md:px-9 lg:flex-row lg:gap-12 lg:px-12">
        {/* 데스크탑: 사이드바 */}
        <div className="hidden w-[256px] flex-shrink-0 pt-8 lg:block">
          <Sidebar />
        </div>
        {/* 메인 컨텐츠 */}
        <main className="mx-auto mt-0 flex w-full max-w-3xl flex-col gap-8 px-0 lg:mt-0">
          {/* 프로필 카드 */}
          <ProfileCard />

          {/* 주문/배송 카드 */}
          <OrderStatus />

          {/* 모바일/태블릿: 사이드바 리스트 */}
          <MobileSidebarList />
        </main>
      </div>
    </NoFooterLayout>
  );
}
