import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiError } from '@/types/api';

// 환경변수에서 API URL 가져오기 (개발/운영 환경 분리)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.ururu.shop/api';

// axios 인스턴스 생성
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (요청 전에 실행)
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터 (응답 후에 실행)
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// API 에러 처리 함수
export const handleApiError = (error: any): ApiError => {
  if (error.response) {
    // 서버에서 응답이 온 경우
    return {
      message: error.response.data?.message || '서버 오류가 발생했습니다.',
      status: error.response.status,
      code: error.response.data?.code,
    };
  } else if (error.request) {
    // 요청은 보냈지만 응답을 받지 못한 경우
    return {
      message: '서버에 연결할 수 없습니다.',
      status: 0,
    };
  } else {
    // 요청 자체에 문제가 있는 경우
    return {
      message: error.message || '알 수 없는 오류가 발생했습니다.',
      status: 0,
    };
  }
};

export default axiosInstance;
