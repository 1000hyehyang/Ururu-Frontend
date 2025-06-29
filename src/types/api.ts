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
