import React from 'react';
import { formatPrice } from '@/lib/format-utils';
import { cn } from '@/lib/utils';

interface PointHistoryCardProps {
  title: string;
  description?: string;
  amount: number;
  className?: string;
}

export function PointHistoryCard({
  title,
  description,
  amount,
  className = '',
}: PointHistoryCardProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between rounded-xl bg-bg-100 px-5 py-4 shadow-sm transition-all duration-200 hover:scale-[1.02]',
        className,
      )}
    >
      <div>
        <div className="mb-1 font-medium text-text-100">{title}</div>
        {description && (
          <div className="whitespace-pre-line text-xs text-text-300">{description}</div>
        )}
      </div>
      <div
        className={cn(
          'ml-4 text-base font-semibold',
          amount > 0 ? 'text-primary-300' : 'text-text-300',
        )}
      >
        {amount > 0 ? `+${formatPrice(amount)}P` : `${formatPrice(amount)}P`}
      </div>
    </div>
  );
}
