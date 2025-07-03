import type { Product } from './product';

// CartProduct를 Product의 서브셋으로 정의
export type CartProduct = Pick<
  Product,
  'id' | 'name' | 'mainImage' | 'price' | 'originalPrice' | 'discountRate'
>;

export interface CartItem {
  id: string;
  product: Product;
  selectedOption: {
    value: string;
    label: string;
  };
  quantity: number;
  isSelected: boolean;
}
