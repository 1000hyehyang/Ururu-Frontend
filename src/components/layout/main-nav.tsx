'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="desktop:block bg-bg-100 hidden">
      <div className="container">
        <nav className="flex h-12 items-center space-x-8">
          <Link
            href="/category"
            className="text-text-200 hover:text-primary-300 text-sm transition-colors"
          >
            카테고리
          </Link>
          <Link
            href="/"
            className={cn(
              'text-sm transition-colors',
              pathname === '/'
                ? 'text-primary-300 font-medium'
                : 'text-text-200 hover:text-primary-300',
            )}
          >
            홈
          </Link>
          <Link
            href="/ranking"
            className="text-text-200 hover:text-primary-300 text-sm transition-colors"
          >
            랭킹
          </Link>
          <Link
            href="/short"
            className="text-text-200 hover:text-primary-300 text-sm transition-colors"
          >
            숏구
          </Link>
          <Link
            href="/event"
            className="text-text-200 hover:text-primary-300 text-sm transition-colors"
          >
            이벤트
          </Link>
        </nav>
      </div>
    </div>
  );
}
