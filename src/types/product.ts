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
  imageUrl?: string; // 옵션 이미지 URL
  fullIngredients: string;
  maxQuantity?: number; // 회원당 최대 구매 수량 제한
  initialStock?: number; // 초기 재고
  currentStock?: number; // 현재 재고
  soldQuantity?: number; // 옵션별 판매량 (API의 soldQuantity)
  currentOrderCount?: number; // 공동구매 총 판매량 (API의 currentOrderCount)
  priceOverride?: number; // 공동구매 시작가
  isOutOfStock?: boolean; // 품절 여부
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
  discountRate?: number; // 숫자형 할인율 추가
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
  categoryIds?: string[]; // 카테고리 ID 배열 추가
  shippingInfo: ShippingInfo;
  rewardTiers: RewardTier[];
  options: ProductOption[];
  tags?: string[]; // 상품 태그
  capacity?: string; // 내용물의 용량 또는 중량
  specification?: string; // 제품 주요 사양
  expiryDate?: string; // 사용기한(또는 개봉 후 사용기간)
  usage?: string; // 사용방법
  manufacturer?: string; // 화장품제조업자
  seller?: string; // 화장품책임판매업자
  country?: string; // 제조국
  functionalTest?: 'yes' | 'no'; // 기능성 화장품 식품의약품안전처 심사필 여부
  precautions?: string; // 사용할 때의 주의사항
  qualityStandard?: string; // 품질보증기준
  customerService?: string; // 소비자상담 전화번호
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
