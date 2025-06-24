'use client';

import { useState } from 'react';
import { Search, Bell, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

// 데스크탑 헤더 컴포넌트
function DesktopHeader() {
  return (
    <header className="desktop:block bg-bg-100 hidden">
      <div className="container">
        <div className="flex h-16 items-center justify-end">
          {/* 상단 네비게이션 */}
          <nav className="flex items-center space-x-6">
            <a
              href="/login"
              className="text-text-200 hover:text-text-100 text-sm transition-colors"
            >
              로그인
            </a>
            <a href="/cart" className="text-text-200 hover:text-text-100 text-sm transition-colors">
              장바구니
            </a>
            <a
              href="/history"
              className="text-text-200 hover:text-text-100 text-sm transition-colors"
            >
              히스토리
            </a>
            <a
              href="/orders"
              className="text-text-200 hover:text-text-100 text-sm transition-colors"
            >
              주문배송
            </a>
            <a
              href="/mypage"
              className="text-text-200 hover:text-text-100 text-sm transition-colors"
            >
              마이페이지
            </a>
          </nav>
        </div>

        {/* 하단 네비게이션 */}
        <nav className="flex h-12 items-center space-x-8">
          <a
            href="/category"
            className="text-text-200 hover:text-primary-300 text-sm transition-colors"
          >
            카테고리
          </a>
          <a href="/" className="text-primary-300 text-sm font-medium">
            홈
          </a>
          <a
            href="/ranking"
            className="text-text-200 hover:text-primary-300 text-sm transition-colors"
          >
            랭킹
          </a>
          <a
            href="/short"
            className="text-text-200 hover:text-primary-300 text-sm transition-colors"
          >
            숏구
          </a>
          <a
            href="/event"
            className="text-text-200 hover:text-primary-300 text-sm transition-colors"
          >
            이벤트
          </a>
        </nav>
      </div>
    </header>
  );
}

// 태블릿/모바일 헤더 컴포넌트
function MobileHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="desktop:hidden bg-bg-100 sticky top-0 z-40">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          {/* 로고 */}
          <div className="flex items-center">
            <Image
              src="/ururu-text-logo.png"
              alt="우르르"
              width={80}
              height={24}
              className="h-[18px] w-auto"
              priority
            />
          </div>

          {/* 우측 아이콘들 */}
          <div className="flex items-center space-x-3">
            {/* 검색 */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2"
              aria-label="검색"
            >
              <Search className="text-text-200 h-5 w-5" />
            </Button>

            {/* 알림 */}
            <Button variant="ghost" size="sm" className="p-2" aria-label="알림">
              <Bell className="text-text-200 h-5 w-5" />
            </Button>

            {/* 장바구니 */}
            <Button variant="ghost" size="sm" className="p-2" aria-label="장바구니">
              <ShoppingCart className="text-text-200 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* 검색바 */}
        {isSearchOpen && (
          <div className="pb-4">
            <div className="relative">
              <Search className="text-text-300 absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
              <Input placeholder="검색어를 입력하세요" className="bg-bg-200 border-0 pl-10" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export function Header() {
  return (
    <>
      <DesktopHeader />
      <MobileHeader />
    </>
  );
}
