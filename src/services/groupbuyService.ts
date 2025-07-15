import api from '@/lib/axios';
import type { GroupBuyTop3Response } from '@/types/groupbuy';

export async function fetchGroupBuyTop3(): Promise<GroupBuyTop3Response> {
  const res = await api.get<GroupBuyTop3Response>('/groupbuys/top3');
  return res.data;
}

export async function fetchGroupBuyCategoryTop6(categoryId: number): Promise<GroupBuyTop3Response> {
  const res = await api.get<GroupBuyTop3Response>(`/groupbuys/${categoryId}/top6`);
  return res.data;
}
