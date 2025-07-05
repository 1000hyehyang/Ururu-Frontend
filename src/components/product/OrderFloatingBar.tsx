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
            className={PRODUCT_STYLES.button.cart}
            onClick={handleAddToCart}
          >
            <span className="text-xs font-medium md:text-sm">장바구니</span>
          </Button>
          <Button className={PRODUCT_STYLES.button.buyNow} onClick={handleBuyNow}>
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
          <div className={PRODUCT_STYLES.drawer.header}>
            <h3 className={PRODUCT_STYLES.drawer.title}>옵션 선택</h3>
            <Button
              variant="ghost"
              size="icon"
              className={PRODUCT_STYLES.button.close}
              onClick={handleCloseDrawer}
            >
              <X className="h-5 w-5 md:h-6 md:w-6" />
            </Button>
          </div>

          {/* Drawer 내용 */}
          <div
            className={PRODUCT_STYLES.drawer.content}
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {/* 상품 정보 */}
            <div className={PRODUCT_STYLES.drawer.productInfo}>
              <Image
                src={product.mainImage}
                alt={product.name}
                width={80}
                height={80}
                className={PRODUCT_STYLES.image.drawer}
              />
              <div className="flex-1">
                <h4 className={PRODUCT_STYLES.drawer.productName}>{product.name}</h4>
                <div className={PRODUCT_STYLES.drawer.productPrice}>
                  <span className={PRODUCT_STYLES.drawer.productDiscount}>
                    {product.discountRate}%
                  </span>
                  <span className={PRODUCT_STYLES.drawer.productOriginal}>
                    {product.originalPrice.toLocaleString()}원
                  </span>
                  <span className={PRODUCT_STYLES.drawer.productCurrent}>
                    {product.price.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>

            {/* 옵션 선택 */}
            <div className="mb-6">
              <h5 className={PRODUCT_STYLES.drawer.optionTitle}>옵션 선택</h5>
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
            <div className={PRODUCT_STYLES.drawer.totalInfo}>
              <span className={PRODUCT_STYLES.drawer.totalText}>
                총 구매 수량 <span className={PRODUCT_STYLES.drawer.totalBold}>{totalCount}개</span>
              </span>
              <span className={PRODUCT_STYLES.drawer.totalPrice}>
                총 {totalPrice.toLocaleString()}원
              </span>
            </div>
          </div>

          {/* Drawer 하단 버튼 */}
          <div className={PRODUCT_STYLES.drawer.footer}>
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
