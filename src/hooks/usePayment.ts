import { useState } from 'react';
import { PaymentService } from '@/services/paymentService';

// 결제 요청 훅
export const usePaymentRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPaymentRequest = async (data: {
    orderId: string;
    usePoints: number;
    phone: string;
    zonecode: string;
    address1: string;
    address2: string;
  }) => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('결제 요청 생성:', data);
      const response = await PaymentService.createPaymentRequest(data);
      console.log('결제 요청 생성 성공:', response);

      return response;
    } catch (err: any) {
      const errorMessage = err.message || '결제 요청 생성에 실패했습니다.';
      setError(errorMessage);
      console.error('결제 요청 생성 실패:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createPaymentRequest,
    isLoading,
    error,
  };
};

// 결제 성공 처리 훅
export const usePaymentSuccess = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePaymentSuccess = async (paymentKey: string, orderId: string, amount: number) => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('결제 성공 처리:', { paymentKey, orderId, amount });
      const response = await PaymentService.handlePaymentSuccess(paymentKey, orderId, amount);
      console.log('결제 성공 처리 완료:', response);

      return response;
    } catch (err: any) {
      const errorMessage = err.message || '결제 성공 처리에 실패했습니다.';
      setError(errorMessage);
      console.error('결제 성공 처리 실패:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handlePaymentSuccess,
    isLoading,
    error,
  };
};

// 결제 승인 훅
export const usePaymentConfirm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const confirmPayment = async (
    paymentKey: string,
    data: {
      paymentKey: string;
      orderId: string;
      amount: number;
      tossResult: any;
    },
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('결제 승인:', data);
      const response = await PaymentService.confirmPayment(data);
      console.log('결제 승인 완료:', response);

      return response;
    } catch (err: any) {
      const errorMessage = err.message || '결제 승인에 실패했습니다.';
      setError(errorMessage);
      console.error('결제 승인 실패:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    confirmPayment,
    isLoading,
    error,
  };
};

// 결제 상태 조회 훅
export const usePaymentStatus = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPaymentStatus = async (paymentKey: string) => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('결제 상태 조회:', paymentKey);
      const response = await PaymentService.getPaymentStatus(paymentKey);
      console.log('결제 상태 조회 완료:', response);

      return response;
    } catch (err: any) {
      const errorMessage = err.message || '결제 상태 조회에 실패했습니다.';
      setError(errorMessage);
      console.error('결제 상태 조회 실패:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getPaymentStatus,
    isLoading,
    error,
  };
};
