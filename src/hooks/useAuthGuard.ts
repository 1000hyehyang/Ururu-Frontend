import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store';

export const useAuthGuard = () => {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/login');
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn, router]);

  return { isLoggedIn, isLoading };
};
