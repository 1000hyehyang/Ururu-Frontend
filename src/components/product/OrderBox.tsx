'use client';

import React, { useState } from 'react';
import type { Product } from '@/types/product';
import { Card } from '@/components/ui/card';
import { useProductOptions, useProductActions } from '@/hooks';
import { generateBreadcrumbFromCategoryIds } from '@/constants/product-detail';
import { Breadcrumb } from './Breadcrumb';
import { OptionCard } from './OptionCard';
import { ProductInfo } from './ProductInfo';
import { OptionSelect } from './OptionSelect';
import { ActionButtons } from './ActionButtons';

interface OrderBoxProps {
  product: Product;
}

// 모바일용 주문 섹션 컴포넌트
export const MobileOrderSection = ({ product }: OrderBoxProps) => {
  return (
    <div className="w-full xl:hidden">
      <ProductInfo product={product} />
    </div>
  );
};

export const OrderBox = ({ product }: OrderBoxProps) => {
  const {
    selectedOptions,
    totalPrice,
    totalCount,
    handleSelectOption,
    handleRemoveOption,
    handleChangeQuantity,
  } = useProductOptions(product);

  const { handleShare, handleAddToCart, handleBuyNow } = useProductActions();
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCartClick = async () => {
    if (selectedOptions.length > 0) {
      setIsAddingToCart(true);
      try {
        await handleAddToCart(selectedOptions, product.options);
      } finally {
        setIsAddingToCart(false);
      }
    }
  };

  const handleBuyNowClick = async () => {
    if (selectedOptions.length > 0) {
      setIsCreatingOrder(true);
      try {
        await handleBuyNow(product.id, selectedOptions);
      } finally {
        setIsCreatingOrder(false);
      }
    }
  };

  return (
    <>
      {/* 데스크탑: 우측 고정 주문박스 */}
      <Card className="hidden w-[489px] flex-col items-start gap-1 rounded-2xl border-0 bg-bg-100 px-8 shadow-none xl:flex">
        {/* 브레드크럼 네비게이션 */}
        <Breadcrumb
          items={generateBreadcrumbFromCategoryIds(product.categoryIds || [])}
          className="mb-3"
        />

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
                product={product}
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
          onAddToCart={handleAddToCartClick}
          onBuyNow={handleBuyNowClick}
          isBuyNowLoading={isCreatingOrder}
          isAddToCartLoading={isAddingToCart}
        />
      </Card>
    </>
  );
};
