import React from 'react';
import { ChevronRightIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { NoFooterLayout } from '@/components/layout/layouts';
import { Sidebar } from '@/components/mypage/Sidebar';
import { MobileSidebarList } from '@/components/mypage/MobileSidebarList';
import { myPageData } from '@/data/mypage';

export default function MyPage() {
  const { profile, orderStatuses, profileActions } = myPageData;

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
                          className="rounded-full border border-primary-300 bg-primary-100 px-2 py-1 text-xs font-semibold text-primary-300 md:px-3"
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
              <div className="flex w-full gap-2 md:gap-4">
                {profileActions.map((action) => (
                  <Button
                    key={action.label}
                    variant="outline"
                    className="h-10 flex-1 rounded-lg border-bg-300 bg-bg-100 text-sm font-medium text-text-300 hover:border-primary-300 hover:text-primary-300 md:h-12 md:rounded-xl md:text-base"
                    aria-label={`${action.label} 페이지로 이동`}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 주문/배송 카드 */}
          <Card className="w-full rounded-2xl border-0 bg-bg-100 py-6 shadow-none">
            <CardHeader className="mb-4 flex flex-row items-center justify-between p-0">
              <CardTitle className="text-lg font-semibold text-text-100 md:text-xl">
                주문/배송 조회
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto border-bg-300 px-2 py-1 text-sm text-text-300 hover:text-primary-300"
                aria-label="주문/배송 전체보기"
              >
                전체보기 <ChevronRightIcon className="ml-0 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0 pt-4">
              <div className="flex items-center justify-between">
                {orderStatuses.map((item) => (
                  <div key={item.label} className="flex flex-1 flex-col items-center">
                    <span className="mb-1 text-2xl font-bold text-text-100 md:text-3xl">
                      {item.count}
                    </span>
                    <span className="text-xs text-text-300">{item.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 모바일/태블릿: 사이드바 리스트 */}
          <MobileSidebarList />
        </main>
      </div>
    </NoFooterLayout>
  );
}
