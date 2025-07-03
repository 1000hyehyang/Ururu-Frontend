'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField } from '@/components/form/FormField';
import { FORM_STYLES } from '@/constants/form-styles';

interface PointUsageProps {
  availablePoint: number;
  pointAmount: number;
  onPointAmountChange: (amount: number) => void;
  onUseAllPoints: () => void;
}

export function PointUsage({
  availablePoint,
  pointAmount,
  onPointAmountChange,
  onUseAllPoints,
}: PointUsageProps) {
  return (
    <div className="space-y-6">
      {/* 보유 포인트 안내 */}
      <div className="rounded-lg bg-none p-0">
        <p className="text-sm text-text-100">
          <span className="font-medium text-primary-300">
            우르르 포인트 {availablePoint.toLocaleString()}P
          </span>
        </p>
      </div>

      {/* 포인트 입력 */}
      <div className="flex gap-3">
        <FormField label="포인트 입력" className="flex-1">
          <Input
            type="number"
            placeholder="0P"
            value={pointAmount}
            onChange={(e) => onPointAmountChange(Number(e.target.value) || 0)}
            className={FORM_STYLES.input.base + ' ' + FORM_STYLES.input.focus + ' text-right'}
          />
        </FormField>
        <div className="flex items-end">
          <Button
            onClick={onUseAllPoints}
            className={FORM_STYLES.button.pinkOutline + ' h-12 min-w-[120px]'}
          >
            전액 사용
          </Button>
        </div>
      </div>
    </div>
  );
}
