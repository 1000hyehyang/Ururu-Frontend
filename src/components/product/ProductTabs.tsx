import React from 'react';
import type { FC } from 'react';
import { cn } from '@/lib/utils';
import { PRODUCT_STYLES } from '@/constants/product-styles';

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
      className={`${PRODUCT_STYLES.tab.container} ${className}`}
      role="tablist"
      aria-label="상세 탭 메뉴"
    >
      {tabs.map((tab, idx) => (
        <button
          key={tab.label}
          className={cn(
            PRODUCT_STYLES.button.tab,
            activeTab === idx ? PRODUCT_STYLES.tab.active : PRODUCT_STYLES.tab.inactive,
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
