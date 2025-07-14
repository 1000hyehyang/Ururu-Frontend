import api from '@/lib/axios';
import type { ApiResponse } from '@/types/api';
import type {
  ProductMetadataResponse,
  CreateProductRequest,
  SellerProductListApiResponse,
  SellerProductListResponse,
  SellerProduct,
} from '@/types/product';

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

  /**
   * 판매자 상품 목록 조회 (페이지네이션 지원)
   * @param page 페이지 번호 (0부터 시작)
   * @param size 페이지 크기
   * @returns {Promise<SellerProductListResponse>}
   */
  static async getSellerProducts(
    page: number = 0,
    size: number = 10,
  ): Promise<SellerProductListResponse> {
    const response = await api.get<SellerProductListApiResponse>('/products', {
      params: {
        page,
        size,
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.message || '상품 목록 조회에 실패했습니다.');
    }

    if (!response.data.data) {
      throw new Error('응답 데이터가 없습니다.');
    }

    return response.data.data;
  }

  /**
   * 판매자 전체 상품 목록 조회 (통계 계산용)
   * @returns {Promise<SellerProduct[]>}
   */
  static async getAllSellerProducts(): Promise<SellerProduct[]> {
    // 먼저 첫 페이지로 totalElements 확인
    const firstPage = await ProductService.getSellerProducts(0, 1);
    const totalElements = firstPage.totalElements;

    // 필요한 경우에만 전체 데이터 조회
    if (totalElements > 1000) {
      console.warn('대량 데이터 조회 시 성능 저하 가능');
    }

    const response = await api.get<SellerProductListApiResponse>('/products', {
      params: {
        page: 0,
        size: totalElements,
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.message || '전체 상품 목록 조회에 실패했습니다.');
    }

    if (!response.data.data) {
      throw new Error('응답 데이터가 없습니다.');
    }

    return response.data.data.content;
  }
}
