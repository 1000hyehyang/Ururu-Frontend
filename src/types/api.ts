// API 응답 기본 타입
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

// 에러 응답 타입 (HTTP 에러 처리용)
export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

// 소셜 로그인 관련 타입
export interface SocialLoginResponse {
  success: boolean;
  user?: {
    id: string;
    email: string;
    name: string;
    profileImage?: string;
    userType: 'buyer' | 'seller';
  };
  token?: {
    accessToken: string;
    refreshToken: string;
  };
  message?: string;
}

export interface SocialLoginUrlResponse {
  loginUrl: string;
}

// 백엔드 API 응답 형식
export interface ApiResponseFormat<T> {
  success: boolean;
  message: string;
  data: T;
}

// 소셜 로그인 요청
export interface SocialLoginRequest {
  provider: string;
  code: string;
}

// 배송지 관련 타입
export interface ShippingAddress {
  id: number;
  member_id: number;
  label: string;
  phone: string;
  zonecode: string;
  address1: string;
  address2: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface ShippingAddressResponse {
  addresses: ShippingAddress[];
}
