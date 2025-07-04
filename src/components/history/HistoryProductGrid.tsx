'use client';

import React from 'react';
import type { Product } from '@/types/product';
import { ProductGrid } from '@/components/product';

interface HistoryProductGridProps {
  products: Product[];
}

export function HistoryProductGrid({ products }: HistoryProductGridProps) {
  return <ProductGrid products={products} />;
}
