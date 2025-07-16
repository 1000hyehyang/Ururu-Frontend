import api from '@/lib/axios';
import axios from 'axios';
import type {
  GroupBuyTop3Response,
  GroupBuyRankingTop100Response,
  GroupBuyCreateResponse,
  GroupBuyCreateRequest,
  GroupBuyCreateApiResponse,
  GroupBuyDetailResponse,
  GroupBuyDetail,
} from '@/types/groupbuy';
import { Suspense } from 'react';

// 인증이 필요하지 않은 API 호출을 위한 별도 인스턴스
const publicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  withCredentials: false, // 쿠키 전송하지 않음
  timeout: 10000,
});

export async function fetchGroupBuyTop3(): Promise<GroupBuyTop3Response> {
  const res = await api.get<GroupBuyTop3Response>('/groupbuys/top3');
  return res.data;
}

export async function fetchGroupBuyCategoryTop6(categoryId: number): Promise<GroupBuyTop3Response> {
  const res = await api.get<GroupBuyTop3Response>(`/groupbuys/${categoryId}/top6`);
  return res.data;
}

export async function fetchGroupBuyRankingTop100(categoryId: number) {
  const res = await api.get<GroupBuyRankingTop100Response>(
    `/groupbuys?categoryId=${categoryId}&limit=100&sort=order_count`,
  );
  // API 응답이 { data: { items: [...] } } 구조이므로, items만 반환
  return { ...res.data, data: res.data.data.items };
}

export async function fetchGroupBuyAllRankingTop100() {
  const res = await api.get<GroupBuyRankingTop100Response>(`/groupbuys?limit=100&sort=deadline`);
  return { ...res.data, data: res.data.data.items };
}

export async function fetchGroupBuyByCategoryId(categoryId: number) {
  const res = await api.get<GroupBuyRankingTop100Response>(
    `/groupbuys?categoryId=${categoryId}&limit=100`,
  );
  if (res.data.success === false) {
    throw new Error(res.data.message || '공동구매 데이터를 불러오지 못했습니다.');
  }
  const items = res.data.data?.items || [];
  return { ...res.data, data: items };
}

export async function fetchGroupBuyCreateData(): Promise<GroupBuyCreateResponse> {
  const res = await api.get<GroupBuyCreateResponse>('/groupbuys/create');
  return res.data;
}

// 공동구매 등록 API (multipart/form-data)
export async function createGroupBuy({
  request,
  thumbnail,
  detailImages,
}: {
  request: GroupBuyCreateRequest;
  thumbnail: File;
  detailImages: File[];
}): Promise<GroupBuyCreateApiResponse> {
  const formData = new FormData();
  formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }));
  formData.append('thumbnail', thumbnail);
  detailImages.forEach((file) => formData.append('detailImages', file));

  const res = await api.post('/groupbuys', formData);
  return res.data;
}

// 공동구매 상세 조회 API (인증 불필요)
export async function getGroupBuyDetail(groupBuyId: number): Promise<GroupBuyDetailResponse> {
  console.log('Requesting groupbuy detail for ID:', groupBuyId);
  console.log(
    'Full URL:',
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}/groupbuys/${groupBuyId}`,
  );

  const response = await publicApi.get<GroupBuyDetailResponse>(`/groupbuys/${groupBuyId}`);
  console.log('Raw API Response:', response);
  return response.data;
}
