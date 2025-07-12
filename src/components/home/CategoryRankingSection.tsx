'use client';

import React, { useState } from 'react';
import type { CategoryRanking } from '@/data/home';
import { categoryItems } from '@/data/categories';
import { CenteredSectionHeader } from '@/components/common/CenteredSectionHeader';
import { CategoryTabs } from './CategoryTabs';
import { MobileProductList } from './MobileProductList';
import { DesktopProductGrid } from './DesktopProductGrid';

interface CategoryRankingSectionProps {
  categories: CategoryRanking[];
  className?: string;
}

export function CategoryRankingSection({
  categories,
  className = '',
}: CategoryRankingSectionProps) {
  // 대분류 카테고리 목록
  const mainCategories = categoryItems.map((cat) => cat.title);
  // 카테고리별 데이터 매핑 (mock 데이터 없으면 빈 배열)
  const rankingsByCategory = mainCategories.map((cat) => {
    const found = categories.find((r) => r.category === cat);
    return {
      category: cat,
      products: found?.products ?? [],
    };
  });

  const [activeCategory, setActiveCategory] = useState(0);
  const [mobilePage, setMobilePage] = useState(0);
  const MOBILE_PAGE_SIZE = 3;

  const activeCategoryData = rankingsByCategory[activeCategory];

  const handleCategoryChange = (index: number) => {
    setActiveCategory(index);
  };

  const handleMobilePageReset = () => {
    setMobilePage(0);
  };

  const handleMobilePageChange = (page: number) => {
    setMobilePage(page);
  };

  return (
    <section className={`w-full ${className}`}>
      {/* 섹션 헤더 */}
      <CenteredSectionHeader
        title="카테고리 랭킹"
        description="카테고리별 인기 상품을 확인해보세요"
        className="mb-6"
      />

      {/* 카테고리 탭 */}
      <CategoryTabs
        categories={rankingsByCategory}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        onMobilePageReset={handleMobilePageReset}
      />

      {/* 상품 리스트 */}
      <div>
        {/* 모바일/태블릿: 3개씩 슬라이드 & 화살표 */}
        <MobileProductList
          products={activeCategoryData.products}
          currentPage={mobilePage}
          pageSize={MOBILE_PAGE_SIZE}
          onPageChange={handleMobilePageChange}
        />

        {/* 데스크탑: 2열 3행(6개) 리스트 */}
        <DesktopProductGrid products={activeCategoryData.products} />
      </div>
    </section>
  );
}
