// API 응답 기본 타입
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

// 에러 응답 타입 (HTTP 에러 처리용)
export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

// 소셜 로그인 관련 타입
export interface SocialLoginResponse {
  success: boolean;
  user?: {
    id: string;
    email: string;
    name: string;
    profileImage?: string;
    userType: 'buyer' | 'seller';
  };
  token?: {
    accessToken: string;
    refreshToken: string;
  };
  message?: string;
}

export interface SocialLoginUrlResponse {
  loginUrl: string;
}

// 백엔드 API 응답 형식
export interface ApiResponseFormat<T> {
  success: boolean;
  message: string;
  data: T;
}

// 소셜 로그인 요청
export interface SocialLoginRequest {
  provider: string;
  code: string;
}

// 장바구니 관련 타입
export interface ApiCartItem {
  cartItemId: number;
  groupbuyOptionId: number;
  quantity: number;
  productName: string;
  optionName: string;
  optionImage: string;
  price: number;
  endsAt: string;
}

export interface ApiCartResponse {
  cartItems: ApiCartItem[];
}

// 장바구니 수량 변경 관련 타입
export interface ApiUpdateCartQuantityRequest {
  quantityChange: number;
}

export interface ApiUpdateCartQuantityResponse {
  cartItemId: number;
  quantity: number;
}

// 장바구니 아이템 삭제 관련 타입
export interface ApiDeleteCartItemResponse {
  success: boolean;
  message: string;
}

// 장바구니 주문 생성 관련 타입
export interface ApiCreateOrderRequest {
  cartItemIds: number[];
}

export interface ApiCreateOrderItem {
  groupbuyOptionId: number;
  quantity: number;
  productName: string;
  optionName: string;
  price: number;
  optionImage: string;
}

export interface ApiCreateOrderResponse {
  orderId: string;
  orderItems: ApiCreateOrderItem[];
  totalAmount: number;
  availablePoints: number;
  shippingFee: number;
}

// 배송지 관련 타입
export interface ShippingAddress {
  id: number;
  member_id: number;
  label: string;
  phone: string;
  zonecode: string;
  address1: string;
  address2: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface ShippingAddressResponse {
  addresses: ShippingAddress[];
}

// 여러 옵션 동시 장바구니 담기 요청/응답 타입
export type ApiAddItemsToCartRequest = Array<{
  groupbuyOptionId: number;
  quantity: number;
}>;

export interface ApiAddItemsToCartResponse {
  cartItems: Array<{
    cartItemId: number;
    quantity: number;
  }>;
}
