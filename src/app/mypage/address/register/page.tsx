'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { MyPageLayout } from '@/components/mypage/MyPageLayout';
import { AddressFormFields } from '@/components/mypage/address';
import { Card, CardContent } from '@/components/ui/card';
import { FORM_STYLES } from '@/constants/form-styles';
import { useAddress } from '@/hooks/useAddress';

export default function AddressRegisterPage() {
  const { addressData, isEditMode, handleInputChange, handleSubmit } = useAddress();

  return (
    <MyPageLayout>
      <Card className="w-full rounded-2xl border-0 bg-bg-100 px-4 py-6 shadow-none md:px-8">
        <CardContent className="p-0">
          <h1 className="mb-6 text-center text-2xl font-semibold md:text-2xl">
            {isEditMode ? '배송지 수정' : '배송지 등록'}
          </h1>

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
