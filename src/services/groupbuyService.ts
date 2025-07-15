import api from '@/lib/axios';
import type { GroupBuyTop3Response, GroupBuyRankingTop100Response } from '@/types/groupbuy';

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
