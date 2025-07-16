'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CartSummaryProps {
  totalProductPrice: number;
  shippingFee: number;
  totalPrice: number;
  selectedCount: number;
  isLoading?: boolean;
  onPurchase: () => void;
}

export function CartSummary({
  totalProductPrice,
  shippingFee,
  totalPrice,
  selectedCount,
  isLoading = false,
  onPurchase,
}: CartSummaryProps) {
  return (
    <div className="space-y-4">
      {/* 구분선 */}
      <div className="h-px bg-bg-300" />

      {/* 결제 요약 */}
      <Card className="rounded-2xl border-0 bg-bg-100 shadow-none">
        <CardContent className="px-0 py-4 md:py-6">
          {/* 타이틀과 총 결제금액 */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-text-100 md:text-xl">최종 결제 금액</h2>
            <span className="whitespace-nowrap text-xl font-bold text-text-100 md:text-2xl">
              {totalPrice.toLocaleString()}원
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
              <span className="text-sm text-text-200 md:text-base">배송비</span>
              <span className="whitespace-nowrap text-sm text-text-100 md:text-base">
                {shippingFee === 0 ? '무료' : `${shippingFee.toLocaleString()}원`}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 구매 버튼 */}
      <Button
        className="h-12 w-full rounded-lg bg-primary-300 text-sm font-medium text-text-on transition hover:opacity-80 focus:ring-primary-300 active:opacity-90 md:h-14 md:text-base"
        onClick={onPurchase}
        disabled={selectedCount === 0 || isLoading}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-text-on border-t-transparent"></div>
            <span>주문 생성 중...</span>
          </div>
        ) : (
          `구매하기 (${selectedCount}개)`
        )}
      </Button>
    </div>
  );
}
