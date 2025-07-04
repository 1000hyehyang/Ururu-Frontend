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
}

export const ProductDetailImages: React.FC<ProductDetailImagesProps> = ({
  product,
  className = '',
  maxInitialImages = PRODUCT_CONSTANTS.INITIAL_IMAGES.DESKTOP,
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
        {displayedImages.map((imageSrc, index) => (
          <div key={index} className="relative">
            <ProductImage
              src={imageSrc}
              alt={`${product.name} 상세 이미지 ${index + 1}`}
              priority={index < 2}
            />

            {/* 첫 번째 이미지에만 블러 효과와 버튼 적용 */}
            {index === 0 && hasMoreImages && !showAllImages && (
              <>
                {/* 블러 효과 오버레이 */}
                <div className={PRODUCT_STYLES.blur} />

                {/* 펼치기 버튼 */}
                <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
                  <LoadMoreButton
                    isLoading={isLoading}
                    onLoadMore={handleLoadMore}
                    onShowLess={handleShowLess}
                    showAll={showAllImages}
                  />
                </div>
              </>
            )}
          </div>
        ))}

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
