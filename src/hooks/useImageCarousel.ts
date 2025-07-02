import { useState, useRef, useEffect } from 'react';
import { THUMBNAIL_SCROLL_AMOUNT, SCROLL_OFFSET_TOLERANCE } from '@/constants/product-detail';
import { DEFAULT_PRODUCT_IMAGE } from '@/data/mock-product';

interface UseImageCarouselProps {
  images: string[];
  initialImage?: string;
}

export const useImageCarousel = ({ images, initialImage }: UseImageCarouselProps) => {
  // 빈 배열 안전장치: images가 비어있으면 기본 이미지 사용
  const safeImages = images.length > 0 ? images : [DEFAULT_PRODUCT_IMAGE];
  const safeInitialImage = initialImage || safeImages[0];

  const [mainImage, setMainImage] = useState(safeInitialImage);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const thumbScrollRef = useRef<HTMLDivElement>(null);

  // 스크롤 가능 여부 확인
  const checkScrollButtons = () => {
    const el = thumbScrollRef.current;
    if (!el) return;

    const canScrollLeft = el.scrollLeft > 0;
    const canScrollRight =
      el.scrollLeft < el.scrollWidth - el.clientWidth - SCROLL_OFFSET_TOLERANCE;

    setCanScrollLeft(canScrollLeft);
    setCanScrollRight(canScrollRight);
  };

  // 캐러셀 좌우 이동 (데스크탑)
  const scrollThumbnails = (dir: 'left' | 'right') => {
    const el = thumbScrollRef.current;
    if (!el) return;

    const scrollAmount = THUMBNAIL_SCROLL_AMOUNT;
    const currentScroll = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;

    if (dir === 'left') {
      const newScroll = Math.max(0, currentScroll - scrollAmount);
      el.scrollTo({ left: newScroll, behavior: 'smooth' });
    } else {
      const newScroll = Math.min(maxScroll, currentScroll + scrollAmount);
      el.scrollTo({ left: newScroll, behavior: 'smooth' });
    }

    // 스크롤 후 버튼 상태 업데이트
    setTimeout(checkScrollButtons, 300);
  };

  // 메인 이미지 변경 (안전한 이미지 배열 사용)
  const changeMainImage = (imageUrl: string) => {
    if (safeImages.includes(imageUrl)) {
      setMainImage(imageUrl);
    }
  };

  // 컴포넌트 마운트 시 스크롤 버튼 상태 확인
  useEffect(() => {
    checkScrollButtons();

    // 윈도우 리사이즈 시에도 확인
    const handleResize = () => {
      setTimeout(checkScrollButtons, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    mainImage,
    setMainImage: changeMainImage,
    canScrollLeft,
    canScrollRight,
    thumbScrollRef,
    checkScrollButtons,
    scrollThumbnails,
    images: safeImages, // 안전한 이미지 배열 반환
  };
};
