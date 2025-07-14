import api from '@/lib/axios';
import type { ApiResponse } from '@/types/api';
import type { ProductMetadataResponse, CreateProductRequest } from '@/types/product';

/**
 * 상품 관련 서비스 (상품 등록 등)
 */
export class ProductService {
  /**
   * 상품 등록을 위한 메타데이터 조회 (카테고리, 태그 등)
   * @returns {Promise<ProductMetadataResponse>}
   */
  static async getProductMetadata(): Promise<ProductMetadataResponse> {
    const response = await api.get<ApiResponse<ProductMetadataResponse>>('/products/create');
    if (!response.data.success) {
      throw new Error(response.data.message || '상품 메타데이터 조회에 실패했습니다.');
    }
    if (!response.data.data) {
      throw new Error('응답 데이터가 없습니다.');
    }
    return response.data.data;
  }

  /**
   * 상품 등록
   * @param product 상품 정보(JSON 직렬화)
   * @param optionImages 옵션 이미지 파일 배열
   */
  static async createProduct(product: CreateProductRequest, optionImages: File[]): Promise<any> {
    const formData = new FormData();
    // Content-Type 명시적으로 지정
    formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
    optionImages.forEach((file) => {
      formData.append('optionImages', file);
    });
    const response = await api.post('/products', formData);
    if (!response.data.success) {
      throw new Error(response.data.message || '상품 등록에 실패했습니다.');
    }
    return response.data.data;
  }
}
