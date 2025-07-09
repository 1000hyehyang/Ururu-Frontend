import { useCallback } from 'react';
import { useAuthStore } from '@/store/auth';
import { toast } from 'sonner';

export const useAuth = () => {
  const logoutStore = useAuthStore((state) => state.logout);

  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      logoutStore();
      window.location.href = '/login';
    } catch (error) {
      // console.error('로그아웃 실패:', error);
      toast.error('로그아웃 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  }, [logoutStore]);

  return { logout };
};
