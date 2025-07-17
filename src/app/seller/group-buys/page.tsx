'use client';

import { AuthGuard } from '@/components/auth/AuthGuard';
import { GroupBuyManagement } from '@/components/seller/GroupBuyManagement';

// 인증된 판매자만 접근할 수 있는 그룹바이 관리 컴포넌트
function AuthenticatedGroupBuyManagement() {
  return <GroupBuyManagement />;
}

export default function GroupBuysPage() {
  return (
    <AuthGuard requireAuth requireSeller>
      <AuthenticatedGroupBuyManagement />
    </AuthGuard>
  );
}
