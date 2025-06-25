'use client';

import { useState } from 'react';
import { Search, Bell, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

export function MobileHeader() {
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
              <Input
                placeholder="상품, 브랜드, 성분을 검색하세요"
                className="bg-bg-100 border-primary-300 focus:ring-primary-300 tablet:h-10 tablet:rounded-[20px] tablet:text-sm h-9 rounded-[18px] border pl-4 pr-10 text-xs focus:ring-2 focus:ring-offset-0"
              />
              <Search className="text-text-300 absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
