import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '마이페이지',
  description: '우르르 마이페이지에서 주문 내역, 포인트, 프로필을 관리하세요.',
  keywords: ['마이페이지', '주문 내역', '포인트', '프로필', '우르르'],
  openGraph: {
    title: '마이페이지 | 우르르',
    description: '우르르 마이페이지에서 주문 내역, 포인트, 프로필을 관리하세요.',
    type: 'website',
  },
  robots: {
    index: false, // 마이페이지는 검색엔진에서 제외
    follow: false,
  },
};

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
