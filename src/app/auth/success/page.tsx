'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store';
import { CustomLayout } from '@/components/layout';

export default function AuthSuccessPage() {
  const { login, checkAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // 인증 상태 확인
        await checkAuth();

        // 성공 시 적절한 페이지로 리다이렉트
        // checkAuth에서 이미 user 정보를 store에 저장했으므로
        // store의 user 정보를 확인하여 리다이렉트
        const { user } = useAuthStore.getState();

        if (user) {
          if (user.user_type === 'SELLER') {
            router.push('/seller');
          } else {
            router.push('/mypage');
          }
        } else {
          throw new Error('Invalid auth response structure');
        }
      } catch (error) {
        console.error('Auth status check failed:', error);

        // 에러 메시지에 "탈퇴" 관련 문구가 포함되어 있는지 확인
        const errorMessage = error instanceof Error ? error.message : '';
        if (
          errorMessage.includes('탈퇴') ||
          errorMessage.includes('withdrawn') ||
          errorMessage.includes('이미 사용 중인 정보')
        ) {
          // 메인 페이지로 이동
          router.push('/');

          // 탈퇴한 회원 알림 (약간의 지연을 두어 페이지 이동 후 표시)
          setTimeout(() => {
            alert('탈퇴한 회원입니다. 다시 가입해주세요.');
          }, 100);
        } else {
          router.push('/login?error=auth_failed');
        }
      }
    };

    checkAuthStatus();
  }, [router, checkAuth]);

  return (
    <CustomLayout showTopBar={false} showSearchBar={false} showMainNav={false} showFooter={false}>
      <div className="flex min-h-screen items-center justify-center bg-bg-100">
        <div className="text-center">
          <div className="mb-4 text-6xl">✅</div>
          <h1 className="mb-2 text-xl font-semibold text-text-100">로그인 성공!</h1>
          <p className="text-text-200">잠시 후 자동으로 이동됩니다...</p>
        </div>
      </div>
    </CustomLayout>
  );
}
