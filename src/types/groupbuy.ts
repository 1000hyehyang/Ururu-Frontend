export interface GroupBuyTop3 {
  id: number;
  title: string;
  thumbnailUrl: string;
  displayFinalPrice: number;
  startPrice: number;
  maxDiscountRate: number;
  endsAt: string;
  orderCount: number;
  createdAt: string;
}

export interface GroupBuyTop3Response {
  success: boolean;
  message: string;
  data: GroupBuyTop3[];
}

export interface GroupBuyRankingTop100Response {
  success: boolean;
  message: string;
  data: {
    items: GroupBuyTop3[];
    [key: string]: any;
  };
}

// 카테고리별 랭킹 API 응답도 GroupBuyTop3Response와 동일하게 사용 가능

// 공구 등록 API 관련 타입
export interface GroupBuyProductOption {
  optionId: number;
  optionName: string;
  optionUrl: string;
}

export interface GroupBuyProduct {
  productId: number;
  productName: string;
  options: GroupBuyProductOption[];
}

export interface GroupBuyCreateResponse {
  success: boolean;
  message: string;
  data: {
    products: GroupBuyProduct[];
  };
}

// 공동구매 등록 API 요청 타입
export interface GroupBuyOptionRequest {
  id: number;
  productOptionId: number;
  stock: number;
  priceOverride: number;
}

export interface GroupBuyDiscountStage {
  count: number;
  rate: number;
}

export interface GroupBuyImageRequest {
  id: number;
  displayOrder: number;
  detailImageUrl: string;
}

export interface GroupBuyCreateRequest {
  title: string;
  description: string;
  productId: number;
  discountStages: GroupBuyDiscountStage[];
  limitQuantityPerMember: number;
  endsAt: string;
  options: GroupBuyOptionRequest[];
  images?: GroupBuyImageRequest[];
}

// 공동구매 등록 API 응답 타입
export interface GroupBuyCreateApiResponse {
  success: boolean;
  message: string;
  data: {
    groupBuyId: number;
    title: string;
    createdAt: string;
  };
}

// 공동구매 상세 조회 API 관련 타입
export interface GroupBuyProductDetail {
  id: number;
  name: string;
  description: string;
  categoryIds: string[];
  tags: string[];
  productNotice: GroupBuyProductNotice;
}

export interface GroupBuyOptionDetail {
  id: number;
  productOptionId: number;
  optionName: string;
  optionImageUrl: string;
  fullIngredients: string;
  initialStock: number;
  currentStock: number;
  soldQuantity: number;
  isOutOfStock: boolean;
  priceOverride: number;
  salePrice: number;
}

export interface GroupBuyImageDetail {
  id: number;
  imageUrl: string;
  displayOrder: number;
}

export interface GroupBuyProductNotice {
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

export interface GroupBuyDetail {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  displayFinalPrice: number;
  startPrice: number;
  maxDiscountRate: number;
  discountStages: GroupBuyDiscountStage[];
  limitQuantityPerMember: number;
  status: 'OPEN' | 'CLOSED' | 'DRAFT';
  endsAt: string;
  currentOrderCount: number;
  product: GroupBuyProductDetail;
  options: GroupBuyOptionDetail[];
  images: GroupBuyImageDetail[];
  productNotice: GroupBuyProductNotice;
  createdAt: string;
  updatedAt: string;
}

export interface GroupBuyDetailResponse {
  success: boolean;
  message: string;
  data: GroupBuyDetail;
}

// 판매자 그룹바이 목록 관련 타입
export interface SellerGroupBuy {
  id: number;
  title: string;
  thumbnailUrl: string;
  displayFinalPrice: number;
  startPrice: number;
  maxDiscountRate: number;
  status: 'OPEN' | 'CLOSED' | 'DRAFT';
  startAt: string;
  endsAt: string;
  totalStock: number;
  soldQuantity: number;
  orderCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface SellerGroupBuyListResponse {
  success: boolean;
  message: string;
  data: {
    content: SellerGroupBuy[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
    numberOfElements: number;
    empty: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    pageable: {
      offset: number;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      pageNumber: number;
      pageSize: number;
      paged: boolean;
      unpaged: boolean;
    };
  };
}
