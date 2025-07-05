'use client';

import React from 'react';

interface CartSelectAllProps {
  isAllSelected: boolean;
  isPartiallySelected: boolean;
  onToggleSelectAll: () => void;
  selectedCount: number;
  totalCount: number;
}

export function CartSelectAll({
  isAllSelected,
  isPartiallySelected,
  onToggleSelectAll,
  selectedCount,
  totalCount,
}: CartSelectAllProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-bg-100 px-0 py-4 md:py-6">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={isAllSelected}
          ref={(el) => {
            if (el) {
              el.indeterminate = isPartiallySelected;
            }
          }}
          onChange={onToggleSelectAll}
          aria-label="전체 선택"
        />
        <span className="text-base font-medium text-text-100 md:text-lg">전체</span>
      </div>

      <span className="text-sm text-text-200 md:text-base">
        {selectedCount}/{totalCount} 선택됨
      </span>
    </div>
  );
}
