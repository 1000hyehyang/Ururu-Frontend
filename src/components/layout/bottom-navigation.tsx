'use client';

import { Home, Menu, History, User } from 'lucide-react';
import Link from 'next/link';
import { useSafePathname } from '@/hooks';
import { cn } from '@/lib/utils';

interface BottomNavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const bottomNavItems: BottomNavItem[] = [
  {
    href: '/',
    label: '홈',
    icon: Home,
  },
  {
    href: '/category',
    label: '카테고리',
    icon: Menu,
  },
  {
    href: '/history',
    label: '히스토리',
    icon: History,
  },
  {
    href: '/mypage',
    label: '마이페이지',
    icon: User,
  },
];

export function BottomNavigation() {
  const { pathname } = useSafePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-bg-100 shadow-lg desktop:hidden"
      role="navigation"
      aria-label="주요 메뉴"
    >
      <div className="flex h-16 items-center justify-around">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex h-full flex-1 flex-col items-center justify-center transition-colors',
                isActive ? 'text-primary-300' : 'text-text-200 hover:text-primary-300',
              )}
              aria-label={`${item.label}로 이동${isActive ? ' (현재 페이지)' : ''}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="mb-1 h-5 w-5" aria-hidden="true" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
