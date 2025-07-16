'use client';

import React, { useEffect } from 'react';
import type { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Share, ChevronDown, ChevronUp } from 'lucide-react';
import { useProductOptions, useProductDrawer, useProductActions } from '@/hooks';
import { OptionCard } from './OptionCard';
import { OptionSelect } from './OptionSelect';
import { PRODUCT_STYLES } from '@/constants/product-styles';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  // Drawer 열림/닫힘에 따라 body 스크롤 제어
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // 컴포넌트 언마운트 시 스크롤 복원
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isDrawerOpen]);

  const handleToggleDrawer = () => {
    if (isDrawerOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  };

  const handleBuyNow = () => {
    if (isDrawerOpen && selectedOptions.length > 0) {
      closeDrawer();
      alert('바로구매 하러 가볼게요!');
    } else {
      openDrawer();
    }
  };

  const handleAddToCart = () => {
    if (isDrawerOpen && selectedOptions.length > 0) {
      alert('장바구니에 성공적으로 담았습니다!');
    } else {
      openDrawer();
    }
  };

  const handleCloseDrawer = () => {
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
            <button
              type="button"
              aria-label={isDrawerOpen ? '옵션 닫기' : '옵션 열기'}
              tabIndex={0}
              onClick={handleToggleDrawer}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleToggleDrawer()}
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-bg-200 focus:outline-none focus:ring-2 focus:ring-primary-300 md:h-10 md:w-10"
            >
              {isDrawerOpen ? (
                <ChevronDown className="h-6 w-6 text-text-300" />
              ) : (
                <ChevronUp className="h-6 w-6 text-text-300" />
              )}
            </button>
          </div>

          {/* Drawer 내용 */}
          <div
            className="max-h-[60vh] overflow-y-auto px-4 py-4"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
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
              <div
                className="mb-6 flex max-h-40 flex-col gap-3 overflow-y-auto"
                style={{
                  WebkitOverflowScrolling: 'touch',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                <style jsx>{`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
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
            <div className={PRODUCT_STYLES.drawer.totalInfo}>
              <span className={PRODUCT_STYLES.drawer.totalText}>
                총 구매 수량 <span className={PRODUCT_STYLES.drawer.totalBold}>{totalCount}개</span>
              </span>
              <span className={PRODUCT_STYLES.drawer.totalPrice}>
                총 {totalPrice.toLocaleString()}원
              </span>
            </div>
          </div>

          {/* Drawer 하단 여백 */}
          <div className={PRODUCT_STYLES.drawer.footer} />
        </div>
      </div>
    </>
  );
}
