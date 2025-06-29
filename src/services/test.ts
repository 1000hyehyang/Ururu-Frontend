import axiosInstance, { handleApiError } from '@/lib/axios';
import { ApiResponse } from '@/types/api';

// 테스트용 API 호출 함수들
export const testApi = {
  // GET 요청 테스트
  getTest: async () => {
    try {
      const response = await axiosInstance.get<ApiResponse>('/test');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // POST 요청 테스트
  postTest: async (data: any) => {
    try {
      const response = await axiosInstance.post<ApiResponse>('/test', data);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // 헬스체크
  healthCheck: async () => {
    try {
      const response = await axiosInstance.get<ApiResponse>('/health');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
