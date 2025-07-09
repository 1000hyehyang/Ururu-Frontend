'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { myPageData, beautyProfileData } from '@/data/mypage';
import { FORM_STYLES } from '@/constants/form-styles';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useAuthStore } from '@/store';

export function ProfileCard() {
  const userInfo = useAuthStore((state) => state.userInfo);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  // main 브랜치 구조에 맞춰 실제 사용자 정보로 profile 객체 생성
  const profile = {
    nickname: userInfo?.name || userInfo?.nickname || '우르르',
    avatar: userInfo?.profileImage || '/profile-image.svg',
    badges: ['민감성', '여름쿨톤'], // TODO: 실제 사용자 뱃지 정보로 교체
    points: 12345, // TODO: 실제 사용자 포인트 정보로 교체
  };

  const { profileActions } = myPageData;
  const profileData = beautyProfileData.withProfile;
  const hasBeautyProfile = profileData.skinType && profileData.skinTone;

  // 프로필 이미지가 없거나 기본값인 경우 fallback 사용
  const hasCustomAvatar = userInfo?.profileImage && userInfo.profileImage !== '/profile-image.svg';


  return (
    <Card className="w-full rounded-2xl border-0 bg-bg-100 px-4 py-6 shadow-sm md:px-8">
      <CardContent className="p-0">
        <div className="mb-6 flex items-center justify-between">
          {/* 아바타/닉네임/뱃지 */}
          <div className="flex items-center gap-4 md:gap-6">
            <Avatar className="h-12 w-12 bg-bg-300 md:h-16 md:w-16">
              {hasCustomAvatar ? (
                <AvatarImage src={profile.avatar} alt={`${profile.nickname}의 프로필 이미지`} />
              ) : null}
              <AvatarFallback className="bg-bg-300 text-text-200">
                {profile.nickname[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="mb-1 text-lg font-semibold text-text-100 md:text-2xl">
                {profile.nickname}
              </div>
              <div className="flex gap-1 md:gap-2">
                {profile.badges.map((badge) => (
                  <Badge
                    key={badge}
                    className="rounded-full border border-primary-300 bg-primary-100 px-1.5 py-0.5 text-[10px] font-semibold text-primary-300 md:px-3 md:py-1 md:text-xs"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          {/* 포인트 */}
          <div className="flex items-center gap-2 md:gap-3">
            <span className="mb-1 flex h-6 w-6 items-center justify-center rounded-full border border-primary-200 text-base font-bold text-primary-200 md:h-8 md:w-8 md:text-lg">
              P
            </span>
            <span className="text-xs text-text-300">우르르 포인트</span>
            <span className="text-base font-bold tracking-tight text-text-100 md:text-xl">
              {profile.points.toLocaleString()}P
            </span>
          </div>
        </div>
        {/* 하단 버튼 */}
        <div className="flex w-full flex-col gap-2 md:flex-row md:gap-4">
          {profileActions.map((action) => (
            <Link
              key={action.label}
              href={action.href || '#'}
              className="flex-1"
              aria-label={`${action.label} 페이지로 이동`}
            >
              <Button variant="outline" className={cn(FORM_STYLES.button.profileCard)}>
                {action.label === '뷰티 프로필 수정' && hasBeautyProfile
                  ? '뷰티 프로필 수정'
                  : action.label === '뷰티 프로필 수정'
                    ? '뷰티 프로필 작성'
                    : action.label}
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
