'use client';

import { AuthGuard } from '@/components/auth/AuthGuard';
import { ProductManagement } from '@/components/seller/ProductManagement';

// 인증된 판매자만 접근할 수 있는 상품 관리 컴포넌트
function AuthenticatedProductManagement() {
  return <ProductManagement />;
}

export default function ProductsPage() {
  return (
    <AuthGuard requireAuth requireSeller>
      <AuthenticatedProductManagement />
    </AuthGuard>
  );
}
