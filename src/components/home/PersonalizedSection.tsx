'use client';

import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product';
import type { Product } from '@/types/product';
import { FORM_STYLES } from '@/constants/form-styles';
import { CenteredSectionHeader } from '@/components/common/CenteredSectionHeader';

interface PersonalizedSectionProps {
  products: Product[];
  className?: string;
}

export function PersonalizedSection({ products, className = '' }: PersonalizedSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 페이지네이션 상태
  const PAGE_SIZE = 8;
  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(0);
  const pagedProducts = products.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
    // 모바일에서 스크롤 맨 앞으로 이동
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  if (!products.length) return null;

  return (
    <section className={`w-full ${className}`}>
      {/* 섹션 헤더 */}
      <CenteredSectionHeader
        title="취향 맞춤"
        description="회원님만을 위한 맞춤 상품을 추천해드려요"
        className="mb-6"
      />

      {/* 모바일/태블릿: 가로 스크롤 */}
      <div className="relative md:hidden">
        <div
          ref={scrollContainerRef}
          className="scrollbar-hide flex gap-4 overflow-x-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {pagedProducts.map((product) => (
            <div key={product.id} className="w-60 flex-shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* 데스크탑: 그리드 레이아웃 */}
      <div className="hidden md:block">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {pagedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* 더보기 버튼 */}
        <div className="mt-8 text-center">
          <Button className={FORM_STYLES.button.pinkOutline} onClick={handleNextPage}>
            AI 추천 더보기 {currentPage + 1} | {totalPages}
          </Button>
        </div>
      </div>

      {/* 모바일: 더보기 버튼 */}
      <div className="mt-8 text-center md:hidden">
        <Button className={FORM_STYLES.button.pinkOutline} onClick={handleNextPage}>
          AI 추천 더보기 {currentPage + 1} | {totalPages}
        </Button>
      </div>
    </section>
  );
}
