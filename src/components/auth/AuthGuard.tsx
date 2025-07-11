'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireSeller?: boolean;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requireAuth = false,
  requireSeller = false,
}) => {
  const { user, isAuthenticated, isLoading, isCheckingAuth, hasInitialized, checkAuth } =
    useAuthStore();
  const router = useRouter();

  // 초기화 완료 후 인증 상태에 따른 처리
  useEffect(() => {
    if (!hasInitialized) return;

    if (requireAuth && !isAuthenticated) {
      // 인증이 필요한 페이지인데 로그인되지 않은 경우
      console.log('AuthGuard: 인증 필요 - 로그인 페이지로 리다이렉트');
      router.push('/login');
      return;
    }

    if (requireSeller && user?.user_type !== 'SELLER') {
      // 판매자 권한이 필요한 페이지인데 판매자가 아닌 경우
      console.log('AuthGuard: 판매자 권한 필요 - 권한 없음 페이지로 리다이렉트');
      router.push('/unauthorized');
      return;
    }
  }, [isAuthenticated, user, requireAuth, requireSeller, router, hasInitialized]);

  // 초기화가 완료되지 않았거나 인증 확인 중인 경우 로딩 표시
  if (!hasInitialized || isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-primary-300"></div>
          <p className="mt-2 text-sm text-text-200">인증 상태를 확인하는 중...</p>
        </div>
      </div>
    );
  }

  // 로딩 중이거나 초기화 중인 경우
  if (isLoading || !hasInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-primary-300"></div>
          <p className="mt-2 text-sm text-text-200">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 인증이 필요한 페이지인데 인증되지 않은 경우 (리다이렉트 중)
  if (requireAuth && !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-primary-300"></div>
          <p className="mt-2 text-sm text-text-200">로그인 페이지로 이동 중...</p>
        </div>
      </div>
    );
  }

  // 판매자 권한이 필요한 페이지인데 권한이 없는 경우 (리다이렉트 중)
  if (requireSeller && user?.user_type !== 'SELLER') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-primary-300"></div>
          <p className="mt-2 text-sm text-text-200">권한 확인 중...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
