'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/common/SectionHeader';
import { EmptyState } from '@/components/common/EmptyState';
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton';
import { ScrollToTopButton } from '@/components/common';
import { FORM_STYLES } from '@/constants/form-styles';
import { PRODUCT_CONSTANTS } from '@/constants/product-constants';
import { ProductService } from '@/services/productService';
import type { SellerProduct, SellerProductListResponse } from '@/types/product';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Pagination } from '@/components/seller/common/Pagination';

export function ProductManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productData, setProductData] = useState<SellerProductListResponse | null>(null);
  const [allProducts, setAllProducts] = useState<SellerProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);

  // 상품 목록 조회
  const fetchProducts = async (page: number = 0) => {
    setIsLoading(true);
    setError(null);
    try {
      const [data, allData] = await Promise.all([
        ProductService.getSellerProducts(page, pageSize),
        ProductService.getAllSellerProducts(),
      ]);
      setProductData(data);
      setAllProducts(allData);
    } catch (err: any) {
      setError(err.message || '상품 목록을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handleRefresh = () => {
    fetchProducts(currentPage);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <StatusBadge status="in_progress" />;
      case 'INACTIVE':
        return (
          <span className="inline-flex items-center rounded-lg bg-bg-200 px-3 py-1.5 text-xs font-medium text-text-200">
            공구 대기중
          </span>
        );
      case 'DELETED':
        return null;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  const getCategoryPath = (categories: any[]) => {
    if (!categories || categories.length === 0) return null;
    return categories.map((cat) => cat.name).join(' > ');
  };

  const getTagNames = (tagCategories: any[]) => {
    if (!tagCategories || tagCategories.length === 0) return [];
    return tagCategories.map((tag) => tag.tagCategoryName);
  };

  const products = productData?.content || [];
  const totalElements = productData?.totalElements || 0;
  const totalPages = productData?.totalPages || 0;
  const isFirst = productData?.first || true;
  const isLast = productData?.last || true;

  // 전체 데이터에서 카운트 계산
  const activeCount = allProducts.filter((p) => p.status === 'ACTIVE').length;
  const inactiveCount = allProducts.filter((p) => p.status === 'INACTIVE').length;
  const totalCount = allProducts.length;

  if (error) {
    return <div className="py-20 text-center text-red-500">서버 오류가 발생했습니다.</div>;
  }
  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 md:px-0">
        <h1 className="mb-10 text-center text-3xl font-semibold text-text-100">상품 관리</h1>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <LoadingSkeleton key={index} className="h-24 w-full" />
          ))}
        </div>
        <ScrollToTopButton />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-0">
      {/* 타이틀 */}
      <h1 className="mb-10 text-center text-3xl font-semibold text-text-100">상품 관리</h1>

      {/* 상단 카운트 3개 */}
      <div className="mx-auto mb-10 flex w-full max-w-md justify-center">
        <div className="flex flex-1 flex-col items-center">
          <span className="text-2xl font-bold text-text-100 md:text-4xl">{totalCount}</span>
          <span className="mt-1 text-center text-sm font-medium text-text-200 md:text-lg">
            전체
          </span>
        </div>
        <div className="flex flex-1 flex-col items-center">
          <span className="text-2xl font-bold text-text-100 md:text-4xl">{activeCount}</span>
          <span className="mt-1 text-center text-sm font-medium text-text-200 md:text-lg">
            공구 중
          </span>
        </div>
        <div className="flex flex-1 flex-col items-center">
          <span className="text-2xl font-bold text-text-100 md:text-4xl">{inactiveCount}</span>
          <span className="mt-1 text-center text-sm font-medium text-text-200 md:text-lg">
            공구 대기
          </span>
        </div>
      </div>

      {/* 상품 목록 섹션 */}
      <section>
        <SectionHeader title="등록된 상품" />
        <div className="mt-4">
          {products.length === 0 ? (
            <div className="space-y-6">
              <EmptyState
                icon="📦"
                title="등록된 상품이 없습니다"
                description="첫 번째 상품을 등록해보세요"
              />
              <div className="text-center">
                <Button className={FORM_STYLES.button.submit}>
                  <Plus className="mr-2 h-4 w-4" />
                  상품 등록하기
                </Button>
              </div>
            </div>
          ) : (
            <div
              className="space-y-4"
              style={{
                scrollBehavior: 'smooth',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {products.map((product) => (
                <Card key={product.id} className={FORM_STYLES.card.seller}>
                  <CardContent className="relative p-6">
                    {/* 상단: 카테고리(좌, 진한 글씨) + 중앙 구분선(bg-text-300, h-5) + 태그(우) */}
                    <div className="mb-1 flex items-center">
                      {getCategoryPath(product.categories) && (
                        <div className="text-sm text-text-100">
                          {getCategoryPath(product.categories)}
                        </div>
                      )}
                      {getTagNames(product.tagCategories).length > 0 && (
                        <>
                          <div className="mx-2 h-5 w-px self-center bg-text-300" />
                          <div className="flex flex-wrap gap-1">
                            {getTagNames(product.tagCategories).map((tag, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="rounded-lg border-bg-300 bg-bg-100 px-2 py-0.5 text-xs text-text-200"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    {/* 상태 뱃지: 우측 상단 고정 */}
                    <div className="absolute right-6 top-6 z-10">
                      {getStatusBadge(product.status)}
                    </div>
                    {/* 제목, 설명 */}
                    <div className="min-w-0 flex-1">
                      <h2 className="text-lg font-semibold text-text-100">{product.name}</h2>
                      <p className="mb-2 mt-1 line-clamp-2 text-sm text-text-200">
                        {product.description}
                      </p>
                    </div>
                    {/* 하단: 버튼 3개(좌) */}
                    <div className="mt-4 flex gap-2">
                      <Button
                        onClick={() => console.log('View product:', product.id)}
                        className="h-10 rounded-lg border border-primary-300 bg-bg-100 px-6 text-base text-primary-300 shadow-none transition-colors hover:bg-primary-100 active:bg-primary-100 active:text-primary-300"
                      >
                        상세보기
                      </Button>
                      <Button
                        onClick={() => console.log('Edit product:', product.id)}
                        className="h-10 rounded-lg border border-primary-300 bg-bg-100 px-6 text-base text-primary-300 shadow-none transition-colors hover:bg-primary-100 active:bg-primary-100 active:text-primary-300"
                      >
                        수정하기
                      </Button>
                      <Button
                        onClick={() => console.log('Delete product:', product.id)}
                        className="h-10 rounded-lg border border-primary-200 bg-bg-100 px-6 text-base text-primary-200 shadow-none transition-colors hover:bg-primary-100 active:bg-primary-100 active:text-primary-200"
                      >
                        삭제하기
                      </Button>
                    </div>
                    {/* 등록일/수정일: 오른쪽 하단, 글자 크기 text-sm */}
                    <div className="absolute bottom-6 right-6 whitespace-nowrap text-sm text-text-300">
                      등록일: {formatDate(product.createdAt)} 수정일:{' '}
                      {formatDate(product.updatedAt)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 페이지네이션: 상품 관리 페이지 하단 */}
      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* ScrollToTopButton - 일관된 스크롤 동작 */}
      <ScrollToTopButton />
    </div>
  );
}
