import type { Metadata, Viewport } from 'next';

// 환경변수에서 설정 가져오기
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || '우르르';
const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0';

export const siteConfig = {
  name: APP_NAME,
  description: '뷰티 공동구매 커머스 플랫폼',
  url: 'https://ururu-beauty.vercel.app',
  ogImage: 'https://ururu-beauty.vercel.app/og-image.png',
  themeColor: '#ff6986',
  keywords: ['우르르', '뷰티 공동구매', '화장품 공구', '밤코딩단'],
  authors: [{ name: '우르르' }],
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
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/favicon.ico'],
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
        alt: '우르르 OG 이미지',
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
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: siteConfig.themeColor,
};
