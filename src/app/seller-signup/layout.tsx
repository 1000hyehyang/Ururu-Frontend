import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '판매자 회원가입',
  description: '우르르와 함께 성장하는 비즈니스를 경험하세요.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SellerSignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
