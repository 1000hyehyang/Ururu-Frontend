'use client';

import { AuthGuard } from '@/components/auth/AuthGuard';
import { ProductDetail } from '@/components/seller/ProductDetail';

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

function AuthenticatedProductDetail({ params }: ProductDetailPageProps) {
  const productId = parseInt(params.id, 10);

  if (isNaN(productId)) {
    return <div className="py-20 text-center text-red-500">잘못된 상품 ID입니다.</div>;
  }

  return <ProductDetail productId={productId} />;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  return (
    <AuthGuard requireAuth requireSeller>
      <AuthenticatedProductDetail params={params} />
    </AuthGuard>
  );
}
