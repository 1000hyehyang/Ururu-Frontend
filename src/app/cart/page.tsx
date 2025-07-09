'use client';

import React from 'react';
import { NoFooterLayout } from '@/components/layout/layouts';
import { CartItem as CartItemComponent, CartSelectAll, CartSummary } from '@/components/cart';
import { useCart } from '@/hooks/useCart';
import { useAuthGuard } from '@/hooks';
import { mockCartData, calculateCartSummary } from '@/data/cart';
import type { CartItem } from '@/types/cart';

// 빈 장바구니 컴포넌트
function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="mb-4 text-6xl">🛒</div>
      <h2 className="mb-2 text-xl font-semibold text-text-100">장바구니가 비어있습니다</h2>
      <p className="text-text-200">상품을 추가해보세요!</p>
    </div>
  );
}

// 장바구니 목록 컴포넌트
function CartList({
  cartItems,
  onToggleSelect,
  onUpdateQuantity,
  onRemove,
}: {
  cartItems: CartItem[];
  onToggleSelect: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}) {
  return (
    <div className="space-y-4">
      {cartItems.map((item) => (
        <CartItemComponent
          key={item.id}
          item={item}
          onToggleSelect={onToggleSelect}
          onUpdateQuantity={onUpdateQuantity}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

export default function CartPage() {
  const { isLoggedIn, isLoading } = useAuthGuard();
  const {
    cartItems,
    toggleSelectAll,
    toggleSelectItem,
    updateQuantity,
    removeItem,
    isAllSelected,
    isPartiallySelected,
  } = useCart(mockCartData);

  const summary = calculateCartSummary(cartItems);

  // 로딩 중이거나 로그인하지 않은 경우 로딩 화면 표시
  if (isLoading || !isLoggedIn) {
    return (
      <NoFooterLayout>
        <div className="container mx-auto max-w-6xl px-6 py-8 md:px-8 md:py-12">
          <div className="flex items-center justify-center py-16">
            <div className="text-text-200">로딩 중...</div>
          </div>
        </div>
      </NoFooterLayout>
    );
  }

  const handlePurchase = () => {
    // TODO: 결제 페이지로 이동
    console.log('구매하기 클릭');
  };

  return (
    <NoFooterLayout>
      <div className="container mx-auto max-w-6xl px-6 py-8 md:px-8 md:py-12">
        <h1 className="mb-8 text-2xl font-bold text-text-100">장바구니</h1>

        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* 장바구니 목록 */}
            <div className="lg:col-span-2">
              <CartSelectAll
                isAllSelected={isAllSelected}
                isPartiallySelected={isPartiallySelected}
                onToggleSelectAll={toggleSelectAll}
                selectedCount={summary.selectedCount}
                totalCount={cartItems.length}
              />
              <CartList
                cartItems={cartItems}
                onToggleSelect={toggleSelectItem}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            </div>

            {/* 결제 요약 */}
            <div className="lg:col-span-1">
              <CartSummary
                totalProductPrice={summary.totalProductPrice}
                shippingFee={summary.shippingFee}
                totalPrice={summary.totalPrice}
                selectedCount={summary.selectedCount}
                onPurchase={handlePurchase}
              />
            </div>
          </div>
        )}
      </div>
    </NoFooterLayout>
  );
}
