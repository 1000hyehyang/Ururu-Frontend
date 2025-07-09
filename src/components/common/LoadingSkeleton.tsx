import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingSkeletonProps {
  lines?: number;
  className?: string;
}

export function LoadingSkeleton({ lines = 1, className = '' }: LoadingSkeletonProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton key={index} className="h-4" />
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
      {title && <Skeleton className="mx-auto mb-6 h-8 w-32" />}
      <div className="space-y-4">
        {Array.from({ length: content }).map((_, index) => (
          <Skeleton key={index} className="h-12" />
        ))}
      </div>
    </div>
  );
}

// 새로운 스켈레톤 컴포넌트들
interface ProductCardSkeletonProps {
  className?: string;
}

export function ProductCardSkeleton({ className = '' }: ProductCardSkeletonProps) {
  return (
    <div className={`rounded-lg bg-bg-100 p-4 ${className}`}>
      <Skeleton className="mb-3 aspect-square w-full rounded-lg" />
      <Skeleton className="mb-2 h-4 w-3/4" />
      <Skeleton className="mb-2 h-3 w-1/2" />
      <Skeleton className="h-6 w-1/3" />
    </div>
  );
}

interface ProductGridSkeletonProps {
  count?: number;
  className?: string;
}

export function ProductGridSkeleton({ count = 8, className = '' }: ProductGridSkeletonProps) {
  return (
    <div className={`grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

interface ListSkeletonProps {
  count?: number;
  className?: string;
}

export function ListSkeleton({ count = 5, className = '' }: ListSkeletonProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
