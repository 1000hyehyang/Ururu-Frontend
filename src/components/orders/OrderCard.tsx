import React from 'react';
import Image from 'next/image';
import { Order } from '@/types/order';
import { formatDate, formatPrice } from '@/lib/format-utils';
import {
  StatusBadge,
  RewardBadge,
  ReviewButton,
  RefundButton,
  DeliveryButton,
} from '@/components/common';

interface OrderCardProps {
  order: Order & { status: 'in_progress' | 'confirmed' | 'failed' | 'refund_pending' };
}

export function OrderCard({ order }: OrderCardProps) {
  // 리워드 달성 뱃지 노출 조건 - 환불 대기중만 아니면 표시
  const showRewardBadge = order.status !== 'refund_pending' && order.progressRate > 0;

  // 실패한 주문인지 확인
  const isFailedOrder = order.status === 'failed';

  return (
    <div className="rounded-lg bg-bg-100 p-0">
      {/* 주문 헤더 */}
      <div className="mb-4 flex flex-col gap-2">
        <div className="text-lg font-bold text-text-100">{formatDate(order.orderDate)}</div>
        <div className="text-sm text-text-200">주문번호: {order.orderNumber}</div>
      </div>

      {/* 환불 대기중인 경우 환불 정보 표시 */}
      {order.status === 'refund_pending' && order.refundReason && (
        <div className="mb-4 rounded-lg border border-bg-300 bg-bg-200 p-3">
          <div className="mb-2 flex items-center space-x-2">
            <span className="text-sm font-medium text-text-100">환불 신청</span>
          </div>
          <p className="text-sm text-text-200">{order.refundReason}</p>
        </div>
      )}

      {/* 주문 상품들 */}
      <div className="space-y-6">
        {order.items.map((item) => (
          <div key={item.id}>
            {/* 상품별 뱃지: 상태/리워드 */}
            <div className="mb-2 flex gap-2">
              <StatusBadge status={order.status} />
              {showRewardBadge && <RewardBadge percent={order.progressRate} />}
            </div>

            <div className="flex gap-3">
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-bg-200 bg-bg-100">
                <Image
                  src={item.productImage}
                  alt={item.productName}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div className="space-y-1">
                  <h3 className="line-clamp-2 text-base font-semibold text-text-100">
                    {item.productName}
                  </h3>
                  <p className="line-clamp-2 text-xs text-text-200">옵션: {item.option}</p>
                  <p className="text-xs text-text-200">수량: {item.quantity}개</p>
                  <p className="text-xl font-bold text-text-100">{formatPrice(item.price)}원</p>
                </div>
                {/* 모바일에서는 리뷰 버튼을 상품 정보 아래에 배치 - 환불 대기중 제외 */}
                {order.status !== 'refund_pending' && (
                  <div className="mt-3 flex items-center lg:hidden">
                    <ReviewButton item={item} />
                  </div>
                )}
              </div>

              {/* 데스크톱에서는 리뷰 버튼을 오른쪽에 배치 - 환불 대기중 제외 */}
              {order.status !== 'refund_pending' && (
                <div className="hidden items-center lg:flex">
                  <ReviewButton item={item} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 주문 요약 */}
      <div className="mt-4 border-t border-bg-300 pt-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-base font-semibold text-text-100">
            총 {formatPrice(order.totalAmount)}원 (배송비 포함)
          </span>
        </div>
        {/* 실패한 주문이 아닌 경우에만 배송/취소 버튼 표시 */}
        {!isFailedOrder && (
          <div className="flex gap-2">
            <RefundButton canRefundOthers={order.canRefundOthers} orderStatus={order.status} />
            <DeliveryButton
              deliveryStatus={order.deliveryStatus}
              orderStatus={order.status}
              trackingNumber={order.trackingNumber}
            />
          </div>
        )}
      </div>
    </div>
  );
}
