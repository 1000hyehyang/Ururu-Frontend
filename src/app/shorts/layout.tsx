import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '숏구 | 우르르',
  description: '우르르에서 인기 숏폼 상품들을 확인해보세요.',
  keywords: ['숏구', '숏폼', '인기상품', '우르르'],
  openGraph: {
    title: '숏구 | 우르르',
    description: '우르르에서 인기 숏폼 상품들을 확인해보세요.',
    type: 'website',
  },
};

export default function ShortsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
