export const PRODUCT_STYLES = {
  // 이미지 관련 스타일
  image: {
    main: 'h-full w-full rounded-2xl border border-bg-200 object-cover',
    thumbnail: 'h-full w-full rounded-xl object-cover',
    detail: 'w-full object-cover',
    card: 'h-full w-full rounded-lg object-cover',
    error: 'flex h-full w-full items-center justify-center rounded-lg bg-gray-200',
    errorText: 'text-sm text-gray-500',
    drawer: 'h-16 w-16 rounded-lg object-cover md:h-20 md:w-20',
  },

  // 버튼 관련 스타일
  button: {
    scroll:
      'absolute top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-bg-200 bg-bg-100 shadow hover:bg-bg-200 md:h-10 md:w-10',
    back: 'flex h-10 w-10 items-center justify-center bg-bg-100 transition md:h-12 md:w-12',
    floating:
      'flex h-10 w-10 items-center justify-center rounded-lg border-bg-300 p-0 transition hover:bg-primary-100 focus:ring-primary-300 active:bg-primary-100 md:h-12 md:w-12',
    tab: 'flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm font-medium transition-all md:py-3 md:text-base',
    cart: 'flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border-primary-300 text-primary-300 transition hover:bg-primary-100 focus:ring-primary-300 active:bg-primary-100 md:h-12 md:text-sm',
    buyNow:
      'hover:bg-primary-400 active:bg-primary-500 flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-primary-300 text-text-on transition focus:ring-primary-300 md:h-12 md:text-sm',
    close: 'h-8 w-8 p-0 md:h-10 md:w-10',
  },

  // 탭 관련 스타일
  tab: {
    container: 'flex w-full rounded-lg bg-bg-200 p-1 max-w-none',
    active: 'bg-bg-100 text-text-100 shadow-sm',
    inactive: 'text-text-200 hover:text-text-100',
  },

  // 카드 관련 스타일
  card: {
    container: 'relative w-full overflow-hidden border-none bg-transparent shadow-none',
    content: 'space-y-3 p-0 pt-3',
    rankBadge: 'absolute left-2 top-2 z-[5]',
    deadlineInfo: 'flex items-center gap-2 rounded-lg bg-primary-100 px-3 py-2',
    deadlineIcon: 'h-3 w-3 flex-shrink-0 text-primary-300',
    deadlineText: 'text-sm text-primary-300',
    deadlineBold: 'font-semibold',
    productName: 'line-clamp-2 text-sm font-normal text-text-100',
    priceContainer: 'flex items-center gap-2',
    discountRate: 'text-lg font-bold text-primary-300',
    originalPrice: 'text-sm font-normal text-text-300 line-through',
    currentPrice: 'text-lg font-bold text-text-100',
  },

  // 랭킹 뱃지 스타일
  rankBadge: {
    1: 'bg-amber-400 text-white border-amber-400',
    2: 'bg-slate-300 text-white border-slate-300',
    3: 'bg-amber-600 text-white border-amber-600',
    default: 'bg-bg-200 text-text-200 border-border-200',
  },

  // Drawer 관련 스타일
  drawer: {
    header: 'flex items-center justify-center border-b border-bg-200 px-4 py-2',
    content: 'max-h-[60vh] overflow-y-auto px-4 py-4',
    optionTitle: 'mb-3 text-base font-medium text-text-100',
    totalInfo: 'mb-6 flex items-center justify-between border-t border-bg-200 pt-4',
    totalText: 'text-sm text-text-100',
    totalBold: 'font-semibold',
    totalPrice: 'text-lg font-semibold text-text-100',
    footer: 'border-t border-bg-200 px-4 py-4',
    selectedOptionsArea: 'mb-6 flex flex-col gap-3 max-h-40 overflow-y-auto',
  },

  // 컨테이너 관련 스타일
  container: {
    main: 'w-full',
    floating:
      'fixed bottom-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-between bg-bg-100 px-4 shadow-lg xl:hidden',
    drawer:
      'fixed bottom-0 left-0 right-0 z-70 w-full transform transition-transform duration-300 ease-in-out xl:hidden',
    drawerContent: 'w-full z-70 max-w-none rounded-t-3xl bg-bg-100',
  },

  // 오버레이 스타일
  overlay: 'fixed inset-0 z-[69] bg-black bg-opacity-50 transition-opacity duration-300 xl:hidden',

  // 블러 효과 스타일
  blur: 'pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent',
} as const;
