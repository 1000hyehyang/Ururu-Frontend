import api from '@/lib/axios';
import {
  ApiCartResponse,
  ApiResponseFormat,
  ApiUpdateCartQuantityRequest,
  ApiUpdateCartQuantityResponse,
  ApiDeleteCartItemResponse,
  ApiCreateOrderRequest,
  ApiCreateOrderResponse,
  ApiAddItemsToCartRequest,
  ApiAddItemsToCartResponse,
} from '@/types/api';

/**
 * 장바구니 조회
 * @returns 장바구니 아이템 목록
 */
export async function getCart(): Promise<ApiResponseFormat<ApiCartResponse>> {
  const response = await api.get<ApiResponseFormat<ApiCartResponse>>('/cart');
  return response.data;
}

/**
 * 장바구니 수량 변경
 * @param cartItemId - 변경할 장바구니 아이템 ID
 * @param quantityChange - 변경할 수량 (양수: 증가, 음수: 감소)
 * @returns 변경된 장바구니 아이템 정보
 */
export async function updateCartQuantity(
  cartItemId: number,
  quantityChange: number,
): Promise<ApiResponseFormat<ApiUpdateCartQuantityResponse>> {
  const response = await api.put<ApiResponseFormat<ApiUpdateCartQuantityResponse>>(
    `/cart/items/${cartItemId}`,
    { quantityChange },
  );
  return response.data;
}

/**
 * 장바구니 아이템 삭제
 * @param cartItemId - 삭제할 장바구니 아이템 ID
 * @returns 삭제 성공 응답
 */
export async function deleteCartItem(
  cartItemId: number,
): Promise<ApiResponseFormat<ApiDeleteCartItemResponse>> {
  const response = await api.delete<ApiResponseFormat<ApiDeleteCartItemResponse>>(
    `/cart/items/${cartItemId}`,
  );
  return response.data;
}

/**
 * 장바구니에서 주문 생성
 * @param cartItemIds - 주문할 장바구니 아이템 ID 목록
 * @returns 생성된 주문 정보
 */
export async function createOrderFromCart(
  cartItemIds: number[],
): Promise<ApiResponseFormat<ApiCreateOrderResponse>> {
  const response = await api.post<ApiResponseFormat<ApiCreateOrderResponse>>('/cart/orders', {
    cartItemIds,
  });
  return response.data;
}

/**
 * 여러 옵션을 한 번에 장바구니에 담기
 * @param items - [{ groupbuyOptionId, quantity }, ...]
 * @returns 추가된 장바구니 아이템 정보
 */
export async function addItemsToCart(
  items: ApiAddItemsToCartRequest,
): Promise<ApiResponseFormat<ApiAddItemsToCartResponse>> {
  const response = await api.post<ApiResponseFormat<ApiAddItemsToCartResponse>>(
    '/cart/items',
    items,
  );
  return response.data;
}
