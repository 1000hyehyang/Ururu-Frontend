import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product } from '@/types/product';
import { ProductRankingItem } from './ProductRankingItem';

interface MobileProductListProps {
  products: Product[];
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function MobileProductList({
  products,
  currentPage,
  pageSize,
  onPageChange,
}: MobileProductListProps) {
  const totalPages = Math.ceil(products.length / pageSize);
  const pagedProducts = products.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  return (
    <div className="relative md:hidden">
      <div className="flex flex-col gap-4">
        {pagedProducts.map((product, index) => (
          <ProductRankingItem
            key={product.id}
            product={product}
            index={currentPage * pageSize + index}
            variant="mobile"
          />
        ))}
      </div>

      {/* 좌우 화살표 */}
      {currentPage > 0 && (
        <button
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-bg-100 p-2 shadow"
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="이전 랭킹 보기"
        >
          <ChevronLeft className="h-5 w-5 text-primary-300" />
        </button>
      )}
      {currentPage < totalPages - 1 && (
        <button
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-bg-100 p-2 shadow"
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="다음 랭킹 보기"
        >
          <ChevronRight className="h-5 w-5 text-primary-300" />
        </button>
      )}
    </div>
  );
}
