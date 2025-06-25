'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

export function SearchBar() {
  return (
    <div className="desktop:block bg-bg-100 hidden">
      <div className="container">
        <div className="flex h-20 items-center justify-center">
          {/* 로고 */}
          <div className="flex items-center">
            <Image
              src="/ururu-full-logo.png"
              alt="우르르"
              width={120}
              height={32}
              className="h-8 w-auto"
              priority
            />
          </div>

          {/* 검색창 */}
          <div className="mx-8 max-w-lg flex-1">
            <div className="relative">
              <Input
                placeholder="상품, 브랜드, 성분을 검색하세요"
                className="bg-bg-100 border-primary-300 focus:ring-primary-300 h-12 rounded-[36px] border pl-6 pr-12 text-base focus:ring-2 focus:ring-offset-0"
              />
              <Search className="text-text-300 absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
