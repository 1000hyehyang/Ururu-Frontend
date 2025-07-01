import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '배송지 등록',
  description: '우르르에서 새로운 배송지를 등록하세요.',
  keywords: ['배송지', '주소', '등록', '우르르'],
  openGraph: {
    title: '배송지 등록 | 우르르',
    description: '우르르에서 새로운 배송지를 등록하세요.',
    type: 'website',
  },
  robots: {
    index: false, // 마이페이지는 검색엔진에서 제외
    follow: false,
  },
};

export default function AddressRegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
