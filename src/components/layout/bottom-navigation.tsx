'use client';

import { Home, Menu, History, User } from 'lucide-react';
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
  return (
    <nav className="desktop:hidden bg-bg-100 fixed bottom-0 left-0 right-0 z-50 shadow-lg">
      <div className="flex h-16 items-center justify-around">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.href === '/'; // 현재는 홈페이지만 활성 상태로 설정

          return (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'flex h-full flex-1 flex-col items-center justify-center transition-colors',
                isActive ? 'text-primary-300' : 'text-text-200 hover:text-primary-300',
              )}
            >
              <Icon className="mb-1 h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
