// 뷰티프로필 관련 상수들
export const BEAUTY_PROFILE_CONSTANTS = {
  // 상품 추천 요청 최대 길이
  PRODUCT_REQUEST_MAX_LENGTH: 500,
} as const;

// 피부 타입 옵션
export const SKIN_TYPE_OPTIONS = [
  { label: '지성', value: 'oily' },
  { label: '건성', value: 'dry' },
  { label: '복합성', value: 'combination' },
  { label: '민감성', value: 'sensitive' },
  { label: '약건성', value: 'slightly_dry' },
  { label: '트러블성', value: 'trouble' },
  { label: '중성', value: 'normal' },
] as const;

// 피부 톤 옵션
export const SKIN_TONE_OPTIONS = [
  { label: '쿨톤', value: 'cool' },
  { label: '웜톤', value: 'warm' },
  { label: '봄웜톤', value: 'spring_warm' },
  { label: '여름쿨톤', value: 'summer_cool' },
  { label: '가을웜톤', value: 'autumn_warm' },
  { label: '겨울쿨톤', value: 'winter_cool' },
  { label: '뉴트럴톤', value: 'neutral' },
] as const;

// 피부 고민 옵션
export const SKIN_CONCERN_OPTIONS = [
  { label: '잡티', value: 'blemishes' },
  { label: '미백', value: 'whitening' },
  { label: '주름', value: 'wrinkles' },
  { label: '각질', value: 'dead_skin' },
  { label: '트러블', value: 'trouble' },
  { label: '민감성', value: 'sensitive' },
  { label: '블랙헤드', value: 'blackheads' },
  { label: '피지과다', value: 'excess_oil' },
  { label: '모공', value: 'pores' },
  { label: '탄력', value: 'elasticity' },
  { label: '홍조', value: 'redness' },
  { label: '아토피', value: 'atopy' },
  { label: '다크서클', value: 'dark_circles' },
  { label: '없음', value: 'none' },
] as const;

// 이상 경험 여부 옵션
export const SKIN_REACTION_OPTIONS = [
  { label: '있음', value: 'yes' },
  { label: '없음', value: 'no' },
] as const;

// 관심 카테고리 옵션
export const INTEREST_CATEGORY_OPTIONS = [
  { label: '스킨케어', value: 'skincare' },
  { label: '마스크팩', value: 'mask' },
  { label: '클렌징', value: 'cleansing' },
  { label: '선케어', value: 'suncare' },
  { label: '메이크업', value: 'makeup' },
  { label: '향수', value: 'perfume' },
  { label: '헤어케어', value: 'haircare' },
  { label: '바디케어', value: 'bodycare' },
  { label: '없음', value: 'none' },
] as const;
