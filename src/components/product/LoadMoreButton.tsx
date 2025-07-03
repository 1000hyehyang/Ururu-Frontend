'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface LoadMoreButtonProps {
  isLoading: boolean;
  onLoadMore: () => void;
  onShowLess?: () => void;
  showAll: boolean;
}

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  isLoading,
  onLoadMore,
  onShowLess,
  showAll,
}) => {
  if (showAll) {
    return (
      <div className="flex justify-center py-6">
        <Button
          onClick={onShowLess}
          variant="outline"
          size="default"
          className="h-10 rounded-lg border-bg-300 bg-bg-100 px-6 text-text-300 hover:border-primary-300 hover:text-primary-300"
        >
          <ChevronUp className="h-4 w-4" />
          접기
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={onLoadMore}
      disabled={isLoading}
      variant="outline"
      size="default"
      className="h-10 rounded-lg border-bg-300 bg-bg-100 px-6 text-text-300 hover:border-primary-300 hover:text-primary-300"
    >
      {isLoading ? (
        <>
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-bg-300 border-t-primary-300" />
          로딩 중...
        </>
      ) : (
        <>
          <ChevronDown className="h-4 w-4" />
          펼치기
        </>
      )}
    </Button>
  );
};
