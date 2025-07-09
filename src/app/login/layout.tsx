import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인',
  description: '우르르에 로그인하여 뷰티 공동구매를 시작하세요.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
