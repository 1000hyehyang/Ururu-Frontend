import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '주문/결제 | 우르르',
  description: '주문/결제 페이지입니다.',
};

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
