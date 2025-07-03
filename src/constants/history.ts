export const HISTORY_CONSTANTS = {
  // 페이지 관련 상수
  PAGE: {
    TITLE: '최근 본 상품',
    DESCRIPTION: '최근에 조회한 상품들을 확인해보세요',
    EMPTY_TITLE: '최근 본 상품이 없어요',
    EMPTY_DESCRIPTION: '상품을 둘러보시면 여기에 표시됩니다',
  },

  // 정렬 관련 상수
  SORT: {
    DEFAULT: 'recent', // 최신순
    OPTIONS: {
      RECENT: 'recent',
      PRICE_LOW: 'price_low',
      PRICE_HIGH: 'price_high',
      DISCOUNT: 'discount',
    },
  },

  // 캐시 관련 상수
  CACHE: {
    MAX_ITEMS: 50, // 최대 저장할 히스토리 아이템 수
    EXPIRE_DAYS: 30, // 히스토리 만료 기간 (일)
  },
} as const;
