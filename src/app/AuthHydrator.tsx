'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store';

export default function AuthHydrator({ children }: { children: React.ReactNode }) {
  const setIsLoggedIn = useAuthStore((s) => s.setIsLoggedIn);
  const setUserInfo = useAuthStore((s) => s.setUserInfo);

  useEffect(() => {
    fetch('/api/members/me', { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        setIsLoggedIn(true);
        setUserInfo(data.data);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setUserInfo(null);
      });
  }, [setIsLoggedIn, setUserInfo]);

  return <>{children}</>;
}
