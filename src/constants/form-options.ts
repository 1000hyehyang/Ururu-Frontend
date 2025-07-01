// 폼에서 사용하는 옵션들
export const GENDER_OPTIONS = [
  { label: '여성', value: 'female' },
  { label: '남성', value: 'male' },
  { label: '선택 안함', value: 'none' },
] as const;

// 약관 동의 기본값
export const DEFAULT_AGREEMENTS = {
  terms: true,
  privacy: true,
  marketing: false,
  location: false,
};
