import { create } from 'zustand';
import type { SellerProductDetail, Tag } from '@/types/product';

interface ProductStore {
  currentProduct: SellerProductDetail | null;
  currentProductTags: Tag[]; // 현재 상품의 태그 정보
  setCurrentProduct: (product: SellerProductDetail | null) => void;
  setCurrentProductTags: (tags: Tag[]) => void;
  clearCurrentProduct: () => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  currentProduct: null,
  currentProductTags: [],
  setCurrentProduct: (product) => set({ currentProduct: product }),
  setCurrentProductTags: (tags) => set({ currentProductTags: tags }),
  clearCurrentProduct: () => set({ currentProduct: null, currentProductTags: [] }),
}));
