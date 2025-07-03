import { useState, useCallback } from 'react';
import type { CartItem } from '@/types/cart';

export const useCart = (initialCartItems: CartItem[]) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  // 전체 선택/해제
  const toggleSelectAll = useCallback(() => {
    const allSelected = cartItems.every((item) => item.isSelected);
    setCartItems((prev) => prev.map((item) => ({ ...item, isSelected: !allSelected })));
  }, [cartItems]);

  // 개별 상품 선택/해제
  const toggleSelectItem = useCallback((itemId: string) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, isSelected: !item.isSelected } : item)),
    );
  }, []);

  // 수량 변경
  const updateQuantity = useCallback((itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)),
    );
  }, []);

  // 상품 삭제
  const removeItem = useCallback((itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  // 전체 선택 여부
  const isAllSelected = cartItems.length > 0 && cartItems.every((item) => item.isSelected);

  // 부분 선택 여부
  const isPartiallySelected = cartItems.some((item) => item.isSelected) && !isAllSelected;

  return {
    cartItems,
    toggleSelectAll,
    toggleSelectItem,
    updateQuantity,
    removeItem,
    isAllSelected,
    isPartiallySelected,
  };
};
