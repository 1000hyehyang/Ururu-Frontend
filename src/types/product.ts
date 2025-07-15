// 상품 관련 공통 타입 정의
import type { ApiResponse } from './api';

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

// 상품 수정용 옵션 타입 (기존 옵션은 숫자 id, 새 옵션은 null)
export interface ProductEditOption {
  id: number | null;
  name: string;
  price: number;
  image: File | null;
  imageUrl?: string; // 기존 이미지 URL (수정 시에만 사용)
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
  options?: ProductEditOption[];
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

export interface ProductEditProps {
  productId: string;
}

export interface UpdateProductRequest {
  name: string;
  description: string;
  categoryIds: number[];
  tagCategoryIds: number[];
  productOptions: Array<{
    id: number | null;
    name: string;
    price: number;
    fullIngredients: string;
  }>;
  productNotice: Record<string, any>;
}

// 상품 관리 API 관련 타입
export interface SellerProductCategory {
  id: number;
  name: string;
  depth: number;
  path: string;
  orderIndex: number;
}

export interface SellerProductTagCategory {
  id: number;
  tagCategoryName: string;
}

export interface SellerProduct {
  id: number;
  name: string;
  description: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
  categories: SellerProductCategory[];
  tagCategories: SellerProductTagCategory[];
}

export interface Pageable {
  offset: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  unpaged: boolean;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface SellerProductListResponse {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  size: number;
  content: SellerProduct[];
  number: number;
  sort: Sort;
  numberOfElements: number;
  pageable: Pageable;
  empty: boolean;
}

// API 응답 래퍼 타입은 api.ts에서 import하여 사용

// 상품 목록 API 응답 타입
export type SellerProductListApiResponse = ApiResponse<SellerProductListResponse>;

// 판매자 상품 통계 타입
export interface SellerProductStats {
  totalCount: number;
  activeCount: number;
  inactiveCount: number;
}

export type SellerProductStatsApiResponse = ApiResponse<SellerProductStats>;

// 상품 상세 조회 API 관련 타입
export interface SellerProductOption {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  fullIngredients: string;
  createdAt: string;
  updatedAt: string;
}

export interface SellerProductNotice {
  id: number;
  capacity: string;
  spec: string;
  expiry: string;
  usage: string;
  manufacturer: string;
  responsibleSeller: string;
  countryOfOrigin: string;
  functionalCosmetics: boolean;
  caution: string;
  warranty: string;
  customerServiceNumber: string;
}

export interface SellerProductTag {
  id: number;
  tagCategoryName: string;
}

export interface SellerProductDetail {
  id: number;
  name: string;
  description: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
  categories: SellerProductCategory[];
  productOptions: SellerProductOption[];
  productNotice: SellerProductNotice;
  productTags: SellerProductTag[];
}

export type SellerProductDetailApiResponse = ApiResponse<SellerProductDetail>;
