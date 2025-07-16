'use client';

import React from 'react';
import type { Product } from '@/types/product';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { MobileOrderSection } from './OrderBox';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useImageCarousel, useProductTabs, useProductOptions } from '@/hooks';
import { ProductTabs } from './ProductTabs';
import { ProductDetailImages } from './ProductDetailImages';
import { PRODUCT_DETAIL_TABS } from '@/constants/product-detail';
import { PRODUCT_STYLES } from '@/constants/product-styles';
import { PRODUCT_CONSTANTS } from '@/constants/product-constants';
import { ProductPurchaseInfoSection } from './ProductPurchaseInfoSection';

interface DetailMainProps {
  product: Product;
}

export const DetailMain = ({ product }: DetailMainProps) => {
  const { activeTab, handleTabChange } = useProductTabs();
  const { selectedOptions, handleSelectOption } = useProductOptions(product);
  const router = useRouter();

  // 메인 이미지, 썸네일, 옵션 이미지만 포함 (detailImages 제외)
  const allThumbnails = [
    product.mainImage, // 메인 이미지 포함
    ...product.thumbnails.filter((img) => img !== product.mainImage), // 중복 제거
    ...product.options
      .filter((option) => option.imageUrl) // 이미지가 있는 옵션만
      .map((option) => option.imageUrl!),
  ];

  const {
    mainImage,
    setMainImage,
    canScrollLeft,
    canScrollRight,
    thumbScrollRef,
    checkScrollButtons,
    scrollThumbnails,
    images: safeImages,
  } = useImageCarousel({
    images: allThumbnails,
    initialImage: product.mainImage,
  });

  const handleGoBack = () => {
    router.back();
  };

  // 썸네일 클릭 핸들러
  const handleThumbnailClick = (imageUrl: string, index: number) => {
    // 메인 이미지 변경 (안전장치 제거하여 직접 설정)
    setMainImage(imageUrl);

    // 옵션 이미지인 경우 해당 옵션 선택
    // 메인 이미지(1개) + 썸네일들 이후부터 옵션 이미지 시작
    const thumbnailCount = 1 + product.thumbnails.filter((img) => img !== product.mainImage).length;
    const optionIndex = index - thumbnailCount;
    if (optionIndex >= 0 && optionIndex < product.options.length) {
      const option = product.options[optionIndex];
      if (option && !selectedOptions.some((selected) => selected.value === option.id)) {
        handleSelectOption(option.id);
      }
    }
  };

  return (
    <div className="w-full">
      {/* 모바일/태블릿 이전 페이지 버튼 */}
      <div className="mb-4 flex items-center xl:hidden">
        <button
          type="button"
          onClick={handleGoBack}
          className={PRODUCT_STYLES.button.back}
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
            width={PRODUCT_CONSTANTS.IMAGE.MAIN_WIDTH}
            height={PRODUCT_CONSTANTS.IMAGE.MAIN_HEIGHT}
            className={PRODUCT_STYLES.image.main}
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
            {safeImages.map((thumb, idx) => {
              // 메인 이미지(1개) + 썸네일들 이후부터 옵션 이미지 시작
              const thumbnailCount =
                1 + product.thumbnails.filter((img) => img !== product.mainImage).length;
              const isOptionThumbnail = idx >= thumbnailCount;
              const optionIndex = idx - thumbnailCount;
              const option = isOptionThumbnail ? product.options[optionIndex] : null;

              // 현재 선택된 이미지인지 확인 (메인 이미지와 비교)
              const isCurrentImage = thumb === mainImage;
              // 옵션 선택 상태 확인
              const isOptionSelected = option
                ? selectedOptions.some((selected) => selected.value === option.id)
                : false;

              return (
                <button
                  key={thumb}
                  onClick={() => handleThumbnailClick(thumb, idx)}
                  className="min-h-[64px] min-w-[64px] overflow-hidden rounded-xl transition-all hover:opacity-80 md:min-h-[80px] md:min-w-[80px] lg:min-h-[120px] lg:min-w-[120px]"
                  style={{ aspectRatio: '1 / 1' }}
                  aria-label={isOptionThumbnail ? `${option?.name} 옵션` : `상품 이미지 ${idx + 1}`}
                >
                  <Image
                    src={thumb}
                    alt={isOptionThumbnail ? `${option?.name} 옵션` : `상품 이미지 ${idx + 1}`}
                    width={PRODUCT_CONSTANTS.IMAGE.THUMBNAIL_WIDTH}
                    height={PRODUCT_CONSTANTS.IMAGE.THUMBNAIL_HEIGHT}
                    className={PRODUCT_STYLES.image.thumbnail}
                  />
                  {/* 옵션 선택 표시 제거 - ring-2 테두리로 충분히 구분됨 */}
                </button>
              );
            })}
          </div>

          {/* 좌우 스크롤 버튼 (데스크탑만) */}
          {canScrollLeft && (
            <button
              type="button"
              className={`${PRODUCT_STYLES.button.scroll} left-0 hidden md:flex`}
              onClick={() => scrollThumbnails('left')}
              aria-label="이전 썸네일"
            >
              <ChevronLeft className="h-4 w-4 text-text-300 md:h-5 md:w-5" />
            </button>
          )}
          {canScrollRight && (
            <button
              type="button"
              className={`${PRODUCT_STYLES.button.scroll} right-0 hidden md:flex`}
              onClick={() => scrollThumbnails('right')}
              aria-label="다음 썸네일"
            >
              <ChevronRight className="h-4 w-4 text-text-300 md:h-5 md:w-5" />
            </button>
          )}
        </div>
      </div>

      {/* 모바일/태블릿용 주문 섹션 - 썸네일 하단, 탭 메뉴 위 */}
      <div className="mt-6 w-full max-w-none xl:hidden">
        <MobileOrderSection product={product} />
      </div>

      {/* 탭 메뉴 - 모바일/태블릿 주문 섹션 하단 */}
      <ProductTabs
        tabs={PRODUCT_DETAIL_TABS}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        className="mt-6"
      />

      {/* 상품 상세 이미지들 - 탭 메뉴 하단 */}
      {activeTab === 0 && <ProductDetailImages product={product} className="mt-6" />}

      {/* 구매정보 탭: 상품정보 제공고시/교환환불 안내 */}
      {activeTab === 1 && <ProductPurchaseInfoSection product={product} />}
    </div>
  );
};
