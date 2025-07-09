'use client';

import React from 'react';
import { MyPageLayout } from '@/components/mypage/MyPageLayout';
import { ProfileCard } from '@/components/mypage/ProfileCard';
import { BeautyProfileSummary } from '@/components/mypage/beauty-profile';
import { MobileSidebarList } from '@/components/mypage/MobileSidebarList';
import { useMyPage } from '@/hooks/useMyPage';
import { useAuthGuard } from '@/hooks';

export default function MyPage() {
  // 모든 훅은 최상단에서 호출
  const { isLoggedIn, isLoading } = useAuthGuard();
  const { hasBeautyProfile, summaryInfo } = useMyPage();

  // 로딩 중이거나 로그인하지 않은 경우 로딩 화면 표시
  if (isLoading || !isLoggedIn) {
    return (
      <MyPageLayout>
        <div className="flex flex-1 flex-col gap-6 py-4 md:py-6">
          <div className="flex items-center justify-center py-16">
            <div className="text-text-200">로딩 중...</div>
          </div>
        </div>
      </MyPageLayout>
    );
  }

  return (
    <MyPageLayout>
      {/* 프로필 카드 */}
      <ProfileCard />

      {/* 뷰티 프로필 요약 카드 */}
      {hasBeautyProfile && <BeautyProfileSummary summaryInfo={summaryInfo} />}

      {/* 모바일/태블릿: 사이드바 리스트 */}
      <MobileSidebarList />
    </MyPageLayout>
  );
}
