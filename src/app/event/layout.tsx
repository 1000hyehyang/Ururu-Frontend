import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이벤트 | 우르르',
  description: '우르르에서 진행 중인 다양한 이벤트를 확인해보세요.',
  keywords: ['이벤트', '프로모션', '할인', '우르르'],
  openGraph: {
    title: '이벤트 | 우르르',
    description: '우르르에서 진행 중인 다양한 이벤트를 확인해보세요.',
    type: 'website',
  },
};

export default function EventLayout({ children }: { children: React.ReactNode }) {
  return children;
}
