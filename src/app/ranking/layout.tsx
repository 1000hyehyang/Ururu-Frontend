import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '랭킹 TOP 100 | 우르르',
  description:
    '인기 상품들을 카테고리별로 확인해보세요! 스킨케어, 마스크팩, 클렌징, 선케어, 메이크업 등 다양한 카테고리의 랭킹 상품을 만나보세요.',
  keywords:
    '랭킹, 인기상품, 스킨케어, 마스크팩, 클렌징, 선케어, 메이크업, 향수, 헤어케어, 바디케어',
  openGraph: {
    title: '랭킹 TOP 100 | 우르르',
    description: '인기 상품들을 카테고리별로 확인해보세요!',
    type: 'website',
    url: '/ranking',
  },
};

export default function RankingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
