import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface EmptyPageProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function EmptyPage({
  title = '준비중이에요',
  description = '곧 만나보실 수 있어요!',
  icon = '🚧',
  className = '',
}: EmptyPageProps) {
  return (
    <div className={`flex min-h-[400px] items-center justify-center ${className}`}>
      <Card className="w-full max-w-md rounded-2xl border-0 bg-bg-100 shadow-none">
        <CardContent className="p-12 text-center">
          <div className="mb-4 text-6xl">{icon}</div>
          <h2 className="mb-2 text-xl font-semibold text-text-100">{title}</h2>
          <p className="text-sm text-text-200">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
}
