import React from 'react';

interface LoadingSkeletonProps {
  lines?: number;
  className?: string;
}

export function LoadingSkeleton({ lines = 1, className = '' }: LoadingSkeletonProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className="h-4 animate-pulse rounded bg-gray-200" />
      ))}
    </div>
  );
}

interface CardSkeletonProps {
  title?: boolean;
  content?: number;
  className?: string;
}

export function CardSkeleton({ title = true, content = 3, className = '' }: CardSkeletonProps) {
  return (
    <div className={`rounded-lg bg-bg-100 p-6 shadow-sm ${className}`}>
      {title && <div className="mx-auto mb-6 h-8 w-32 animate-pulse rounded bg-gray-200"></div>}
      <div className="space-y-4">
        {Array.from({ length: content }).map((_, index) => (
          <div key={index} className="h-12 animate-pulse rounded bg-gray-200"></div>
        ))}
      </div>
    </div>
  );
}
