'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Bell, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

// 태블릿/모바일 헤더 컴포넌트
function MobileHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-bg-100 desktop:hidden">
      <div className="px-6">
        <div className="flex h-16 items-center justify-between">
          {/* 로고 */}
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/ururu-text-logo.png"
                alt="우르르"
                width={80}
                height={24}
                className="h-[18px] w-auto"
                priority
              />
            </Link>
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
              <Search className="h-5 w-5 text-text-200" />
            </Button>

            {/* 알림 */}
            <Button variant="ghost" size="sm" className="p-2" aria-label="알림">
              <Bell className="h-5 w-5 text-text-200" />
            </Button>

            {/* 장바구니 */}
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="p-2" aria-label="장바구니">
                <ShoppingCart className="h-5 w-5 text-text-200" />
              </Button>
            </Link>
          </div>
        </div>

        {/* 검색바 */}
        {isSearchOpen && (
          <div className="pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-text-300" />
              <Input placeholder="검색어를 입력하세요" className="border-0 bg-bg-200 pl-10" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export function Header() {
  return <MobileHeader />;
}
