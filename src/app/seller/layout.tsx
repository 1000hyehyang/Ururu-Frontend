import { Metadata } from 'next';
import { SellerSidebar } from '@/components/seller/SellerSidebar';

export const metadata: Metadata = {
  title: '판매자 센터',
  description: '우르르 판매자 센터에서 상품을 관리하고 공구를 진행하세요.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <SellerSidebar />
      <main className="ml-72 flex-1">{children}</main>
    </div>
  );
}
