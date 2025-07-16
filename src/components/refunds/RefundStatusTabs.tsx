'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { RefundStatusSummary, RefundStatusFilter } from '@/types/refund';
import { useDropdown } from '@/hooks';
import { FORM_STYLES } from '@/constants/form-styles';

interface RefundStatusTabsProps {
  summary: RefundStatusSummary;
  activeFilter: RefundStatusFilter;
  onFilterChange: (filter: RefundStatusFilter) => void;
}

export function RefundStatusTabs({ summary, activeFilter, onFilterChange }: RefundStatusTabsProps) {
  const { isOpen: isDropdownOpen, dropdownRef, toggle, close } = useDropdown();

  const tabs = [
    {
      value: 'all' as const,
      label: '전체',
    },
    { value: 'REJECTED' as const, label: '환불 거절' },
    { value: 'APPROVED' as const, label: '환불 승인' },
    { value: 'COMPLETED' as const, label: '환불 완료' },
    { value: 'FAILED' as const, label: '환불 실패' },
  ];

  const selectedTab = tabs.find((tab) => tab.value === activeFilter);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggle}
        className={`flex items-center gap-2 rounded-lg border border-bg-300 bg-bg-100 px-3 py-2 text-sm font-medium text-text-100 transition-colors ${FORM_STYLES.hover.bg200}`}
      >
        <span>{selectedTab?.label || '전체'}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isDropdownOpen && (
        <div className="absolute left-0 top-full z-10 mt-1 w-48 rounded-lg border border-bg-300 bg-bg-100 shadow-lg">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => {
                onFilterChange(tab.value);
                close();
              }}
              className={`block w-full px-4 py-2 text-left text-sm text-text-100 first:rounded-t-lg last:rounded-b-lg ${FORM_STYLES.hover.bg200}`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
