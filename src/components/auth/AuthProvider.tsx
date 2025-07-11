'use client';

import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/store';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { initializeAuth, hasInitialized, isCheckingAuth } = useAuthStore();
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    // 컴포넌트 마운트 시 한 번만 초기 인증 확인
    const initializeAuthOnce = async () => {
      if (hasInitializedRef.current || hasInitialized || isCheckingAuth) {
        return;
      }

      try {
        hasInitializedRef.current = true;
        await initializeAuth();
      } catch (error) {
        console.error('Auth initialization failed:', error);
      }
    };

    initializeAuthOnce();
  }, [initializeAuth, hasInitialized, isCheckingAuth]);

  return <>{children}</>;
};
