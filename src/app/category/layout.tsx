import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '카테고리',
  description: '우르르에서 원하는 카테고리의 뷰티 상품을 찾아보세요.',
  keywords: [
    '카테고리',
    '스킨케어',
    '마스크팩',
    '클렌징',
    '메이크업',
    '향수',
    '헤어케어',
    '바디케어',
    '우르르',
  ],
  openGraph: {
    title: '카테고리 | 우르르',
    description: '우르르에서 원하는 카테고리의 뷰티 상품을 찾아보세요.',
    type: 'website',
  },
};

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
