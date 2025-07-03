'use client';

import React from 'react';

interface PaymentSummaryProps {
  totalProductPrice: number;
  pointAmount: number;
  shippingFee: number;
  finalPrice: number;
}

export function PaymentSummary({
  totalProductPrice,
  pointAmount,
  shippingFee,
  finalPrice,
}: PaymentSummaryProps) {
  return (
    <div className="space-y-4">
      {/* 구분선 */}
      <div className="h-px bg-bg-300" />

      {/* 결제 요약 */}
      <div className="rounded-2xl bg-bg-100 p-4 md:p-6">
        {/* 타이틀과 총 결제금액 */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text-100 md:text-xl">최종 결제 금액</h2>
          <span className="whitespace-nowrap text-xl font-bold text-text-100 md:text-2xl">
            {finalPrice.toLocaleString()}원
          </span>
        </div>

        {/* 상세 내역 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-200 md:text-base">총 상품 금액</span>
            <span className="whitespace-nowrap text-sm text-text-100 md:text-base">
              {totalProductPrice.toLocaleString()}원
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-200 md:text-base">포인트 사용</span>
            <span className="whitespace-nowrap text-sm text-primary-300 md:text-base">
              -{pointAmount.toLocaleString()}원
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-200 md:text-base">배송비</span>
            <span className="whitespace-nowrap text-sm text-text-100 md:text-base">
              {shippingFee === 0 ? '무료' : `${shippingFee.toLocaleString()}원`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
