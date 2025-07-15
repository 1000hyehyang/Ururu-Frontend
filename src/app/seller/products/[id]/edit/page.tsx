'use client';

import { useParams } from 'next/navigation';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { ProductEdit } from '@/components/seller/ProductEdit';

// 인증된 사용자만 접근할 수 있는 상품 수정 컴포넌트
function AuthenticatedProductEdit() {
  const params = useParams();
  const productId = parseInt(params.id as string, 10);

  return <ProductEdit productId={productId} />;
}

export default function EditProductPage() {
  return (
    <AuthGuard requireAuth requireSeller>
      <AuthenticatedProductEdit />
    </AuthGuard>
  );
}
