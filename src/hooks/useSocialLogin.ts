import { useCallback, useState } from 'react';
import { getAuthUrl } from '@/services/auth';

interface UseSocialLoginReturn {
  isLoading: boolean;
  error: string | null;
  handleKakaoLogin: () => Promise<void>;
  handleGoogleLogin: () => Promise<void>;
  clearError: () => void;
}

export const useSocialLogin = (): UseSocialLoginReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // 공통 소셜 로그인 함수
  const handleSocialLogin = useCallback(
    async (provider: 'kakao' | 'google', errorMessage: string) => {
      setIsLoading(true);
      setError(null);
      try {
        // 리다이렉션 전에 약간의 지연을 줘서 사용자에게 로딩 상태를 인식시킬 수 있도록 함
        await new Promise((resolve) => setTimeout(resolve, 100));
        const authUrl = await getAuthUrl(provider);
        window.location.href = authUrl;
      } catch (err: any) {
        setError(err.message || errorMessage);
        setIsLoading(false);
      } finally {
        // 리다이렉션에 성공하면 이 코드는 실행되지 않지만, 안전장치로 추가
        setTimeout(() => setIsLoading(false), 5000);
      }
    },
    [],
  );

  // 카카오 로그인
  const handleKakaoLogin = useCallback(
    () => handleSocialLogin('kakao', '카카오 로그인 중 오류가 발생했습니다.'),
    [handleSocialLogin],
  );

  // 구글 로그인
  const handleGoogleLogin = useCallback(
    () => handleSocialLogin('google', '구글 로그인 중 오류가 발생했습니다.'),
    [handleSocialLogin],
  );

  return {
    isLoading,
    error,
    handleKakaoLogin,
    handleGoogleLogin,
    clearError,
  };
};
