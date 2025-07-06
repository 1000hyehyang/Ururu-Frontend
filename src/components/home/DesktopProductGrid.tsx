import React from 'react';
import type { Product } from '@/types/product';
import { ProductRankingItem } from './ProductRankingItem';

interface DesktopProductGridProps {
  products: Product[];
  maxItems?: number;
}

export function DesktopProductGrid({ products, maxItems = 6 }: DesktopProductGridProps) {
  // 데스크탑용 고정 배열 (부족하면 빈 카드)
  const desktopProducts = [
    ...products.slice(0, maxItems),
    ...Array(Math.max(0, maxItems - products.length)).fill(null),
  ];

  return (
    <div className="hidden md:grid md:grid-cols-3 md:grid-rows-2 md:gap-6">
      {desktopProducts.map((product, index) =>
        product ? (
          <ProductRankingItem key={product.id} product={product} index={index} variant="desktop" />
        ) : (
          <div
            key={index}
            className="mb-4 flex flex-1 items-center gap-4 rounded-xl bg-bg-100 opacity-0"
          />
        ),
      )}
    </div>
  );
}
