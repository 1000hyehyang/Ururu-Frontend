import { useAuthStore } from '@/store';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast.success('로그아웃되었습니다.');
    router.push('/');
  };

  return { handleLogout };
};
