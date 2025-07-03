'use client';

import React from 'react';
import type { Product } from '@/types/product';
import { ProductCard } from '@/components/product';

interface HistoryProductGridProps {
  products: Product[];
}

export function HistoryProductGrid({ products }: HistoryProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard
          key={`${product.id}-${index}`}
          product={product}
        />
      ))}
    </div>
  );
}
