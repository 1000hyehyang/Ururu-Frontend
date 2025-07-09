import axiosInstance, { handleApiError } from '@/lib/axios';
import { SocialLoginResponse, ApiResponseFormat } from '@/types/api';

// 환경변수 상수 선언 (빌드 타임에 값이 주입됨)
export const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
export const KAKAO_REDIRECT_URI_DEV = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI_DEV;
export const KAKAO_REDIRECT_URI_PROD = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI_PROD;
export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
export const GOOGLE_REDIRECT_URI_DEV = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI_DEV;
export const GOOGLE_REDIRECT_URI_PROD = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI_PROD;

// 소셜 로그인 제공자 정보 타입
export interface SocialProviderInfo {
  id: string;
  displayName: string;
  authUrl: string;
  state: string;
}

export interface GetSocialProvidersResponse {
  providers: SocialProviderInfo[];
}

// 소셜 로그인 제공자 목록 조회
export const getSocialProviders = async (): Promise<GetSocialProvidersResponse> => {
  try {
    const response =
      await axiosInstance.get<ApiResponseFormat<GetSocialProvidersResponse>>(
        '/auth/social/providers',
      );
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// 소셜 로그인 제공자 처리
export const socialLogin = async (provider: string, code: string): Promise<SocialLoginResponse> => {
  try {
    const response = await axiosInstance.post<ApiResponseFormat<SocialLoginResponse>>(
      '/auth/social/sessions',
      {
        provider,
        code,
      },
    );
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// 특정 제공자의 인증 URL 가져오기 (백엔드에서 받아오기)
export const getAuthUrl = async (provider: 'kakao' | 'google'): Promise<string> => {
  try {
    const response = await axiosInstance.get<ApiResponseFormat<any>>(
      `/auth/social/auth-url/${provider}`,
    );

    // 백엔드에서 내려주는 authUrl 사용
    return response.data.data.authUrl;
  } catch (error) {
    throw handleApiError(error);
  }
};
