'use client';

import { useEffect, useState } from 'react';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { ProductRegistration } from '@/components/seller/ProductRegistration';
import { ProductService } from '@/services/productService';
import type { Category, Tag } from '@/types/product';

// 인증된 사용자만 접근할 수 있는 상품 등록 컴포넌트
function AuthenticatedProductRegistration() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await ProductService.getProductMetadata();
        setCategories(data.categories);
        setTags(data.tags);
      } catch (err: any) {
        setError(err.message || '상품 메타데이터 조회에 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchMetadata();
  }, []);

  if (isLoading) {
    return <div className="py-20 text-center text-gray-400">상품 등록 정보를 불러오는 중...</div>;
  }
  if (error) {
    return <div className="py-20 text-center text-red-500">{error}</div>;
  }
  return <ProductRegistration categories={categories} tags={tags} />;
}

export default function NewProductPage() {
  return (
    <AuthGuard requireAuth requireSeller>
      <AuthenticatedProductRegistration />
    </AuthGuard>
  );
}
