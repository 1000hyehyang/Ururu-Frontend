import React from 'react';
import Image from 'next/image';

interface RewardBadgeProps {
  percent: number;
  className?: string;
}

export function RewardBadge({ percent, className = '' }: RewardBadgeProps) {
  // percent 값 유효성 검증
  const validPercent = Math.max(0, Math.min(100, percent));
  return (
    <span
      className={`flex items-center rounded-lg bg-gradient-to-r from-primary-200 to-primary-300 px-3 py-1.5 text-xs font-medium text-text-on ${className}`}
    >
      <Image src="/ururu-gradient.svg" alt="캐릭터" width={12} height={12} className="mr-1" />
      현재 {validPercent}% 달성
    </span>
  );
}
