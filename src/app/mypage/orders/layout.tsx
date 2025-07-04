import { MyPageLayout } from '@/components/mypage/MyPageLayout';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/metadata';

export const metadata: Metadata = {
  title: '주문/배송 조회',
  description: '내가 주문한 상품의 배송 현황과 공구 진행 상태를 한눈에 확인하세요.',
  openGraph: {
    title: '주문/배송 조회',
    description: '내가 주문한 상품의 배송 현황과 공구 진행 상태를 한눈에 확인하세요.',
    url: `${siteConfig.url}/mypage/orders`,
    siteName: siteConfig.name,
    images: [siteConfig.ogImage],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '주문/배송 조회',
    description: '내가 주문한 상품의 배송 현황과 공구 진행 상태를 한눈에 확인하세요.',
    images: [siteConfig.ogImage],
  },
};

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return <MyPageLayout>{children}</MyPageLayout>;
}
