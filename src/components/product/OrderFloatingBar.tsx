'use client';

import React from 'react';
import type { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { X, Share } from 'lucide-react';
import Image from 'next/image';
import { useProductOptions, useProductDrawer, useProductActions } from '@/hooks';
import { OptionCard } from './OptionCard';
import { OptionSelect } from './OptionSelect';
import { ActionButtons } from './ActionButtons';
import { PRODUCT_STYLES } from '@/constants/product-styles';

interface OrderFloatingBarProps {
  product: Product;
}

export function OrderFloatingBar({ product }: OrderFloatingBarProps) {
  const { isDrawerOpen, openDrawer, closeDrawer } = useProductDrawer();
  const {
    selectedOptions,
    totalPrice,
    totalCount,
    handleSelectOption,
    handleRemoveOption,
    handleChangeQuantity,
  } = useProductOptions(product);

  const { handleShare, handlePurchase } = useProductActions();

  const handleBuyNow = () => {
    openDrawer();
  };

  const handleAddToCart = () => {
    openDrawer();
  };

  const handleCloseDrawer = () => {
    closeDrawer();
  };

  const handlePurchaseAndClose = () => {
    handlePurchase();
    closeDrawer();
  };

  return (
    <>
      {/* 모바일/태블릿 하단 플로팅 바 */}
      <div className={PRODUCT_STYLES.container.floating}>
        <Button
          variant="outline"
          className={`${PRODUCT_STYLES.button.floating} hover:bg-bg-200 active:bg-bg-200`}
          onClick={handleShare}
        >
          <Share className="h-5 w-5 text-text-100 md:h-6 md:w-6" />
        </Button>
        <div className="flex flex-1 items-center gap-3 px-4 md:gap-4">
          <Button
            variant="outline"
            className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border-primary-300 text-primary-300 transition hover:bg-primary-100 focus:ring-primary-300 active:bg-primary-100 md:h-12 md:text-sm"
            onClick={handleAddToCart}
          >
            <span className="text-xs font-medium md:text-sm">장바구니</span>
          </Button>
          <Button
            className="hover:bg-primary-400 active:bg-primary-500 flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-primary-300 text-text-on transition focus:ring-primary-300 md:h-12 md:text-sm"
            onClick={handleBuyNow}
          >
            <span className="text-xs font-medium md:text-sm">바로구매</span>
          </Button>
        </div>
      </div>

      {/* Drawer 배경 오버레이 */}
      {isDrawerOpen && <div className={PRODUCT_STYLES.overlay} onClick={handleCloseDrawer} />}

      {/* 옵션 선택 Drawer */}
      <div
        className={`${PRODUCT_STYLES.container.drawer} ${
          isDrawerOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className={PRODUCT_STYLES.container.drawerContent}>
          {/* Drawer 헤더 */}
          <div className="flex items-center justify-between border-b border-bg-200 px-4 py-4 md:px-6 md:py-5">
            <h3 className="text-lg font-semibold text-text-100 md:text-xl">옵션 선택</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0 md:h-10 md:w-10"
              onClick={handleCloseDrawer}
            >
              <X className="h-5 w-5 md:h-6 md:w-6" />
            </Button>
          </div>

          {/* Drawer 내용 */}
          <div
            className="max-h-[60vh] overflow-y-auto px-4 py-4 md:px-6 md:py-5"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {/* 상품 정보 */}
            <div className="mb-6 flex items-start gap-4 rounded-lg bg-bg-100 p-4 shadow-sm md:p-5">
              <Image
                src={product.mainImage}
                alt={product.name}
                width={80}
                height={80}
                className="h-16 w-16 rounded-lg object-cover md:h-20 md:w-20"
              />
              <div className="flex-1">
                <h4 className="mb-2 line-clamp-2 text-sm font-medium text-text-100 md:text-base">
                  {product.name}
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-primary-300 md:text-xl">
                    {product.discountRate}%
                  </span>
                  <span className="text-sm text-text-300 line-through md:text-base">
                    {product.originalPrice.toLocaleString()}원
                  </span>
                  <span className="text-lg font-bold text-primary-300 md:text-xl">
                    {product.price.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>

            {/* 옵션 선택 */}
            <div className="mb-6">
              <h5 className="mb-3 text-base font-medium text-text-100 md:text-lg">옵션 선택</h5>
              <OptionSelect
                product={product}
                onSelect={handleSelectOption}
                className="w-full"
                selectedOptions={selectedOptions}
              />
            </div>

            {/* 선택된 옵션들 */}
            {selectedOptions.length > 0 && (
              <div className="mb-6 flex flex-col gap-3">
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
            <div className="mb-6 flex items-center justify-between border-t border-bg-200 pt-4 md:pt-5">
              <span className="text-sm text-text-100 md:text-base">
                총 구매 수량 <span className="font-semibold">{totalCount}개</span>
              </span>
              <span className="text-lg font-semibold text-text-100 md:text-xl">
                총 {totalPrice.toLocaleString()}원
              </span>
            </div>
          </div>

          {/* Drawer 하단 버튼 */}
          <div className="border-t border-bg-200 px-4 py-4 md:px-6 md:py-5">
            <ActionButtons
              onAddToCart={handleAddToCart}
              onBuyNow={handlePurchaseAndClose}
              size="large"
            />
          </div>
        </div>
      </div>
    </>
  );
}
