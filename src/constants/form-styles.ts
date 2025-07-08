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
    refundButton:
      'h-10 px-4 rounded-lg border border-primary-200 bg-bg-100 text-primary-200 text-sm font-medium hover:bg-primary-100 transition shadow-none',
    deliveryButton:
      'h-10 px-4 rounded-lg border border-primary-300 bg-primary-300 text-text-on text-sm font-medium hover:opacity-80 transition-opacity shadow-none',
    submit:
      'h-12 w-full rounded-lg border border-primary-300 bg-bg-100 text-primary-300 transition-colors hover:bg-primary-100 disabled:border-bg-300 disabled:text-text-300 disabled:hover:bg-bg-100',
    // 프로필 카드 버튼 스타일
    profileCard:
      'h-10 w-full rounded-lg border-bg-300 bg-bg-100 px-1 text-sm font-medium text-text-300 hover:border-primary-300 hover:text-primary-300 md:rounded-xl md:px-2',
    // 배송지 추가 버튼 스타일
    addressAdd:
      'h-12 w-full rounded-lg border border-bg-300 bg-bg-100 text-text-300 transition-colors hover:border-primary-300 hover:text-primary-300 hover:bg-bg-100 disabled:border-bg-300 disabled:text-text-300 disabled:hover:bg-bg-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-300 [&:hover]:border-primary-300 [&:hover]:text-primary-300',
    // 선택형 버튼 스타일
    selectable: {
      base: 'h-12 rounded-lg border text-sm font-medium transition',
      selected: 'border-primary-300 bg-primary-100 text-primary-300',
      unselected: 'border-bg-300 bg-bg-100 text-text-300 hover:bg-bg-200',
    },
    // 판매자 대시보드 버튼 스타일
    seller: {
      primary: 'bg-primary-300 text-text-on hover:bg-primary-200',
      outline: 'border border-primary-300 bg-bg-100 text-primary-300 hover:bg-primary-100',
      ghost: 'text-text-200 hover:text-text-100 hover:bg-bg-200',
      action:
        'h-8 w-8 rounded-lg border border-bg-300 bg-bg-100 text-text-300 hover:border-primary-300 hover:text-primary-300',
    },
  },

  // 헬퍼 텍스트 스타일
  helperText: {
    base: 'text-xs text-text-300',
    success: 'text-xs text-primary-300',
    error: 'text-xs text-primary-200',
  },

  // 우편번호 입력 필드 스타일
  zipcode: {
    display:
      'flex h-12 min-w-0 flex-1 items-center rounded-lg border border-bg-300 bg-bg-200 px-4 text-sm text-text-300',
  },

  // 체크박스 스타일
  checkbox: {
    base: 'custom-checkbox mt-0.5',
    // 체크박스 컨테이너 스타일 (체크박스 + 라벨)
    container: 'flex items-start gap-3',
    // 체크박스 라벨 스타일
    label: 'text-sm text-text-200 leading-relaxed',
  },

  // textarea 스타일
  textarea: {
    base: 'h-12 rounded-lg border border-bg-300 bg-bg-100 px-4 py-3 text-sm text-text-100 placeholder:text-text-300 focus:border-primary-300 focus:ring-1 focus:ring-primary-300',
    focus:
      'focus:border-primary-300 focus:outline-none focus:ring-1 focus:ring-primary-300 focus:ring-offset-0',
  },

  // 카드 스타일
  card: {
    base: 'w-full rounded-2xl border-0 bg-bg-100 py-6 shadow-none lg:px-8',
    content: 'p-0',
    // 판매자 대시보드 카드 스타일
    seller: 'border-bg-300 bg-bg-100',
  },

  // 호버 스타일
  hover: {
    bg200: 'hover:bg-bg-200',
    bg100: 'hover:bg-bg-100',
    primary100: 'hover:bg-primary-100',
  },

  // 판매자 대시보드 전용 스타일
  seller: {
    // 검색 필드 스타일
    search: {
      container: 'relative flex-1 max-w-md',
      input: 'pl-10',
      icon: 'absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-300',
    },
    // 필터 스타일
    filter: {
      container: 'flex items-center gap-2',
      select:
        'rounded-lg border border-bg-300 bg-bg-100 px-3 py-2 text-sm text-text-100 focus:border-primary-300 focus:outline-none',
    },
    // 통계 카드 스타일
    stats: {
      container: 'grid grid-cols-2 gap-4 md:grid-cols-5',
      card: 'border-bg-300 bg-bg-100',
      content: 'p-4 text-center',
      value: 'text-2xl font-bold text-text-100',
      label: 'text-sm text-text-200',
    },
    // 액션 메뉴 스타일
    actionMenu: {
      container: 'relative',
      button: 'h-8 w-8',
      dropdown:
        'absolute right-0 top-full z-10 mt-1 w-32 rounded-lg border border-bg-300 bg-bg-100 shadow-lg',
      item: 'flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-bg-200',
      danger: 'text-red-600 hover:text-red-700',
    },
    // 진행률 바 스타일
    progress: {
      container: 'h-2 w-full rounded-full bg-bg-200',
      bar: 'h-2 rounded-full bg-primary-300 transition-all',
    },
    // 이미지 스타일
    image: {
      container: 'relative h-20 w-20 flex-shrink-0',
      img: 'rounded-lg object-cover',
    },
    // 텍스트 스타일
    text: {
      title: 'truncate font-semibold text-text-100',
      subtitle: 'text-sm text-text-200',
      price: 'text-lg font-bold text-primary-300',
      originalPrice: 'text-sm text-text-300 line-through',
      label: 'text-text-200',
      value: 'text-text-100',
    },
  },
} as const;
