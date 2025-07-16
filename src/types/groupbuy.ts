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
  minQuantity: number;
  discountRate: number;
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
