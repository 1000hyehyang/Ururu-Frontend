import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '히스토리 | 우르르',
  description: '최근에 조회한 상품들을 확인해보세요',
};

export default function HistoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
