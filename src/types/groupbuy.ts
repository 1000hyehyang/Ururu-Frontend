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
