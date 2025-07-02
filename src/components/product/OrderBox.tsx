'use client';

import React from 'react';
import type { FC } from 'react';
import type { mockProduct as mockProductType } from '@/data/mock-product';
import { Card } from '@/components/ui/card';
import { useProductOptions } from '@/hooks/useProductOptions';
import { generateBreadcrumb } from '@/constants/product-detail';
import { Breadcrumb } from './Breadcrumb';
import { OptionCard } from './OptionCard';
import { ProductInfo } from './ProductInfo';
import { OptionSelect } from './OptionSelect';
import { ActionButtons } from './ActionButtons';

interface OrderBoxProps {
  product: typeof mockProductType;
}

// 모바일용 주문 섹션 컴포넌트
export const MobileOrderSection: FC<OrderBoxProps> = ({ product }) => {
  return (
    <div className="w-full lg:hidden">
      <ProductInfo product={product} />
    </div>
  );
};

export const OrderBox: FC<OrderBoxProps> = ({ product }) => {
  const {
    selectedOptions,
    totalPrice,
    totalCount,
    handleSelectOption,
    handleRemoveOption,
    handleChangeQuantity,
  } = useProductOptions(product);

  const handleShare = () => {
    // 공유 로직
    console.log('공유하기');
  };

  const handleAddToCart = () => {
    // 장바구니 추가 로직
    console.log('장바구니 추가');
  };

  const handleBuyNow = () => {
    // 바로구매 로직
    console.log('바로구매');
  };

  return (
    <>
      {/* 데스크탑: 우측 고정 주문박스 */}
      <Card className="sticky top-10 hidden w-[489px] flex-col items-start gap-1 rounded-2xl border-0 bg-bg-100 p-8 xl:flex">
        {/* 브레드크럼 네비게이션 */}
        <Breadcrumb items={generateBreadcrumb(product.category)} className="mb-3" />

        {/* 상품 정보 */}
        <ProductInfo product={product} className="w-full" variant="desktop" />

        {/* 상품 선택 */}
        <OptionSelect
          product={product}
          onSelect={handleSelectOption}
          className="mb-4 mt-2 w-full"
          selectedOptions={selectedOptions}
        />
        {/* 선택된 옵션 목록 */}
        {selectedOptions.length > 0 && (
          <div className="mb-6 flex w-full flex-col gap-3">
            {selectedOptions.map((opt) => (
              <OptionCard
                key={opt.value}
                option={opt}
                price={product.price}
                onRemove={handleRemoveOption}
                onQuantityChange={handleChangeQuantity}
              />
            ))}
          </div>
        )}
        {/* 총 구매 정보 */}
        <div className="mb-8 flex h-8 w-full items-center justify-between">
          <span className="text-base text-text-100">
            총 구매 수량 <span className="font-semibold">{totalCount}개</span>
          </span>
          <span className="text-xl font-semibold text-text-100">
            총 {totalPrice.toLocaleString()}원
          </span>
        </div>
        {/* 액션 버튼 */}
        <ActionButtons
          onShare={handleShare}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />
      </Card>
    </>
  );
};
