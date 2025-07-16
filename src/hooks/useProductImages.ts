import { useState } from 'react';
import { PRODUCT_CONSTANTS } from '@/constants/product-constants';

interface UseProductImagesProps {
  images: string[];
  maxInitialImages?: number;
  enableHeightLimit?: boolean; // 높이 제한 기능 활성화 옵션 추가
}

export const useProductImages = ({
  images,
  maxInitialImages = PRODUCT_CONSTANTS.INITIAL_IMAGES.DESKTOP,
  enableHeightLimit = false, // 기본값은 false (기존 동작 유지)
}: UseProductImagesProps) => {
  const [showAllImages, setShowAllImages] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initialImages = images.slice(0, maxInitialImages);
  const remainingImages = images.slice(maxInitialImages);

  // 높이 제한 기능이 활성화되어 있거나, 이미지가 2개 이상이면 펼치기/접기 기능 활성화
  const hasMoreImages = enableHeightLimit || remainingImages.length > 0;

  const handleLoadMore = async () => {
    setIsLoading(true);
    // 실제 API 호출을 시뮬레이션하기 위한 지연
    await new Promise((resolve) => setTimeout(resolve, PRODUCT_CONSTANTS.LOADING_DELAY));
    setShowAllImages(true);
    setIsLoading(false);
  };

  const handleShowLess = () => {
    setShowAllImages(false);
  };

  const displayedImages = showAllImages ? images : initialImages;

  return {
    displayedImages,
    remainingImages,
    hasMoreImages,
    showAllImages,
    isLoading,
    handleLoadMore,
    handleShowLess,
  };
};
