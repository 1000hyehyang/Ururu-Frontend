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
  order: Order & { status: 'in_progress' | 'confirmed' | 'failed' };
}

export function OrderCard({ order }: OrderCardProps) {
  // 리워드 달성 뱃지 노출 조건: 진행중/확정 + progressRate >= 20
  const showRewardBadge =
    (order.status === 'in_progress' || order.status === 'confirmed') && order.progressRate >= 20;

  return (
    <div className="rounded-lg bg-bg-100 p-0">
      {/* 주문 헤더 */}
      <div className="mb-4 flex flex-col gap-2">
        <div className="text-lg font-bold text-text-100">{formatDate(order.orderDate)}</div>
        <div className="text-sm text-text-200">주문번호: {order.orderNumber}</div>
      </div>

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
                {/* 모바일에서는 리뷰 버튼을 상품 정보 아래에 배치 */}
                <div className="mt-3 flex items-center lg:hidden">
                  <ReviewButton item={item} />
                </div>
              </div>

              {/* 데스크톱에서는 리뷰 버튼을 오른쪽에 배치 */}
              <div className="hidden items-center lg:flex">
                <ReviewButton item={item} />
              </div>
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
        <div className="flex gap-2">
          <RefundButton canRefund={order.canRefund} refundDeadline={order.refundDeadline} />
          <DeliveryButton deliveryStatus={order.deliveryStatus} />
        </div>
      </div>
    </div>
  );
}
