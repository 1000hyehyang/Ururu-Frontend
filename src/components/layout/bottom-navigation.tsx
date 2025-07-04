'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BOTTOM_NAV_ITEMS } from '@/constants/navigation';
import { useSafeNavigation } from '@/hooks/useSafeNavigation';

export function BottomNavigation() {
  const { pathname, isActive } = useSafeNavigation();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-bg-100 shadow-lg desktop:hidden"
      role="navigation"
      aria-label="주요 메뉴"
    >
      <div className="flex h-16 items-center justify-around">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex h-full flex-1 flex-col items-center justify-center transition-colors',
                active ? 'text-primary-300' : 'text-text-200 hover:text-primary-300',
              )}
              aria-label={`${item.label}로 이동${active ? ' (현재 페이지)' : ''}`}
              aria-current={active ? 'page' : undefined}
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
