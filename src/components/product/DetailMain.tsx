'use client';

import React, { useState } from 'react';
import type { FC } from 'react';
import type { mockProduct as mockProductType } from '@/data/mock-product';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { MobileOrderSection } from './OrderBox';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useImageCarousel } from '@/hooks/useImageCarousel';
import { ProductTabs } from './ProductTabs';
import { PRODUCT_DETAIL_TABS } from '@/constants/product-detail';

interface DetailMainProps {
  product: typeof mockProductType;
}

export const DetailMain: FC<DetailMainProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();

  const {
    mainImage,
    setMainImage,
    canScrollLeft,
    canScrollRight,
    thumbScrollRef,
    checkScrollButtons,
    scrollThumbnails,
  } = useImageCarousel({
    images: product.thumbnails,
    initialImage: product.mainImage,
  });

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="w-full">
      {/* 모바일/태블릿 이전 페이지 버튼 */}
      <div className="mb-4 flex items-center lg:hidden">
        <button
          type="button"
          onClick={handleGoBack}
          className="flex h-10 w-10 items-center justify-center bg-bg-100 transition md:h-12 md:w-12"
          aria-label="이전 페이지로 이동"
        >
          <ArrowLeft className="h-5 w-5 text-text-200 md:h-6 md:w-6" />
        </button>
      </div>

      {/* 메인 이미지 + 썸네일 캐러셀 */}
      <div className="flex flex-col items-center">
        <div className="relative mb-6 aspect-square w-full md:max-w-none">
          <Image
            src={mainImage}
            alt={product.name}
            width={480}
            height={480}
            className="h-full w-full rounded-2xl border border-bg-200 object-cover"
            priority
          />
        </div>

        {/* 썸네일 가로 스크롤/캐러셀 */}
        <div className="relative w-full max-w-[480px] md:max-w-none">
          <div
            ref={thumbScrollRef}
            className="flex w-full gap-3 overflow-x-auto pb-1"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            onScroll={checkScrollButtons}
          >
            {product.thumbnails.map((thumb, idx) => (
              <button
                key={thumb}
                onClick={() => setMainImage(thumb)}
                className="min-h-[64px] min-w-[64px] rounded-xl transition-all hover:opacity-80 md:min-h-[80px] md:min-w-[80px] lg:min-h-[120px] lg:min-w-[120px]"
                aria-label={`썸네일 ${idx + 1}`}
              >
                <Image
                  src={thumb}
                  alt={`썸네일 ${idx + 1}`}
                  width={120}
                  height={120}
                  className="h-full w-full rounded-xl object-cover"
                />
              </button>
            ))}
          </div>

          {/* 좌우 스크롤 버튼 (데스크탑만) */}
          {canScrollLeft && (
            <button
              type="button"
              className="absolute left-0 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-bg-200 bg-bg-100 shadow hover:bg-bg-200 md:flex md:h-10 md:w-10"
              onClick={() => scrollThumbnails('left')}
              aria-label="이전 썸네일"
            >
              <ChevronLeft className="h-4 w-4 text-text-300 md:h-5 md:w-5" />
            </button>
          )}
          {canScrollRight && (
            <button
              type="button"
              className="absolute right-0 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-bg-200 bg-bg-100 shadow hover:bg-bg-200 md:flex md:h-10 md:w-10"
              onClick={() => scrollThumbnails('right')}
              aria-label="다음 썸네일"
            >
              <ChevronRight className="h-4 w-4 text-text-300 md:h-5 md:w-5" />
            </button>
          )}
        </div>
      </div>

      {/* 모바일/태블릿용 주문 섹션 - 썸네일 하단, 탭 메뉴 위 */}
      <div className="mt-6 w-full max-w-[480px] md:max-w-none lg:hidden">
        <MobileOrderSection product={product} />
      </div>

      {/* 탭 메뉴 - 모바일/태블릿 주문 섹션 하단 */}
      <ProductTabs
        tabs={PRODUCT_DETAIL_TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="mt-6"
      />
    </div>
  );
};
