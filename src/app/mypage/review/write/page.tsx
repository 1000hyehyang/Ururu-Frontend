'use client';

import React from 'react';
import { MyPageLayout } from '@/components/mypage/MyPageLayout';
import { ReviewWriteForm } from '@/components/mypage/review';
import { useSearchParams } from 'next/navigation';

export default function ReviewWritePage() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('categoryId');

  // 카테고리 ID가 없으면 기본값으로 스킨케어(1) 사용
  const parsedCategoryId = categoryId ? parseInt(categoryId, 10) : 1;

  return (
    <MyPageLayout>
      <ReviewWriteForm categoryId={parsedCategoryId} />
    </MyPageLayout>
  );
}
