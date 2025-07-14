// 상품 관련 공통 타입 정의

export interface SelectedOption {
  value: string;
  label: string;
  quantity: number;
}

export interface ProductOption {
  id: string;
  name: string;
  price: number;
  image: File | null;
  fullIngredients: string;
}

export interface RewardTier {
  participants: number;
  discount: string;
  achieved: boolean;
}

export interface ProductCategory {
  main: string;
  sub?: string;
}

export interface ShippingInfo {
  type: string;
  description: string;
  shippingFee: string;
}

export interface Product {
  id: string;
  name: string;
  mainImage: string;
  thumbnails: string[];
  detailImages: string[];
  price: number;
  originalPrice: number;
  discountRate: number;
  point: number;
  participants: number;
  targetParticipants: number;
  remainingDays: number;
  category: ProductCategory;
  shippingInfo: ShippingInfo;
  rewardTiers: RewardTier[];
  options: ProductOption[];
}

export interface Category {
  value: number;
  label: string;
  children: Category[];
}

export interface Tag {
  value: number;
  label: string;
}

export interface ProductMetadataResponse {
  categories: Category[];
  tags: Tag[];
}

// 진행률 계산 유틸리티 함수
export const calculateProgress = (participants: number, targetParticipants: number): number => {
  if (targetParticipants <= 0) return 0;
  return Math.min(100, Math.round((participants / targetParticipants) * 100));
};

// 할인율 계산 유틸리티 함수
export const calculateDiscountRate = (originalPrice: number, currentPrice: number): number => {
  if (originalPrice <= 0) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

export interface CreateProductRequest {
  name: string;
  description: string;
  categoryIds: number[];
  tagCategoryIds: number[];
  productOptions: Array<{
    name: string;
    price: number;
    fullIngredients: string;
  }>;
  productNotice: Record<string, any>;
}

export interface ProductFormData {
  name: string;
  description: string;
  categoryMain: string;
  categoryMiddle: string;
  categorySub: string;
  options: ProductOption[];
  capacity: string;
  capacityUnit: string;
  specification: string;
  expiryDate: string;
  usage: string;
  manufacturer: string;
  seller: string;
  country: string;
  functionalTest: 'yes' | 'no';
  precautions: string;
  qualityStandard: string;
  customerService: string;
}

export interface ProductRegistrationProps {
  categories: Category[];
  tags: Tag[];
}
