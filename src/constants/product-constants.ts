export const PRODUCT_CONSTANTS = {
  // 이미지 관련 상수
  IMAGE: {
    MAIN_WIDTH: 480,
    MAIN_HEIGHT: 480,
    THUMBNAIL_WIDTH: 120,
    THUMBNAIL_HEIGHT: 120,
    DETAIL_WIDTH: 1200,
    DETAIL_HEIGHT: 800,
  },

  // 초기 표시 이미지 수
  INITIAL_IMAGES: {
    DESKTOP: 1,
    MOBILE: 'all', // 모바일에서는 모든 이미지 표시
  },

  // 로딩 지연 시간 (ms)
  LOADING_DELAY: 500,

  // 최대 이미지 수
  MAX_IMAGES: {
    THUMBNAILS: 10,
    DETAIL: 20,
  },

  // 썸네일 스크롤 관련 상수
  THUMBNAIL: {
    SCROLL_AMOUNT: 120 * 3, // 썸네일 3개씩 이동
    SCROLL_OFFSET_TOLERANCE: 1, // 스크롤 오차 허용값
  },
} as const;
