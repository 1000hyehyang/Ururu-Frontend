'use client';

import React from 'react';
import { LoadMoreButton } from './LoadMoreButton';
import { ProductImage } from './ProductImage';
import { useProductImages } from '@/hooks';
import { PRODUCT_STYLES } from '@/constants/product-styles';
import { PRODUCT_CONSTANTS } from '@/constants/product-constants';
import type { Product } from '@/types/product';

interface ProductDetailImagesProps {
  product: Product;
  className?: string;
  maxInitialImages?: number;
  enableHeightLimit?: boolean; // 높이 제한 기능 활성화 옵션 추가
}

export const ProductDetailImages: React.FC<ProductDetailImagesProps> = ({
  product,
  className = '',
  maxInitialImages = PRODUCT_CONSTANTS.INITIAL_IMAGES.DESKTOP,
  enableHeightLimit = true, // 기본값을 true로 설정하여 높이 제한 기능 활성화
}) => {
  const {
    displayedImages,
    hasMoreImages,
    showAllImages,
    isLoading,
    handleLoadMore,
    handleShowLess,
  } = useProductImages({
    images: product.detailImages,
    maxInitialImages,
    enableHeightLimit, // 높이 제한 기능 전달
  });

  return (
    <div className={`w-full ${className}`}>
      {/* 모바일/태블릿: 모든 이미지 표시 */}
      <div className="lg:hidden">
        {product.detailImages.map((imageSrc, index) => (
          <ProductImage
            key={index}
            src={imageSrc}
            alt={`${product.name} 상세 이미지 ${index + 1}`}
            priority={index < 2}
          />
        ))}
      </div>

      {/* 데스크탑: 조건부 이미지 표시 */}
      <div className="hidden lg:block">
        {/* 높이 제한이 활성화된 경우 컨테이너에 max-height 적용 */}
        <div className={enableHeightLimit && !showAllImages ? 'max-h-[800px] overflow-hidden' : ''}>
          {displayedImages.map((imageSrc, index) => (
            <div key={index} className="relative">
              <ProductImage
                src={imageSrc}
                alt={`${product.name} 상세 이미지 ${index + 1}`}
                priority={index < 2}
              />

              {/* 첫 번째 이미지에만 블러 효과 적용 (높이 제한이 활성화된 경우) */}
              {index === 0 && hasMoreImages && !showAllImages && enableHeightLimit && (
                <>
                  {/* 블러 효과 오버레이 */}
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent" />
                </>
              )}
            </div>
          ))}
        </div>

        {/* 펼치기 버튼 */}
        {hasMoreImages && !showAllImages && (
          <div className="flex justify-center py-6">
            <LoadMoreButton
              isLoading={isLoading}
              onLoadMore={handleLoadMore}
              onShowLess={handleShowLess}
              showAll={showAllImages}
            />
          </div>
        )}

        {/* 접기 버튼 */}
        {showAllImages && hasMoreImages && (
          <div className="flex justify-center py-6">
            <LoadMoreButton
              isLoading={isLoading}
              onLoadMore={handleLoadMore}
              onShowLess={handleShowLess}
              showAll={showAllImages}
            />
          </div>
        )}
      </div>
    </div>
  );
};
