'use client';

import { useEffect, useRef, useState } from 'react';
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { usePaymentRequest } from '@/hooks/usePayment';

interface PaymentWindowProps {
  orderId: string;
  usePoints: number;
  phone: string;
  zonecode: string;
  address1: string;
  address2: string;
  amount: number; // 실제 결제 금액 (토스페이먼츠 결제창용)
  orderName: string; // 주문명 (토스페이먼츠 결제창용)
  onPaymentSuccess: (paymentKey: string, orderId: string, amount: number) => void;
}

export function PaymentWindow({
  orderId,
  usePoints,
  phone,
  zonecode,
  address1,
  address2,
  amount,
  orderName,
  onPaymentSuccess,
}: PaymentWindowProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [initError, setInitError] = useState<string | null>(null);
  // unknown 타입을 사용하여 any보다 안전하게 처리
  const tossPaymentsRef = useRef<unknown>(null);

  // 결제 요청 훅 사용
  const {
    createPaymentRequest,
    isLoading: isRequestLoading,
    error: requestError,
  } = usePaymentRequest();

  useEffect(() => {
    const initializePayment = async () => {
      try {
        if (process.env.NODE_ENV === 'development') {
          console.log('결제창 초기화 시작...');
        }

        const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
        if (process.env.NODE_ENV === 'development') {
          console.log('클라이언트 키:', clientKey);
        }

        if (!clientKey) {
          throw new Error('토스페이먼츠 클라이언트 키가 설정되지 않았습니다.');
        }

        if (process.env.NODE_ENV === 'development') {
          console.log('토스페이먼츠 SDK 로딩 중...');
        }
        const tossPayments = await loadTossPayments(clientKey);
        if (process.env.NODE_ENV === 'development') {
          console.log('토스페이먼츠 SDK 로딩 완료');
        }

        // 결제창 인스턴스 생성
        const payment = tossPayments.payment({
          customerKey: 'anonymous-customer-key', // 비회원 결제
        });
        if (process.env.NODE_ENV === 'development') {
          console.log('결제창 인스턴스 생성 완료');
        }

        tossPaymentsRef.current = payment;
        setIsInitialized(true);
        if (process.env.NODE_ENV === 'development') {
          console.log('결제창 초기화 완료');
        }
      } catch (error) {
        console.error('결제창 초기화 실패:', error);
        setInitError(error instanceof Error ? error.message : '결제창 초기화에 실패했습니다.');
      } finally {
        setIsInitializing(false);
      }
    };

    if (orderId) {
      initializePayment();
    } else {
      setIsInitializing(false);
      setInitError('주문 정보가 설정되지 않았습니다.');
    }
  }, [orderId]);

  const handlePayment = async () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔥 [TEST] 결제 버튼 클릭됨!');
    }

    if (!tossPaymentsRef.current || !isInitialized) {
      if (process.env.NODE_ENV === 'development') {
        console.log('❌ [TEST] 결제 시스템이 준비되지 않음');
      }
      toast.error('결제 시스템이 아직 준비되지 않았습니다.');
      return;
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('✅ [TEST] 결제 시스템 준비 완료');
    }
    setIsLoading(true);

    try {
      const requestData = {
        orderId,
        usePoints,
        phone,
        zonecode,
        address1,
        address2,
      };

      if (process.env.NODE_ENV === 'development') {
        console.log('📤 [PaymentWindow] 결제 요청 생성 시작:', requestData);
      }

      // 1단계: 결제 요청 생성 (PaymentService 사용)
      const result = await createPaymentRequest(requestData);

      if (process.env.NODE_ENV === 'development') {
        console.log('✅ [PaymentWindow] 결제 요청 생성 완료:', result);
      }

      const { paymentId, customerName } = result.data;

      // paymentId를 localStorage에 저장 (결제 승인 시 사용)
      localStorage.setItem('currentPaymentId', paymentId.toString());

      // 결제창 호출 전에 페이지 이탈 경고 제거
      if ((window as any).orderPageBeforeUnload) {
        window.removeEventListener('beforeunload', (window as any).orderPageBeforeUnload);
        (window as any).orderPageBeforeUnload = null;
      }

      // 2단계: 토스 결제창 호출 (props로 받은 실제 데이터 사용)
      const tossPaymentData = {
        method: 'CARD',
        amount: {
          currency: 'KRW',
          value: amount, // props로 받은 실제 결제 금액
        },
        orderId,
        orderName, // props로 받은 실제 주문명
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
        ...(customerName && { customerName }),
        ...(phone && { customerMobilePhone: phone }),
      };

      if (process.env.NODE_ENV === 'development') {
        console.log('🚀 [PaymentWindow] 토스페이먼츠 결제창 호출 데이터:', tossPaymentData);
      }

      await (tossPaymentsRef.current as any).requestPayment(tossPaymentData);

      if (process.env.NODE_ENV === 'development') {
        console.log('✅ [PaymentWindow] 토스페이먼츠 결제창 호출 완료');
      }
    } catch (error) {
      console.error('결제 요청 실패:', error);
      toast.error(error instanceof Error ? error.message : '결제 요청 중 오류가 발생했습니다.');
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      {/* 에러 메시지 표시 */}
      {(initError || requestError) && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-center">
          <p className="text-sm text-red-600">{initError || requestError}</p>
        </div>
      )}

      {/* 결제하기 버튼 */}
      <Button
        onClick={handlePayment}
        disabled={
          !isInitialized ||
          isLoading ||
          isInitializing ||
          isRequestLoading ||
          !!initError ||
          !!requestError
        }
        className="h-12 w-full rounded-lg bg-primary-300 text-sm font-medium text-text-on transition hover:opacity-80 focus:ring-primary-300 active:opacity-90 disabled:opacity-50 md:h-14 md:text-base"
      >
        {isLoading || isRequestLoading
          ? '결제 진행 중...'
          : isInitializing
            ? '결제 시스템 준비 중...'
            : initError || requestError
              ? '결제 시스템 오류'
              : '결제하기'}
      </Button>
    </div>
  );
}
