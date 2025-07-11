'use client';

import React from 'react';
import { MyPageLayout } from '@/components/mypage/MyPageLayout';
import { ProfileCard } from '@/components/mypage/ProfileCard';
import { BeautyProfileSummary } from '@/components/mypage/beauty-profile';
import { MobileSidebarList } from '@/components/mypage/MobileSidebarList';
import { useMyPage } from '@/hooks/useMyPage';
import { useAuthStore } from '@/store';
import { AuthGuard } from '@/components/auth/AuthGuard';

function MyPageContent() {
  const { hasBeautyProfile, summaryInfo } = useMyPage();
  const { user } = useAuthStore();

  // 사용자 정보가 없는 경우
  if (!user) {
    return (
      <MyPageLayout>
        <div className="flex flex-1 items-center justify-center py-20">
          <div className="text-sm text-text-200">사용자 정보를 불러올 수 없습니다.</div>
        </div>
      </MyPageLayout>
    );
  }

  return (
    <MyPageLayout>
      {/* 프로필 카드 */}
      <ProfileCard user={user} />

      {/* 뷰티 프로필 요약 카드 */}
      {hasBeautyProfile && <BeautyProfileSummary summaryInfo={summaryInfo} />}

      {/* 모바일/태블릿: 사이드바 리스트 */}
      <MobileSidebarList />
    </MyPageLayout>
  );
}

export default function MyPage() {
  return (
    <AuthGuard requireAuth={true}>
      <MyPageContent />
    </AuthGuard>
  );
}