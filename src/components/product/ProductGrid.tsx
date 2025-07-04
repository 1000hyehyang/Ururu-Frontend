'use client';

import React from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from '@/types/product';

interface ProductGridProps {
  products: Product[];
  showRanking?: boolean;
  className?: string;
}

export const ProductGrid = ({
  products,
  showRanking = false,
  className = '',
}: ProductGridProps) => {
  return (
    <div
      className={`grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${className}`}
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          rank={showRanking ? index + 1 : undefined}
        />
      ))}
    </div>
  );
};
