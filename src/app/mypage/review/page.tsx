'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MyPageLayout } from '@/components/mypage/MyPageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/common';
import { Plus, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { getAllCategoryIds, getReviewOptionsByCategoryId } from '@/data/review-options';

export default function ReviewPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categoryIds = getAllCategoryIds();
  const selectedCategory = getReviewOptionsByCategoryId(selectedCategoryId);

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <MyPageLayout>
      <div className="flex flex-1 flex-col gap-6 py-4 md:py-6">
        {/* 페이지 헤더 */}
        <div className="mb-6">
          <PageHeader title="나의 리뷰" />
        </div>

        <Card className="w-full rounded-2xl border-0 bg-bg-100 px-4 py-6 shadow-none md:px-8">
          <CardContent className="p-0">
            <div className="mb-6 flex items-center justify-between">
              <div></div>
              <div className="flex items-center gap-2">
                {/* 카테고리 선택 드롭다운 */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                    className="flex items-center gap-2 rounded-lg border border-bg-300 bg-bg-100 px-3 py-2 text-sm font-medium text-text-100 transition-colors hover:bg-bg-200"
                  >
                    <span>{selectedCategory?.categoryName || '카테고리 선택'}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {isCategoryDropdownOpen && (
                    <div className="absolute right-0 top-full z-10 mt-1 w-48 rounded-lg border border-bg-300 bg-bg-100 shadow-lg">
                      {categoryIds.map((categoryId) => {
                        const category = getReviewOptionsByCategoryId(categoryId);
                        return (
                          <button
                            key={categoryId}
                            type="button"
                            onClick={() => {
                              setSelectedCategoryId(categoryId);
                              setIsCategoryDropdownOpen(false);
                            }}
                            className="block w-full px-4 py-2 text-left text-sm text-text-100 first:rounded-t-lg last:rounded-b-lg hover:bg-bg-200"
                          >
                            {category?.categoryName}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <Link href={`/mypage/review/write?categoryId=${selectedCategoryId}`}>
                  <Button className="flex items-center gap-2 rounded-lg border border-primary-300 bg-bg-100 px-4 py-2 text-sm font-medium text-primary-300 transition-colors hover:bg-primary-100">
                    <Plus className="h-4 w-4" />
                    리뷰 작성
                  </Button>
                </Link>
              </div>
            </div>

            {/* 임시 리뷰 목록 */}
            <div className="space-y-4">
              <div className="rounded-lg border border-bg-300 bg-bg-100 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-text-100">아직 작성된 리뷰가 없어요</h3>
                    <p className="text-sm text-text-200">첫 번째 리뷰를 작성해보세요!</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MyPageLayout>
  );
}
