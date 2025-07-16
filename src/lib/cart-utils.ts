import type { Product } from '@/types/product';
import type { CartProduct, CartItem } from '@/types/cart';
import type { ApiCartItem } from '@/types/api';

/**
 * Product 타입에서 장바구니에 필요한 정보만 추출
 */
export const extractCartProduct = (product: Product): CartProduct => {
  return {
    id: product.id,
    name: product.name,
    mainImage: product.mainImage,
    price: product.price,
    originalPrice: product.originalPrice,
    discountRate: product.discountRate,
  };
};

/**
 * Product 배열을 CartProduct 배열로 변환
 */
export const extractCartProducts = (products: Product[]): CartProduct[] => {
  return products.map(extractCartProduct);
};

/**
 * API 응답을 CartItem으로 변환
 */
export const convertApiCartItemToCartItem = (apiItem: ApiCartItem): CartItem => {
  return {
    id: apiItem.cartItemId.toString(),
    product: {
      id: apiItem.groupbuyOptionId.toString(),
      name: apiItem.productName,
      mainImage: apiItem.optionImage,
      price: apiItem.price,
      originalPrice: apiItem.price, // API에서 할인 정보가 없으므로 동일하게 설정
      discountRate: 0,
    },
    selectedOption: {
      value: apiItem.groupbuyOptionId.toString(),
      label: apiItem.optionName,
    },
    quantity: apiItem.quantity,
    isSelected: true, // 기본값으로 모든 아이템을 선택된 상태로 설정
  };
};

/**
 * API 응답 배열을 CartItem 배열로 변환
 */
export const convertApiCartItemsToCartItems = (apiItems: ApiCartItem[]): CartItem[] => {
  return apiItems.map(convertApiCartItemToCartItem);
};
