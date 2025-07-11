import { useAuthStore } from '@/store/auth';
import { AuthService } from '@/services/authService';
import type { UserInfo, SellerSignupData } from '@/types/auth';

// 소셜 로그인 훅
export const useSocialLogin = () => {
  const { setLoading, setError } = useAuthStore();

  const initiateSocialLogin = async (provider: 'kakao' | 'google') => {
    try {
      setLoading(true);
      setError(null);

      const providerInfo = await AuthService.getSocialAuthUrl(provider);
      window.location.href = providerInfo.authUrl;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '소셜 로그인을 시작할 수 없습니다.';
      setError(errorMessage);
      console.error('Social login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return { initiateSocialLogin };
};

// 판매자 로그인 훅
export const useSellerLogin = () => {
  const { setLoading, setError, login, checkAuth } = useAuthStore();

  const sellerLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await AuthService.sellerLogin({ email, password });

      // 사용자 정보 저장 (토큰은 쿠키로 자동 관리)
      login(response.member_info);

      // 로그인 성공 후 인증 상태 다시 확인
      await checkAuth();

      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '로그인에 실패했습니다.';
      setError(errorMessage);
      console.error('Seller login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { sellerLogin };
};

// 판매자 회원가입 훅
export const useSellerSignup = () => {
  const { setLoading, setError } = useAuthStore();

  const sellerSignup = async (signupData: SellerSignupData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await AuthService.sellerSignup(signupData);
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '회원가입에 실패했습니다.';
      setError(errorMessage);
      console.error('Seller signup error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { sellerSignup };
};

// 중복 체크 훅
export const useAvailabilityCheck = () => {
  const { setError } = useAuthStore();

  const checkEmail = async (email: string): Promise<boolean> => {
    try {
      return await AuthService.checkEmailAvailability(email);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '이메일 중복 확인에 실패했습니다.';
      setError(errorMessage);
      console.error('Email availability check error:', error);
      return false;
    }
  };

  const checkBusinessNumber = async (businessNumber: string): Promise<boolean> => {
    try {
      return await AuthService.checkBusinessNumberAvailability(businessNumber);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '사업자등록번호 중복 확인에 실패했습니다.';
      setError(errorMessage);
      console.error('Business number availability check error:', error);
      return false;
    }
  };

  const checkBrandName = async (name: string): Promise<boolean> => {
    try {
      return await AuthService.checkBrandNameAvailability(name);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '브랜드명 중복 확인에 실패했습니다.';
      setError(errorMessage);
      console.error('Brand name availability check error:', error);
      return false;
    }
  };

  return { checkEmail, checkBusinessNumber, checkBrandName };
};

// 로그아웃 훅
export const useLogout = () => {
  const { logout, setLoading, setError } = useAuthStore();

  const handleLogout = async () => {
    try {
      setLoading(true);
      setError(null);

      // 서버에 로그아웃 요청 (쿠키 자동 삭제)
      try {
        await AuthService.logout();
      } catch (error) {
        // 서버 로그아웃 실패해도 클라이언트에서는 로그아웃 처리
        console.warn('Server logout failed, but continuing with client logout:', error);
      }

      // 클라이언트 상태 정리
      logout();

      // 로그인 페이지로 리다이렉트
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '로그아웃에 실패했습니다.';
      setError(errorMessage);
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogout };
};

// 판매자 프로필 조회 훅
export const useSellerProfile = () => {
  const { setLoading, setError } = useAuthStore();

  const getSellerProfile = async (sellerId: number) => {
    try {
      setLoading(true);
      setError(null);

      const response = await AuthService.getSellerProfile(sellerId);
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '프로필 조회에 실패했습니다.';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { getSellerProfile };
};