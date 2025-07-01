import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '뷰티프로필 수정',
  description: '우르르 뷰티프로필을 수정하여 맞춤형 뷰티 서비스를 받아보세요.',
  keywords: ['뷰티프로필', '피부타입', '피부톤', '피부고민', '우르르'],
  openGraph: {
    title: '뷰티프로필 수정 | 우르르',
    description: '우르르 뷰티프로필을 수정하여 맞춤형 뷰티 서비스를 받아보세요.',
    type: 'website',
  },
  robots: {
    index: false, // 마이페이지는 검색엔진에서 제외
    follow: false,
  },
};

export default function BeautyProfileEditLayout({ children }: { children: React.ReactNode }) {
  return children;
}
