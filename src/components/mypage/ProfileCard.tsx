import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { myPageData, beautyProfileData } from '@/data/mypage';
import { FORM_STYLES } from '@/constants/form-styles';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import type { UserInfo } from '@/types/auth';

interface ProfileCardProps {
  user: UserInfo | null;
}

export function ProfileCard({ user }: ProfileCardProps) {
  const { profile, profileActions } = myPageData;
  const profileData = beautyProfileData.withProfile;
  const hasBeautyProfile = profileData.skinType && profileData.skinTone;

  // 사용자 정보 디버깅
  console.log('ProfileCard - 사용자 정보:', user);

  // 사용자 정보가 없으면 기본값 사용
  const displayName = user?.nickname || profile.nickname;
  const displayAvatar = user?.profile_image || profile.avatar;
  const userType = user?.user_type || 'MEMBER';

  console.log('ProfileCard - 표시 정보:', {
    displayName,
    displayAvatar,
    userType,
    originalUser: user,
  });

  return (
    <Card className="w-full rounded-2xl border-0 bg-bg-100 px-4 py-6 shadow-sm md:px-8">
      <CardContent className="p-0">
        <div className="mb-6 flex items-center justify-between">
          {/* 아바타/닉네임/뱃지 */}
          <div className="flex items-center gap-4 md:gap-6">
            <Avatar className="h-12 w-12 bg-bg-300 md:h-16 md:w-16">
              <AvatarImage src={displayAvatar || undefined} />
              <AvatarFallback>{displayName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="mb-1 text-lg font-semibold text-text-100 md:text-2xl">
                {displayName}
              </div>
              <div className="flex gap-1 md:gap-2">
                {/* 사용자 타입에 따른 뱃지 */}
                <Badge className="rounded-full border border-primary-300 bg-primary-100 px-1.5 py-0.5 text-[10px] font-semibold text-primary-300 md:px-3 md:py-1 md:text-xs">
                  {userType === 'SELLER' ? '판매자' : '구매자'}
                </Badge>
                {/* 기존 뱃지들 */}
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
          <div className="flex flex-col items-center">
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