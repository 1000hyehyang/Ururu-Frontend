'use client';

import { EmptyPage } from '@/components/seller/common';
import { AuthGuard } from '@/components/auth/AuthGuard';

function SellerPageContent() {
  return <EmptyPage title="준비중이에요" />;
}

export default function SellerPage() {
  return (
    <AuthGuard requireAuth={true} requireSeller={true}>
      <SellerPageContent />
    </AuthGuard>
  );
}
