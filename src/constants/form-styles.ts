// 폼 관련 공통 스타일 상수
export const FORM_STYLES = {
  // 입력 필드 기본 스타일
  input: {
    base: 'h-12 rounded-lg border-bg-300 bg-bg-100 px-4 py-3 text-sm text-text-100 placeholder:text-text-300 focus:border-primary-300 focus:ring-2 focus:ring-primary-300',
    focus:
      'focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-0',
  },

  // 라벨 스타일
  label: {
    base: 'mb-2 block text-sm font-medium text-text-100',
    required: 'text-primary-300',
  },

  // 버튼 스타일
  button: {
    pinkOutline:
      'h-10 px-4 rounded-lg border border-primary-300 bg-bg-100 text-primary-300 text-sm font-medium hover:bg-primary-100 transition',
    submit:
      'h-12 w-full rounded-lg border border-primary-300 bg-bg-100 text-primary-300 transition-colors hover:bg-primary-100 disabled:border-bg-300 disabled:text-text-300 disabled:hover:bg-bg-100',
  },

  // 헬퍼 텍스트 스타일
  helperText: {
    base: 'text-xs text-text-300',
    success: 'text-xs text-primary-300',
    error: 'text-xs text-red-500',
  },

  // 우편번호 입력 필드 스타일
  zipcode: {
    display:
      'flex h-12 min-w-0 flex-1 items-center rounded-lg border border-bg-300 bg-bg-200 px-4 text-sm text-text-300',
  },

  // 체크박스 스타일
  checkbox: {
    base: 'custom-checkbox mr-3 mt-0.5',
  },
} as const;
