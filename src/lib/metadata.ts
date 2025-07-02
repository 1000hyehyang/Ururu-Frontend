import type { Metadata, Viewport } from 'next';

// 환경변수에서 설정 가져오기
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || '우르르';
const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0';

export const siteConfig = {
  name: APP_NAME,
  description:
    '우르르에서 다양한 뷰티 상품을 공동구매로 더 저렴하게! 스킨케어, 메이크업, 화장품 공구 플랫폼',
  url: 'https://www.ururu.shop',
  ogImage: 'https://www.ururu.shop/og-image.png',
  themeColor: '#ff6986',
  keywords: [
    '우르르',
    '뷰티 공동구매',
    '화장품 공구',
    '스킨케어',
    '메이크업',
    '밤코딩단',
    '뷰티 커머스',
  ],
  authors: [{ name: '우르르', url: 'https://www.ururu.shop' }],
  version: APP_VERSION,
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: '밤코딩단',
  publisher: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32', type: 'image/x-icon' },
      { url: '/icon0.svg', type: 'image/svg+xml' },
      { url: '/icon1.png', sizes: '192x192', type: 'image/png' },
      { url: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
    other: [{ rel: 'mask-icon', url: '/icon0.svg', color: '#ff6986' }],
  },
  manifest: '/manifest.json',
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: '우르르 - 뷰티 공동구매 플랫폼',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@ururu',
    site: '@ururu',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  appleWebApp: {
    capable: true,
    title: siteConfig.name,
    statusBarStyle: 'default',
    startupImage: [
      {
        url: '/web-app-manifest-512x512.png',
        media:
          '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/web-app-manifest-512x512.png',
        media:
          '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/web-app-manifest-512x512.png',
        media:
          '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)',
      },
    ],
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        other: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION
          ? {
              'naver-site-verification': process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION,
            }
          : undefined,
      }
    : undefined,
  category: 'shopping',
  classification: '뷰티 커머스',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': siteConfig.name,
    'application-name': siteConfig.name,
    'msapplication-TileColor': siteConfig.themeColor,
    'msapplication-config': '/browserconfig.xml',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  themeColor: siteConfig.themeColor,
  colorScheme: 'light',
  viewportFit: 'cover',
};
