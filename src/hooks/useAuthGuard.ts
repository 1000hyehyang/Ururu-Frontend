import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store';

export const useAuthGuard = () => {
  const router = useRouter();
  const { isAuthenticated, user, hasInitialized, isCheckingAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 초기화가 완료되고 인증 확인이 끝났을 때만 처리
    if (hasInitialized && !isCheckingAuth) {
      if (!isAuthenticated) {
        router.replace('/login');
      } else {
        setIsLoading(false);
      }
    }
  }, [isAuthenticated, hasInitialized, isCheckingAuth, router]);

  return {
    isLoggedIn: isAuthenticated,
    isLoading: isLoading || isCheckingAuth || !hasInitialized,
  };
};
