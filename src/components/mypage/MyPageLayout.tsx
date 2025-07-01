import React from 'react';
import { NoFooterLayout } from '@/components/layout/layouts';
import { Sidebar } from '@/components/mypage/Sidebar';

interface MyPageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MyPageLayout({ children, className = '' }: MyPageLayoutProps) {
  return (
    <NoFooterLayout className="bg-bg-100">
      <div className="mx-auto flex w-full max-w-[1248px] flex-col items-start justify-center gap-0 px-6 py-12 md:px-9 lg:flex-row lg:gap-12 lg:px-12">
        {/* 데스크탑: 사이드바 */}
        <div className="hidden w-[256px] flex-shrink-0 pt-8 lg:block">
          <Sidebar />
        </div>
        {/* 메인 컨텐츠 */}
        <main
          className={`mx-auto mt-0 flex w-full max-w-3xl flex-col gap-8 px-0 lg:mt-0 ${className}`}
        >
          {children}
        </main>
      </div>
    </NoFooterLayout>
  );
}
