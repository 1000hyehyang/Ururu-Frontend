/**
 * 인증 에러 처리를 위한 글로벌 핸들러
 * 401/403 에러 시 로그인 페이지로 리다이렉트
 */
export const handleAuthError = (statusCode: number) => {
  if (statusCode === 401 || statusCode === 403) {
    // 브라우저 환경에서만 실행
    if (typeof window !== 'undefined') {
      // 로그인 페이지로 리다이렉트
      // 인증 스토어는 페이지 이동 시 자동으로 재설정됨
      window.location.href = '/login';
    }
  }
};
