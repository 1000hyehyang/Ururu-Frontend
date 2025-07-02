export const PRODUCT_DETAIL_TABS = [
  { label: '상품설명' },
  { label: '구매정보' },
  { label: '리뷰(999+)' },
  { label: 'Q&A' },
];

export const THUMBNAIL_SCROLL_AMOUNT = 120 * 3; // 썸네일 3개씩 이동
export const SCROLL_OFFSET_TOLERANCE = 1; // 스크롤 오차 허용값

// 브레드크럼 아이템 타입
export interface BreadcrumbItem {
  label: string;
  href: string;
}

// 브레드크럼 데이터 - 카테고리별 매핑
export const CATEGORY_BREADCRUMB_MAP = {
  skincare: [{ label: '스킨케어', href: '/category/skincare' }],
  'skincare-skin-toner': [
    { label: '스킨케어', href: '/category/skincare' },
    { label: '스킨/토너', href: '/category/skincare/skin-toner' },
  ],
  makeup: [{ label: '메이크업', href: '/category/makeup' }],
  'makeup-lip': [
    { label: '메이크업', href: '/category/makeup' },
    { label: '립 메이크업', href: '/category/makeup/lip' },
  ],
};

// 기본 브레드크럼 (카테고리 정보가 없을 때)
export const DEFAULT_PRODUCT_BREADCRUMB = [
  { label: '스킨케어', href: '/category/skincare' },
  { label: '스킨/토너', href: '/category/skincare/skin-toner' },
];

// 브레드크럼 생성 유틸리티 함수
export const generateBreadcrumb = (category: { main: string; sub?: string }): BreadcrumbItem[] => {
  const mainCategory =
    CATEGORY_BREADCRUMB_MAP[category.main as keyof typeof CATEGORY_BREADCRUMB_MAP];

  if (!mainCategory) {
    return DEFAULT_PRODUCT_BREADCRUMB;
  }

  if (!category.sub) {
    return mainCategory;
  }

  const subCategoryKey = `${category.main}-${category.sub}` as keyof typeof CATEGORY_BREADCRUMB_MAP;
  const subCategory = CATEGORY_BREADCRUMB_MAP[subCategoryKey];

  return subCategory || mainCategory;
};
