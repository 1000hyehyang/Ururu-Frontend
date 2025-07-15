import React from 'react';
import { Button } from '@/components/ui/button';
import { FORM_STYLES } from '@/constants/form-styles';
import { Order } from '@/types/order';

interface ReviewButtonProps {
  item: Order['items'][0];
  disabled?: boolean;
  className?: string;
}

export function ReviewButton({ item, disabled = false, className = '' }: ReviewButtonProps) {
  const buttonStyle =
    'h-8 min-w-[80px] rounded-lg border border-bg-300 bg-bg-100 text-xs text-text-300 shadow-none transition-colors hover:bg-bg-200';

  if (item.hasReview) {
    return (
      <Button disabled={disabled} className={`${buttonStyle} ${className}`}>
        리뷰 보기
      </Button>
    );
  }

  return (
    <Button disabled={disabled} className={`${buttonStyle} ${className}`}>
      리뷰 작성
    </Button>
  );
}

interface RefundButtonProps {
  canRefundOthers: boolean;
  orderStatus: Order['status'];
  className?: string;
}

export function RefundButton({ canRefundOthers, orderStatus, className = '' }: RefundButtonProps) {
  const isInProgress = orderStatus === 'in_progress';
  const isRefundPending = orderStatus === 'refund_pending';

  // OPEN(진행중)이면 "주문 취소" - 항상 가능
  // 그 외에는 "환불 요청" - canRefundOthers 기준
  // 환불 대기중이면 "환불 신청됨" - 비활성화
  let buttonText = '주문 취소';
  let isDisabled = false;

  if (isRefundPending) {
    buttonText = '환불 신청됨';
    isDisabled = true;
  } else if (!isInProgress) {
    buttonText = '환불 요청';
    isDisabled = !canRefundOthers;
  }

  return (
    <Button
      disabled={isDisabled}
      className={`${FORM_STYLES.button.refundButton} h-10 w-full ${className}`}
    >
      {buttonText}
    </Button>
  );
}

interface DeliveryButtonProps {
  deliveryStatus: Order['deliveryStatus'];
  orderStatus: Order['status'];
  trackingNumber?: string;
  className?: string;
}

export function DeliveryButton({
  deliveryStatus,
  orderStatus,
  trackingNumber,
  className = '',
}: DeliveryButtonProps) {
  // 공구 진행중이면 배송조회 불가
  const isInProgress = orderStatus === 'in_progress';
  const isCompleted = deliveryStatus === 'completed';
  const isRefundPending = orderStatus === 'refund_pending';

  if (isCompleted) {
    return (
      <Button disabled className={`${FORM_STYLES.button.submit} h-10 w-full ${className}`}>
        배송 완료
      </Button>
    );
  }

  if (isInProgress) {
    return (
      <Button disabled className={`${FORM_STYLES.button.deliveryButton} h-10 w-full ${className}`}>
        공구 진행중
      </Button>
    );
  }

  if (isRefundPending) {
    return (
      <Button disabled className={`${FORM_STYLES.button.deliveryButton} h-10 w-full ${className}`}>
        환불 대기중
      </Button>
    );
  }

  return (
    <Button
      className={`${FORM_STYLES.button.deliveryButton} h-10 w-full ${className}`}
      data-tracking-number={trackingNumber}
    >
      배송 조회
    </Button>
  );
}
