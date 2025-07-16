import api from '@/lib/axios';

// 결제 요청 인터페이스
interface PaymentRequestData {
  orderId: string;
  usePoints: number;
  phone: string;
  zonecode: string;
  address1: string;
  address2: string;
}

// 결제 서비스
export class PaymentService {
  // 결제 요청 생성
  static async createPaymentRequest(data: PaymentRequestData) {
    const response = await api.post('/payments/request', data);
    return response.data;
  }

  // 결제 성공 처리 (토스페이먼츠 결제 승인)
  static async handlePaymentSuccess(paymentKey: string, orderId: string, amount: number) {
    // localStorage에서 paymentId 가져오기
    const paymentId = localStorage.getItem('currentPaymentId');
    if (!paymentId) {
      throw new Error('결제 ID를 찾을 수 없습니다. 결제를 다시 시도해주세요.');
    }

    // 백엔드에서 토스페이먼츠 API 호출 + 결제 승인 처리를 모두 담당
    const response = await api.post(`/payments/${paymentId}/confirm`, {
      paymentKey,
      amount,
    });

    // 결제 승인 완료 후 localStorage 정리
    localStorage.removeItem('currentPaymentId');

    return response.data;
  }

  // 결제 승인
  static async confirmPayment(data: {
    paymentKey: string;
    orderId: string;
    amount: number;
    tossResult: any;
  }) {
    const response = await api.post(`/payments/${data.paymentKey}/confirm`, data);
    return response.data;
  }

  // 결제 상태 조회
  static async getPaymentStatus(paymentKey: string) {
    const response = await api.get(`/payments/${paymentKey}/status`);
    return response.data;
  }

  // 웹훅 처리
  static async handleWebhook(eventType: string, data: any) {
    const endpoint =
      eventType === 'PAYMENT_CONFIRMED'
        ? '/webhooks/toss/payment-confirmed'
        : eventType === 'PAYMENT_CANCELED'
          ? '/webhooks/toss/payment-canceled'
          : '/webhooks/toss/payment-failed';

    const response = await api.post(endpoint, data);
    return response.data;
  }
}
