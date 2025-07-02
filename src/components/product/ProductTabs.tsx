import React from 'react';
import type { FC } from 'react';
import { cn } from '@/lib/utils';

interface Tab {
  label: string;
}

interface ProductTabsProps {
  tabs: Tab[];
  activeTab: number;
  onTabChange: (index: number) => void;
  className?: string;
}

export const ProductTabs: FC<ProductTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = '',
}) => {
  return (
    <div
      className={`flex w-full max-w-[480px] rounded-lg bg-bg-200 p-1 md:max-w-none ${className}`}
      role="tablist"
      aria-label="상세 탭 메뉴"
    >
      {tabs.map((tab, idx) => (
        <button
          key={tab.label}
          className={cn(
            'flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm font-medium transition-all md:py-3 md:text-base',
            activeTab === idx
              ? 'bg-bg-100 text-text-100 shadow-sm'
              : 'text-text-200 hover:text-text-100',
          )}
          onClick={() => onTabChange(idx)}
          type="button"
          role="tab"
          aria-selected={activeTab === idx}
          aria-label={tab.label}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
