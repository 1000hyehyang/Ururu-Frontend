import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { myPageData } from '@/data/mypage';
import Link from 'next/link';

export function ProfileCard() {
  const { profile, profileActions } = myPageData;

  return (
    <Card className="w-full rounded-2xl border-0 bg-bg-100 px-4 py-6 shadow-sm md:px-8">
      <CardContent className="p-0">
        <div className="mb-6 flex items-center justify-between">
          {/* 아바타/닉네임/뱃지 */}
          <div className="flex items-center gap-4 md:gap-6">
            <Avatar className="h-12 w-12 bg-bg-300 md:h-16 md:w-16">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback>{profile.nickname[0]}</AvatarFallback>
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
        <div className="flex w-full gap-1 md:gap-4">
          {profileActions.map((action) =>
            action.label === '프로필 수정' ? (
              <Link
                key={action.label}
                href="/mypage/profile-edit"
                className="flex-1"
                aria-label="프로필 수정 페이지로 이동"
              >
                <Button
                  variant="outline"
                  className="h-8 w-full rounded-lg border-bg-300 bg-bg-100 px-1 text-[10px] font-medium text-text-300 hover:border-primary-300 hover:text-primary-300 md:h-12 md:rounded-xl md:px-2 md:text-base"
                >
                  {action.label}
                </Button>
              </Link>
            ) : (
              <Button
                key={action.label}
                variant="outline"
                className="h-8 flex-1 rounded-lg border-bg-300 bg-bg-100 px-1 text-[10px] font-medium text-text-300 hover:border-primary-300 hover:text-primary-300 md:h-12 md:rounded-xl md:px-2 md:text-base"
                aria-label={`${action.label} 페이지로 이동`}
              >
                {action.label}
              </Button>
            ),
          )}
        </div>
      </CardContent>
    </Card>
  );
}
