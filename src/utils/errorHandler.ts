// 에러 코드 정의
export enum ErrorCode {
  // 인증 관련
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',

  // 로그인 관련
  INVALID_LOGIN_CREDENTIALS = 'INVALID_LOGIN_CREDENTIALS',
  INACTIVE_ACCOUNT = 'INACTIVE_ACCOUNT',

  // 소셜 로그인 관련
  SOCIAL_LOGIN_FAILED = 'SOCIAL_LOGIN_FAILED',
  SOCIAL_MEMBER_INFO_FAILED = 'SOCIAL_MEMBER_INFO_FAILED',
  UNSUPPORTED_SOCIAL_PROVIDER = 'UNSUPPORTED_SOCIAL_PROVIDER',

  // 기타
  TOO_MANY_REQUESTS = 'TOO_MANY_REQUESTS',
  ACCESS_DENIED = 'ACCESS_DENIED',
  NETWORK_ERROR = 'NETWORK_ERROR',
}

// 에러 메시지 매핑
const errorMessages: Record<string, string> = {
  [ErrorCode.UNAUTHORIZED]: '인증이 필요합니다.',
  [ErrorCode.FORBIDDEN]: '접근 권한이 없습니다.',
  [ErrorCode.INVALID_LOGIN_CREDENTIALS]: '이메일 또는 비밀번호가 올바르지 않습니다.',
  [ErrorCode.INACTIVE_ACCOUNT]: '비활성화된 계정입니다.',
  [ErrorCode.SOCIAL_LOGIN_FAILED]: '소셜 로그인에 실패했습니다.',
  [ErrorCode.SOCIAL_MEMBER_INFO_FAILED]: '소셜 로그인 사용자 정보 조회에 실패했습니다.',
  [ErrorCode.UNSUPPORTED_SOCIAL_PROVIDER]: '지원하지 않는 소셜 로그인입니다.',
  [ErrorCode.TOO_MANY_REQUESTS]: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
  [ErrorCode.ACCESS_DENIED]: '접근 권한이 없습니다.',
  [ErrorCode.NETWORK_ERROR]: '네트워크 연결을 확인해주세요.',
};

// 에러 메시지 가져오기
export const getErrorMessage = (errorCode: string): string => {
  return errorMessages[errorCode] || '알 수 없는 오류가 발생했습니다.';
};

// API 에러 처리
export const handleApiError = (error: unknown): { message: string; code?: string } => {
  if (error instanceof Error) {
    return { message: error.message };
  }

  if (typeof error === 'object' && error !== null && 'message' in error) {
    return { message: String(error.message) };
  }

  return { message: '알 수 없는 오류가 발생했습니다.' };
};

// 네트워크 에러 확인
export const isNetworkError = (error: unknown): boolean => {
  if (error instanceof Error) {
    return error.message.includes('Network Error') || error.message.includes('fetch');
  }
  return false;
};

// 인증 에러 확인
export const isAuthError = (error: unknown): boolean => {
  if (error instanceof Error) {
    return error.message.includes('401') || error.message.includes('Unauthorized');
  }
  return false;
};

// 권한 에러 확인
export const isPermissionError = (error: unknown): boolean => {
  if (error instanceof Error) {
    return error.message.includes('403') || error.message.includes('Forbidden');
  }
  return false;
};

// 서버 에러 확인
export const isServerError = (error: unknown): boolean => {
  if (error instanceof Error) {
    return error.message.includes('500') || error.message.includes('Internal Server Error');
  }
  return false;
};
