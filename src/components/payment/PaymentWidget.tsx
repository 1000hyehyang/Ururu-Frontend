'use client';

import { useEffect, useRef, useState } from 'react';
import { loadTossPayments, ANONYMOUS } from '@tosspayments/tosspayments-sdk';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

interface PaymentWidgetProps {
  orderId: string;
  amount: number;
  orderName: string;
  customerName?: string;
  customerEmail?: string;
  customerMobilePhone?: string;
  onPaymentSuccess: (paymentKey: string, orderId: string, amount: number) => void;
}

export function PaymentWidget({
  orderId,
  amount,
  orderName,
  customerName,
  customerEmail,
  customerMobilePhone,
  onPaymentSuccess,
}: PaymentWidgetProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [initError, setInitError] = useState<string | null>(null);
  // 토스페이먼츠 SDK 타입 정의
  interface TossPaymentsWidget {
    setAmount: (amount: { currency: string; value: number }) => Promise<void>;
    renderPaymentMethods: (options: { selector: string; variantKey: string }) => Promise<unknown>;
    requestPayment: (options: {
      orderId: string;
      orderName: string;
      customerName?: string;
      customerEmail?: string;
      customerMobilePhone?: string;
      successUrl: string;
      failUrl: string;
    }) => Promise<void>;
  }

  const widgetRef = useRef<TossPaymentsWidget | null>(null);
  const paymentMethodsRef = useRef<unknown>(null);

  useEffect(() => {
    let isMounted = true;
    const initializeWidget = async () => {
      try {
        if (process.env.NODE_ENV === 'development') {
          console.log('결제위젯 초기화 시작...');
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

        // 비회원 결제를 위한 익명 customerKey 사용
        if (process.env.NODE_ENV === 'development') {
          console.log('결제위젯 생성 중...');
        }
        const widgets = tossPayments.widgets({
          customerKey: ANONYMOUS,
        });

        // 결제 금액 설정
        if (process.env.NODE_ENV === 'development') {
          console.log('결제 금액 설정:', amount);
        }
        await widgets.setAmount({
          currency: 'KRW',
          value: amount,
        });

        // 결제 UI 렌더링
        if (process.env.NODE_ENV === 'development') {
          console.log('결제 UI 렌더링 중...');
        }
        const paymentMethodsWidget = await widgets.renderPaymentMethods({
          selector: '#payment-methods',
          variantKey: 'DEFAULT',
        });

        if (process.env.NODE_ENV === 'development') {
          console.log('결제위젯 초기화 완료');
        }
        widgetRef.current = widgets;
        paymentMethodsRef.current = paymentMethodsWidget;
        if (isMounted) {
          setIsReady(true);
          setInitError(null);
        }
      } catch (error) {
        console.error('결제위젯 초기화 실패:', error);
        const errorMessage =
          error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
        if (isMounted) {
          setInitError(errorMessage);
          toast.error('결제위젯을 불러오는 중 오류가 발생했습니다.');
        }
      } finally {
        if (isMounted) {
          setIsInitializing(false);
        }
      }
    };

    if (amount > 0) {
      initializeWidget();
    } else {
      if (isMounted) {
        setIsInitializing(false);
        setInitError('결제 금액이 설정되지 않았습니다.');
      }
    }

    return () => {
      isMounted = false;
    };
  }, [amount]);

  const handlePayment = async () => {
    if (!widgetRef.current || !isReady) {
      toast.error('결제위젯이 준비되지 않았습니다.');
      return;
    }

    setIsLoading(true);

    try {
      await widgetRef.current.requestPayment({
        orderId,
        orderName,
        customerName,
        customerEmail,
        customerMobilePhone,
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      });
    } catch (error) {
      console.error('결제 요청 실패:', error);
      toast.error('결제 요청 중 오류가 발생했습니다.');
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 결제 방법 선택 */}
      <Card className="rounded-2xl border-0 bg-bg-100 shadow-none">
        <CardContent className="px-0 py-4 md:py-6">
          <h2 className="mb-4 text-lg font-semibold text-text-100">결제 방법</h2>

          {isInitializing && (
            <div className="flex min-h-[200px] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-b-2 border-primary-300"></div>
                <p className="text-sm text-text-200">결제위젯 로딩 중...</p>
              </div>
            </div>
          )}

          {initError && (
            <div className="flex min-h-[200px] items-center justify-center">
              <div className="text-center">
                <div className="mb-2 text-red-500">❌</div>
                <p className="text-sm text-text-200">{initError}</p>
              </div>
            </div>
          )}

          {!isInitializing && !initError && <div id="payment-methods" className="min-h-[200px]" />}
        </CardContent>
      </Card>

      {/* 결제하기 버튼 */}
      <Button
        onClick={handlePayment}
        disabled={!isReady || isLoading || isInitializing || !!initError}
        className="h-12 w-full rounded-lg bg-primary-300 text-sm font-medium text-text-on transition hover:opacity-80 focus:ring-primary-300 active:opacity-90 disabled:opacity-50 md:h-14 md:text-base"
      >
        {isLoading
          ? '결제 요청 중...'
          : isInitializing
            ? '결제위젯 로딩 중...'
            : initError
              ? '결제위젯 오류'
              : '결제하기'}
      </Button>
    </div>
  );
}
