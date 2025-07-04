import React from 'react';
import { GroupedPointHistory } from '@/types/point';
import { PointHistoryCard } from './PointHistoryCard';

interface PointHistorySectionProps {
  history: GroupedPointHistory[];
  className?: string;
}

export function PointHistorySection({ history, className = '' }: PointHistorySectionProps) {
  return (
    <section className={className}>
      <h2 className="mb-4 text-lg font-semibold text-text-100">포인트 적립/사용 내역</h2>
      <div className="space-y-6">
        {history.map((group) => (
          <div key={group.date}>
            <div className="mb-3 mt-2 text-sm font-semibold text-text-100">{group.date}</div>
            <div className="space-y-4">
              {group.items.map((item) => (
                <PointHistoryCard
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  amount={item.amount}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
