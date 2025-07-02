import React from 'react';
import type { FC } from 'react';
import { ChevronRight } from 'lucide-react';
import type { BreadcrumbItem } from '@/constants/product-detail';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: FC<BreadcrumbProps> = ({ items, className = '' }) => {
  return (
    <div className={`flex items-center gap-1 text-sm text-text-200 ${className}`}>
      {items.map((item, index) => (
        <React.Fragment key={item.label}>
          {index > 0 && <ChevronRight className="h-3 w-3" />}
          {item.href ? (
            <a href={item.href} className="transition-colors hover:text-primary-300">
              {item.label}
            </a>
          ) : (
            <span>{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
