import React from 'react';
import Image from 'next/image';

interface RewardBadgeProps {
  percent: number;
  className?: string;
}

export function RewardBadge({ percent, className = '' }: RewardBadgeProps) {
  // 3단계 리워드 시스템: 20%, 40%, 60% 할인율 달성
  const getRewardTier = (percent: number) => {
    if (percent >= 60) return { label: '60% 할인 달성!', tier: 'tier3' };
    if (percent >= 40) return { label: '40% 할인 달성!', tier: 'tier2' };
    if (percent >= 20) return { label: '20% 할인 달성!', tier: 'tier1' };
    return null;
  };

  const rewardTier = getRewardTier(percent);

  if (!rewardTier) return null;

  return (
    <span
      className={`flex items-center rounded-lg bg-gradient-to-r from-primary-200 to-primary-300 px-3 py-1.5 text-xs font-medium text-text-on ${className}`}
    >
      <Image src="/ururu-gradient.svg" alt="캐릭터" width={12} height={12} className="mr-1" />
      {rewardTier.label}
    </span>
  );
}
