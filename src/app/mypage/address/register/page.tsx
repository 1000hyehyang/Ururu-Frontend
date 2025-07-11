'use client';

import React, { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { MyPageLayout } from '@/components/mypage/MyPageLayout';
import { AddressFormFields } from '@/components/mypage/address';
import { Card, CardContent } from '@/components/ui/card';
import { PageHeader, CardSkeleton } from '@/components/common';
import { FORM_STYLES } from '@/constants/form-styles';
import { useAddress } from '@/hooks/useAddress';
import { AuthGuard } from '@/components/auth/AuthGuard';

function AddressRegisterSkeleton() {
  return (
    <MyPageLayout>
      <CardSkeleton content={6} />
    </MyPageLayout>
  );
}

function AddressRegisterContent() {
  const { addressData, isEditMode, handleInputChange, handleSubmit } = useAddress();

  return (
    <MyPageLayout>
      <Card className={FORM_STYLES.card.base}>
        <CardContent className={FORM_STYLES.card.content}>
          <PageHeader title={isEditMode ? '배송지 수정' : '배송지 등록'} />

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <AddressFormFields addressData={addressData} onInputChange={handleInputChange} />

            {/* 저장 버튼 */}
            <Button
              type="submit"
              className={FORM_STYLES.button.submit + ' mt-6 text-sm font-medium'}
            >
              저장하기
            </Button>
          </form>
        </CardContent>
      </Card>
    </MyPageLayout>
  );
}

function AddressRegisterPageContent() {
  return (
    <Suspense fallback={<AddressRegisterSkeleton />}>
      <AddressRegisterContent />
    </Suspense>
  );
}

export default function AddressRegisterPage() {
  return (
    <AuthGuard requireAuth={true}>
      <AddressRegisterPageContent />
    </AuthGuard>
  );
}
