'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

export function useSafeSearchParams() {
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setSearchParams(new URLSearchParams(window.location.search));
  }, []);

  const get = useCallback(
    (key: string): string | null => {
      if (!isClient || !searchParams) return null;
      return searchParams.get(key);
    },
    [isClient, searchParams],
  );

  const getAll = useCallback(
    (key: string): string[] => {
      if (!isClient || !searchParams) return [];
      return searchParams.getAll(key);
    },
    [isClient, searchParams],
  );

  const has = useCallback(
    (key: string): boolean => {
      if (!isClient || !searchParams) return false;
      return searchParams.has(key);
    },
    [isClient, searchParams],
  );

  const toString = useCallback((): string => {
    if (!isClient || !searchParams) return '';
    return searchParams.toString();
  }, [isClient, searchParams]);

  return {
    get,
    getAll,
    has,
    toString,
    isClient,
  };
}

export function useSafePathname() {
  const [pathname, setPathname] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setPathname(window.location.pathname);
  }, []);

  return { pathname, isClient };
}

export function useSafeRouter() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const safePush = useCallback(
    (href: string) => {
      if (isClient) {
        router.push(href);
      }
    },
    [isClient, router],
  );

  const safeReplace = useCallback(
    (href: string) => {
      if (isClient) {
        router.replace(href);
      }
    },
    [isClient, router],
  );

  const safeBack = useCallback(() => {
    if (isClient) {
      router.back();
    }
  }, [isClient, router]);

  const safeForward = useCallback(() => {
    if (isClient) {
      router.forward();
    }
  }, [isClient, router]);

  const safeRefresh = useCallback(() => {
    if (isClient) {
      router.refresh();
    }
  }, [isClient, router]);

  return {
    push: safePush,
    replace: safeReplace,
    back: safeBack,
    forward: safeForward,
    refresh: safeRefresh,
    isClient,
  };
}

/**
 * 통합 네비게이션 훅
 * 모든 네비게이션 기능을 한 번에 제공
 */
export function useSafeNavigation() {
  const searchParams = useSafeSearchParams();
  const { pathname, isClient: isPathnameClient } = useSafePathname();
  const router = useSafeRouter();

  return {
    searchParams,
    pathname,
    router,
    isClient: isPathnameClient && router.isClient,
  };
}
