'use client';

import React from 'react';
import Image from 'next/image';
import type { ApiCreateOrderItem } from '@/types/api';

interface OrderItemProps {
  item: ApiCreateOrderItem;
}

export function OrderItem({ item }: OrderItemProps) {
  return (
    <div className="flex items-start gap-4 rounded-lg bg-bg-100 px-0 py-4">
      {/* 상품 이미지 */}
      <div className="flex-shrink-0">
        <div className="relative h-20 w-20 overflow-hidden rounded-lg md:h-24 md:w-24">
          <Image
            src={item.optionImage}
            alt={`${item.productName} - ${item.optionName}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 80px, 96px"
          />
        </div>
      </div>

      {/* 상품 정보 */}
      <div className="min-w-0 flex-1">
        <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-text-100 md:text-base">
          {item.productName}
        </h3>
        <p className="mb-2 line-clamp-2 text-sm text-text-200 md:text-base">
          옵션: {item.optionName}
        </p>
        <p className="mb-2 text-sm text-text-200 md:text-base">수량: {item.quantity}개</p>
        <p className="text-lg font-bold text-text-100 md:text-xl">
          {(item.price * item.quantity).toLocaleString()}원
        </p>
      </div>
    </div>
  );
}
