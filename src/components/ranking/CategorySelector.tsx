'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface CategoryOption {
  value: string;
  label: string;
}

interface CategorySelectorProps {
  categories: CategoryOption[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
}

export const CategorySelector = ({
  categories,
  selectedCategory,
  onCategoryChange,
  className = '',
}: CategorySelectorProps) => {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {categories.map((category) => (
        <Button
          key={category.value}
          variant={selectedCategory === category.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => {
            onCategoryChange(category.value);
          }}
          className={cn(
            'h-8 px-3 text-xs font-medium transition-colors',
            selectedCategory === category.value
              ? 'border-primary-300 bg-primary-300 text-text-on hover:opacity-80'
              : 'border-border-200 bg-bg-100 text-text-200 hover:bg-bg-200 hover:text-text-100',
          )}
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
};
