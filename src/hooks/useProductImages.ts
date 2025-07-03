import { useState } from 'react';
import { PRODUCT_CONSTANTS } from '@/constants/product-constants';

interface UseProductImagesProps {
  images: string[];
  maxInitialImages?: number;
}

export const useProductImages = ({
  images,
  maxInitialImages = PRODUCT_CONSTANTS.INITIAL_IMAGES.DESKTOP,
}: UseProductImagesProps) => {
  const [showAllImages, setShowAllImages] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initialImages = images.slice(0, maxInitialImages);
  const remainingImages = images.slice(maxInitialImages);
  const hasMoreImages = remainingImages.length > 0;

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
