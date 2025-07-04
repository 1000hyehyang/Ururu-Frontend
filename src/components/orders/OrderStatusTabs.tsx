'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { OrderStatusFilter, OrderStatusSummary } from '@/types/order';

interface OrderStatusTabsProps {
  summary: OrderStatusSummary;
  activeFilter: OrderStatusFilter;
  onFilterChange: (filter: OrderStatusFilter) => void;
}

export function OrderStatusTabs({ summary, activeFilter, onFilterChange }: OrderStatusTabsProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const tabs = [
    {
      value: 'all' as const,
      label: '전체',
      count: summary.inProgress + summary.confirmed + (summary.failed || 0),
    },
    { value: 'in_progress' as const, label: '진행중인 공구', count: summary.inProgress },
    { value: 'confirmed' as const, label: '확정된 공구', count: summary.confirmed },
  ];

  const selectedTab = tabs.find((tab) => tab.value === activeFilter);

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 rounded-lg border border-bg-300 bg-bg-100 px-3 py-2 text-sm font-medium text-text-100 transition-colors hover:bg-bg-200"
      >
        <span>{selectedTab?.label || '전체'}</span>
        <span className="rounded-full bg-bg-300 px-1.5 py-0.5 text-xs text-text-200">
          {selectedTab?.count || 0}
        </span>
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
                setIsDropdownOpen(false);
              }}
              className="block w-full px-4 py-2 text-left text-sm text-text-100 first:rounded-t-lg last:rounded-b-lg hover:bg-bg-200"
            >
              <div className="flex items-center justify-between">
                <span>{tab.label}</span>
                <span className="rounded-full bg-bg-300 px-1.5 py-0.5 text-xs text-text-200">
                  {tab.count}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
