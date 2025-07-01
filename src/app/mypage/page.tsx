import React from 'react';
import { MyPageLayout } from '@/components/mypage/MyPageLayout';
import { ProfileCard } from '@/components/mypage/ProfileCard';
import { OrderStatus } from '@/components/mypage/OrderStatus';
import { BeautyProfileSummary } from '@/components/mypage/beauty-profile';
import { MobileSidebarList } from '@/components/mypage/MobileSidebarList';
import { useMyPage } from '@/hooks/useMyPage';

export default function MyPage() {
  const { hasBeautyProfile, summaryInfo } = useMyPage();

  return (
    <MyPageLayout>
      {/* 프로필 카드 */}
      <ProfileCard />

      {/* 뷰티 프로필 요약 카드 */}
      {hasBeautyProfile && <BeautyProfileSummary summaryInfo={summaryInfo} />}

      {/* 주문/배송 카드 */}
      <OrderStatus />

      {/* 모바일/태블릿: 사이드바 리스트 */}
      <MobileSidebarList />
    </MyPageLayout>
  );
}
