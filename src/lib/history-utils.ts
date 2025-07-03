import type { Product } from '@/types/product';
import { HISTORY_CONSTANTS } from '@/constants/history';

/**
 * 히스토리 상품을 정렬하는 함수
 */
export const sortHistoryProducts = (
  products: Product[],
  sortBy: string = HISTORY_CONSTANTS.SORT.DEFAULT,
): Product[] => {
  if (!Array.isArray(products)) return [];

  const sortedProducts = [...products];

  switch (sortBy) {
    case HISTORY_CONSTANTS.SORT.OPTIONS.RECENT:
      // 최신순 (id 기준, 실제로는 조회 시간 기준)
      return sortedProducts.sort((a, b) => {
        const aId = parseInt(String(a.id)) || 0;
        const bId = parseInt(String(b.id)) || 0;
        return bId - aId;
      });

    case HISTORY_CONSTANTS.SORT.OPTIONS.PRICE_LOW:
      // 가격 낮은순
      return sortedProducts.sort((a, b) => (a.price || 0) - (b.price || 0));

    case HISTORY_CONSTANTS.SORT.OPTIONS.PRICE_HIGH:
      // 가격 높은순
      return sortedProducts.sort((a, b) => (b.price || 0) - (a.price || 0));

    case HISTORY_CONSTANTS.SORT.OPTIONS.DISCOUNT:
      // 할인율 높은순
      return sortedProducts.sort((a, b) => (b.discountRate || 0) - (a.discountRate || 0));

    default:
      return sortedProducts;
  }
};

/**
 * 히스토리 상품 개수를 제한하는 함수
 */
export const limitHistoryProducts = (products: Product[], limit?: number): Product[] => {
  if (!Array.isArray(products)) return [];

  const maxItems = limit || HISTORY_CONSTANTS.CACHE.MAX_ITEMS;
  return products.slice(0, Math.max(0, maxItems));
};

/**
 * 히스토리 상품이 유효한지 확인하는 함수
 */
export const isValidHistoryProduct = (product: Product): boolean => {
  if (!product || typeof product !== 'object') return false;

  return (
    !!product.id &&
    !!product.name &&
    !!product.mainImage &&
    typeof product.price === 'number' &&
    product.price > 0 &&
    typeof product.originalPrice === 'number' &&
    product.originalPrice > 0 &&
    typeof product.remainingDays === 'number' &&
    product.remainingDays >= 0
  );
};

/**
 * 히스토리 상품들을 필터링하는 함수
 */
export const filterValidHistoryProducts = (products: Product[]): Product[] => {
  if (!Array.isArray(products)) return [];
  return products.filter(isValidHistoryProduct);
};
