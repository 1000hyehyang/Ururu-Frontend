import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Minus, Plus } from 'lucide-react';
import type { SelectedOption, Product } from '@/types/product';
import Image from 'next/image';

interface OptionCardProps {
  option: SelectedOption;
  price: number;
  product: Product; // Product 전체를 받아서 옵션별 가격 계산
  onRemove: (value: string) => void;
  onQuantityChange: (value: string, delta: number) => void;
  className?: string;
}

export const OptionCard = ({
  option,
  price,
  product,
  onRemove,
  onQuantityChange,
  className = '',
}: OptionCardProps) => {
  // 옵션별 가격 계산
  const optionData = product.options.find((opt) => opt.id === option.value);
  const optionPrice = optionData ? optionData.price : price;
  const maxQuantity = optionData?.maxQuantity || 999; // 최대 수량 제한
  return (
    <Card
      className={`flex w-full items-center justify-between gap-2 rounded-lg border-none bg-bg-200 p-3 md:p-4 ${className}`}
    >
      <CardContent className="flex w-full flex-1 flex-col gap-2 bg-transparent p-0">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            {/* 옵션 이미지 */}
            {optionData?.imageUrl ? (
              <div className="flex-shrink-0">
                <Image
                  src={optionData.imageUrl}
                  alt={option.label}
                  width={40}
                  height={40}
                  className="rounded-lg object-cover"
                  onError={(e) => {
                    console.error('Image load failed:', optionData.imageUrl);
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            ) : (
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-200">
                <span className="text-xs text-gray-500">No Image</span>
              </div>
            )}
            {/* 옵션 이름 */}
            <div className="flex flex-col">
              <span className="text-sm text-text-100 md:text-base">{option.label}</span>
              {/* 재고 정보 표시 */}
              {optionData?.currentStock !== undefined && (
                <span className="text-xs text-text-300">재고: {optionData.currentStock}개</span>
              )}
              {/* 품절 상태 표시 */}
              {optionData?.isOutOfStock && <span className="text-xs text-red-500">품절</span>}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 p-0 md:h-6 md:w-6"
            onClick={() => onRemove(option.value)}
          >
            <X className="h-3 w-3 md:h-4 md:w-4" />
          </Button>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 rounded-md border-bg-300 p-0 hover:bg-bg-300 active:bg-bg-300 md:h-8 md:w-8"
                onClick={() => onQuantityChange(option.value, -1)}
                disabled={option.quantity <= 1}
              >
                <Minus className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
              <div className="flex h-7 w-[60px] items-center justify-center border-b border-t border-bg-300 bg-bg-100 md:h-8 md:w-[68px]">
                <span className="text-sm text-text-100 md:text-base">{option.quantity}</span>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 rounded-md border-bg-300 p-0 hover:bg-bg-300 active:bg-bg-300 md:h-8 md:w-8"
                onClick={() => onQuantityChange(option.value, 1)}
                disabled={option.quantity >= maxQuantity}
              >
                <Plus className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
            </div>
            {/* 최대 수량 도달 시 helper text */}
            {option.quantity >= maxQuantity && (
              <div className="text-xs text-primary-300">최대 구매 수량은 {maxQuantity}개입니다</div>
            )}
          </div>
          <span className="text-sm font-semibold text-text-100 md:text-base">
            {(optionPrice * option.quantity).toLocaleString()}원
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
