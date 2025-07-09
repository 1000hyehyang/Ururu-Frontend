'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store';

export default function AuthSuccessPage() {
  const router = useRouter();
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const setUserInfo = useAuthStore((state) => state.setUserInfo);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/members/me', { credentials: 'include' });
        if (!res.ok) throw new Error('인증 정보 없음');
        const data = await res.json();
        setIsLoggedIn(true);
        setUserInfo(data.data);
        router.replace('/mypage');
      } catch {
        setIsLoggedIn(false);
        setUserInfo(null);
        router.replace('/login');
      }
    };
    fetchUser();
  }, [router, setIsLoggedIn, setUserInfo]);

  // 아무것도 렌더링하지 않음
  return null;
}
