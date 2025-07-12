'use client';

import React from 'react';
import type { Product } from '@/types/product';
import { CenteredSectionHeader } from '@/components/common/CenteredSectionHeader';
import { ProductRankingItem } from './ProductRankingItem';

interface RealtimeBestSectionProps {
  products: Product[];
  className?: string;
}

export function RealtimeBestSection({ products, className = '' }: RealtimeBestSectionProps) {
  if (!products.length) return null;

  return (
    <section className={`w-full ${className} flex h-full flex-col`}>
      {/* 섹션 헤더 */}
      <CenteredSectionHeader title="실시간 베스트" className="mb-6" />

      {/* 모바일/태블릿: 세로 리스트 */}
      <div className="block space-y-4 md:hidden">
        {products.map((product, index) => (
          <ProductRankingItem key={product.id} product={product} index={index} variant="mobile" />
        ))}
      </div>

      {/* 데스크탑: 우측 사이드 세로 리스트 - 캐러셀 높이에 맞춤 */}
      <div className="hidden h-full flex-col md:flex">
        <div className="flex h-full flex-col gap-4">
          {products.map((product, index) => (
            <ProductRankingItem
              key={product.id}
              product={product}
              index={index}
              variant="desktop"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
