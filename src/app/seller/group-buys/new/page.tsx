'use client';

import { AuthGuard } from '@/components/auth/AuthGuard';
import { GroupBuyRegistration } from '@/components/seller/GroupBuyRegistration';

export default function NewGroupBuyPage() {
  return (
    <AuthGuard requireAuth requireSeller>
      <GroupBuyRegistration />
    </AuthGuard>
  );
}
