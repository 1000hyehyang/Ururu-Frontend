import React from 'react';
import { Button } from '@/components/ui/button';
import { FORM_STYLES } from '@/constants/form-styles';
import { Order } from '@/types/order';

interface ReviewButtonProps {
  item: Order['items'][0];
  className?: string;
}

export function ReviewButton({ item, className = '' }: ReviewButtonProps) {
  const buttonStyle =
    'h-8 min-w-[80px] rounded-lg border border-bg-300 bg-bg-100 text-xs text-text-300 shadow-none transition-colors hover:bg-bg-200';

  if (item.hasReview) {
    return <Button className={`${buttonStyle} ${className}`}>리뷰 보기</Button>;
  }

  return <Button className={`${buttonStyle} ${className}`}>리뷰 작성</Button>;
}

interface RefundButtonProps {
  canRefund: boolean;
  refundDeadline: Date;
  deliveryStatus: Order['deliveryStatus'];
  className?: string;
}

export function RefundButton({
  canRefund,
  refundDeadline,
  deliveryStatus,
  className = '',
}: RefundButtonProps) {
  const isRefundExpired = new Date() > refundDeadline;
  const isDelivered = deliveryStatus === 'delivered' || deliveryStatus === 'completed';

  return (
    <Button
      disabled={!canRefund || isRefundExpired}
      className={`${FORM_STYLES.button.refundButton} h-10 w-full ${className}`}
    >
      {isRefundExpired ? '환불 기간 만료' : isDelivered ? '환불하기' : '주문 취소'}
    </Button>
  );
}

interface DeliveryButtonProps {
  deliveryStatus: Order['deliveryStatus'];
  className?: string;
}

export function DeliveryButton({ deliveryStatus, className = '' }: DeliveryButtonProps) {
  if (deliveryStatus === 'completed') {
    return (
      <Button disabled className={`${FORM_STYLES.button.submit} h-10 w-full ${className}`}>
        배송 완료
      </Button>
    );
  }

  return (
    <Button className={`${FORM_STYLES.button.deliveryButton} h-10 w-full ${className}`}>
      배송 조회
    </Button>
  );
}
