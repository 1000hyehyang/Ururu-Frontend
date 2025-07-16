/**
 * 결제 에러 코드를 사용자 친화적인 메시지로 매핑합니다.
 * @param code - 토스페이먼츠 에러 코드
 * @param message - 원본 에러 메시지 (fallback용)
 * @returns 사용자 친화적인 에러 메시지
 */
export function getPaymentErrorMessage(code: string | null, message?: string | null): string {
  switch (code) {
    case 'PAY_PROCESS_CANCELED':
      return '결제가 취소되었습니다.';
    case 'FORBIDDEN_REQUEST':
      return '잘못된 요청입니다.';
    case 'REJECT_CARD_COMPANY':
      return '카드사에서 결제를 거부했습니다.';
    case 'NOT_SUPPORTED_CARD_TYPE':
      return '지원되지 않는 카드입니다.';
    case 'FAILED_PAYMENT_INTERNAL_SYSTEM_PROCESSING':
      return '결제 시스템 처리 중 오류가 발생했습니다.';
    case 'PAY_PROCESS_ABORTED':
      return '결제 처리가 중단되었습니다.';
    default:
      return message || '알 수 없는 오류가 발생했습니다.';
  }
}
