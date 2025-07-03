import type { Product } from '@/types/product';
import type { CartProduct } from '@/types/cart';

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
