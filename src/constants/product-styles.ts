export const PRODUCT_STYLES = {
  // 이미지 관련 스타일
  image: {
    main: 'h-full w-full rounded-2xl border border-bg-200 object-cover',
    thumbnail: 'h-full w-full rounded-xl object-cover',
    detail: 'w-full object-cover',
  },

  // 버튼 관련 스타일
  button: {
    scroll:
      'absolute top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-bg-200 bg-bg-100 shadow hover:bg-bg-200 md:h-10 md:w-10',
    back: 'flex h-10 w-10 items-center justify-center bg-bg-100 transition md:h-12 md:w-12',
    floating:
      'flex h-10 w-10 items-center justify-center rounded-lg border-bg-300 p-0 transition hover:bg-primary-100 focus:ring-primary-300 active:bg-primary-100 md:h-12 md:w-12',
  },

  // 컨테이너 관련 스타일
  container: {
    main: 'w-full',
    floating:
      'fixed bottom-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-between bg-bg-100 px-4 shadow-lg md:h-20 md:px-6 lg:hidden',
    drawer:
      'fixed bottom-0 left-0 right-0 z-[70] w-full transform transition-transform duration-300 ease-in-out lg:hidden',
    drawerContent: 'w-full max-w-none rounded-t-3xl bg-bg-100 md:max-w-none',
  },

  // 오버레이 스타일
  overlay: 'fixed inset-0 z-[60] bg-black bg-opacity-50 transition-opacity duration-300 lg:hidden',

  // 블러 효과 스타일
  blur: 'pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent',
} as const;
