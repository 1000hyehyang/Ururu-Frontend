import React from 'react';
import { NoFooterLayout } from '@/components/layout/layouts';
import { Sidebar } from '@/components/mypage/Sidebar';
import { MobileSidebarList } from '@/components/mypage/MobileSidebarList';
import { ProfileCard } from '@/components/mypage/ProfileCard';
import { OrderStatus } from '@/components/mypage/OrderStatus';
import { BeautyProfileSummary } from '@/components/mypage/beauty-profile';
import { beautyProfileData } from '@/data/mypage';
import { useBeautyProfileUtils } from '@/hooks/useBeautyProfileUtils';

export default function MyPage() {
  // 실제로는 API에서 가져올 데이터 (현재는 mock 데이터 사용)
  const profileData = beautyProfileData.withProfile;

  // 뷰티 프로필이 있는지 확인
  const hasBeautyProfile = profileData.skinType && profileData.skinTone;

  // 유틸리티 훅 사용
  const { createSummaryInfo } = useBeautyProfileUtils();

  const summaryInfo = createSummaryInfo(profileData, Boolean(hasBeautyProfile));

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

          {/* 뷰티 프로필 요약 카드 */}
          {hasBeautyProfile && <BeautyProfileSummary summaryInfo={summaryInfo} />}

          {/* 주문/배송 카드 */}
          <OrderStatus />

          {/* 모바일/태블릿: 사이드바 리스트 */}
          <MobileSidebarList />
        </main>
      </div>
    </NoFooterLayout>
  );
}
