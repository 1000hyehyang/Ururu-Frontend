import React from 'react';
import Image from 'next/image';

interface RewardBadgeProps {
  percent: number;
  className?: string;
}

export function RewardBadge({ percent, className = '' }: RewardBadgeProps) {
  const label = `${percent}% 할인달성`;

  return (
    <span
      className={`flex items-center rounded-lg bg-gradient-to-r from-primary-200 to-primary-300 px-3 py-1.5 text-xs font-medium text-text-on ${className}`}
    >
      <Image src="/ururu-gradient.svg" alt="캐릭터" width={12} height={12} className="mr-1" />
      {label}
    </span>
  );
}
