import type { Product } from '@/types/product';
import type { CartItem } from '@/types/cart';
import { mockProductData } from './mock-product';

export const mockCartData: CartItem[] = [
  {
    id: '1',
    product: mockProductData,
    selectedOption: {
      value: 'option1',
      label: '[태닝 시나모롤]03 베어 그레이프 기획',
    },
    quantity: 1,
    isSelected: true,
  },
  {
    id: '2',
    product: {
      ...mockProductData,
      id: '2',
    },
    selectedOption: {
      value: 'option2',
      label: '[태닝 포차코] 23 피치 피치 미 기획',
    },
    quantity: 2,
    isSelected: true,
  },
  {
    id: '3',
    product: {
      ...mockProductData,
      id: '3',
    },
    selectedOption: {
      value: 'option3',
      label: '[NEW태닝 시나모롤]32태니구아바 기획',
    },
    quantity: 1,
    isSelected: false,
  },
];

export const calculateCartSummary = (cartItems: CartItem[]) => {
  const selectedItems = cartItems.filter((item) => item.isSelected);
  const totalProductPrice = selectedItems.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const shippingFee = totalProductPrice >= 50000 ? 0 : 3000;
  const totalPrice = totalProductPrice + shippingFee;

  return {
    totalProductPrice,
    shippingFee,
    totalPrice,
    selectedCount: selectedItems.length,
  };
};
