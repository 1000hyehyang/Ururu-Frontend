'use client';

import React, { Suspense } from 'react';
import { MyPageLayout } from '@/components/mypage/MyPageLayout';
import { ReviewWriteForm } from '@/components/mypage/review';
import { useSearchParams } from 'next/navigation';

function ReviewWriteContent() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('categoryId');

  // 카테고리 ID가 없으면 기본값으로 스킨케어(1) 사용
  const parsedCategoryId = categoryId ? parseInt(categoryId, 10) : 1;

  return <ReviewWriteForm categoryId={parsedCategoryId} />;
}

function ReviewWriteSkeleton() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="mb-4 text-lg font-medium text-text-300">페이지를 불러오는 중...</div>
        <div className="text-sm text-text-400">잠시만 기다려주세요.</div>
      </div>
    </div>
  );
}

export default function ReviewWritePage() {
  return (
    <MyPageLayout>
      <Suspense fallback={<ReviewWriteSkeleton />}>
        <ReviewWriteContent />
      </Suspense>
    </MyPageLayout>
  );
}
