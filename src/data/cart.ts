import type { CartItem, CartProduct } from '@/types/cart';
import { mockProductData } from './mock-product';

// Mock 데이터를 위한 CartProduct 변환
const mockCartProduct: CartProduct = {
  id: mockProductData.id,
  name: mockProductData.name,
  mainImage: mockProductData.mainImage,
  price: mockProductData.price,
  originalPrice: mockProductData.originalPrice,
  discountRate: mockProductData.discountRate,
};

export const mockCartData: CartItem[] = [
  {
    id: '1',
    product: mockCartProduct,
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
      ...mockCartProduct,
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
      ...mockCartProduct,
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

  const shippingFee = totalProductPrice >= 0 ? 0 : 3000;
  const totalPrice = totalProductPrice + shippingFee;

  return {
    totalProductPrice,
    shippingFee,
    totalPrice,
    selectedCount: selectedItems.length,
  };
};
