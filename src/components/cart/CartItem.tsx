'use client';

import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PriceDisplay } from './PriceDisplay';
import { QuantityControl } from './QuantityControl';
import type { CartItem as CartItemType } from '@/types/cart';

interface CartItemProps {
  item: CartItemType;
  onToggleSelect: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}

export function CartItem({ item, onToggleSelect, onUpdateQuantity, onRemove }: CartItemProps) {
  const handleQuantityChange = (delta: number) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity >= 1) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <Card className="w-full rounded-2xl border-0 bg-bg-100 shadow-none">
      <CardContent className="px-0 py-4 md:py-6">
        <div className="flex items-start gap-4">
          {/* 체크박스 */}
          <div className="flex-shrink-0 pt-1">
            <input
              type="checkbox"
              className="custom-checkbox"
              checked={item.isSelected}
              onChange={() => onToggleSelect(item.id)}
              aria-label={`${item.product.name} 선택`}
            />
          </div>

          {/* 상품 이미지 */}
          <div className="flex-shrink-0">
            <Image
              src={item.product.mainImage}
              alt={item.product.name}
              width={80}
              height={80}
              className="h-20 w-20 rounded-lg object-cover md:h-24 md:w-24"
            />
          </div>

          {/* 상품 정보 */}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                {/* 상품명 */}
                <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-text-100 md:text-base">
                  {item.product.name}
                </h3>

                {/* 옵션 정보 */}
                <p className="mb-2 line-clamp-2 text-sm text-text-200 md:text-base">
                  옵션: {item.selectedOption.label}
                </p>

                {/* 수량 */}
                <p className="mb-3 text-sm text-text-200 md:text-base">수량: {item.quantity}개</p>

                {/* 가격 */}
                <PriceDisplay
                  price={item.product.price}
                  originalPrice={item.product.originalPrice}
                  quantity={item.quantity}
                />
              </div>

              {/* 삭제 버튼 */}
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 flex-shrink-0 p-0 text-text-300 hover:bg-bg-200 hover:text-text-100"
                onClick={() => onRemove(item.id)}
                aria-label="상품 삭제"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* 수량 조절 및 총 가격 */}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {/* 수량 조절 */}
              <QuantityControl quantity={item.quantity} onQuantityChange={handleQuantityChange} />

              {/* 총 가격 */}
              <div className="flex items-center justify-between sm:justify-end">
                <span className="text-xs text-text-200 sm:hidden">총 가격:</span>
                <span className="whitespace-nowrap text-lg font-bold text-text-100 md:text-xl">
                  {(item.product.price * item.quantity).toLocaleString()}원
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
