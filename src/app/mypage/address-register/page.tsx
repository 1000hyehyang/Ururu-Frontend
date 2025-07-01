'use client';

import React from 'react';
import { FormField } from '@/components/form/FormField';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/mypage/Sidebar';
import { NoFooterLayout } from '@/components/layout/layouts';
import { Card, CardContent } from '@/components/ui/card';
import { FORM_STYLES } from '@/constants/form-styles';
import { formatPhoneNumber } from '@/lib/format-utils';
import { VALIDATION_CONSTANTS } from '@/constants/validation';
import { useAddressRegister } from '@/hooks/useAddressRegister';

export default function AddressRegisterPage() {
  const { addressData, handleInputChange, handleCheckboxChange, handleSubmit, isFormValid } =
    useAddressRegister();

  return (
    <NoFooterLayout className="bg-bg-100">
      <div className="mx-auto flex w-full max-w-[1248px] flex-col items-start justify-center gap-0 px-6 py-12 md:px-9 lg:flex-row lg:gap-12 lg:px-12">
        {/* 데스크탑: 사이드바 */}
        <div className="hidden w-[256px] flex-shrink-0 pt-8 lg:block">
          <Sidebar />
        </div>
        {/* 메인 컨텐츠 */}
        <main className="mx-auto mt-0 flex w-full max-w-3xl flex-col gap-8 px-0 lg:mt-0">
          <Card className="w-full rounded-2xl border-0 bg-bg-100 px-4 py-6 shadow-none md:px-8">
            <CardContent className="p-0">
              <h1 className="mb-6 text-center text-2xl font-semibold md:text-2xl">배송지 등록</h1>

              <form onSubmit={handleSubmit} className="w-full space-y-6">
                {/* 3-1. 배송지명 */}
                <FormField
                  label="배송지명"
                  required
                  characterCount={{
                    current: addressData.addressName.length,
                    max: 20,
                  }}
                >
                  <Input
                    type="text"
                    placeholder="EX) 우리집"
                    value={addressData.addressName}
                    onChange={(e) => handleInputChange('addressName', e.target.value)}
                    maxLength={20}
                    className={FORM_STYLES.input.base + ' ' + FORM_STYLES.input.focus}
                    required
                  />
                </FormField>

                {/* 3-2. 기본 배송지 설정 */}
                <div className="space-y-3">
                  <label className={FORM_STYLES.checkbox.container}>
                    <input
                      type="checkbox"
                      checked={addressData.isDefault}
                      onChange={(e) => handleCheckboxChange('isDefault', e.target.checked)}
                      className={FORM_STYLES.checkbox.base}
                    />
                    <span className={FORM_STYLES.checkbox.label}>기본 배송지로 설정</span>
                  </label>
                </div>

                {/* 3-3. 연락처 */}
                <FormField
                  label="연락처"
                  required
                  helperText="하이픈(-)을 제외하고 숫자만 입력해주세요"
                  characterCount={{
                    current: addressData.phone.length,
                    max: VALIDATION_CONSTANTS.PHONE.MAX_LENGTH,
                  }}
                >
                  <Input
                    type="tel"
                    placeholder="010-0000-0000"
                    value={formatPhoneNumber(addressData.phone)}
                    onChange={(e) =>
                      handleInputChange('phone', e.target.value.replace(/[^0-9]/g, ''))
                    }
                    maxLength={VALIDATION_CONSTANTS.PHONE.FORMATTED_MAX_LENGTH}
                    className={FORM_STYLES.input.base + ' ' + FORM_STYLES.input.focus}
                    required
                  />
                </FormField>

                {/* 3-4. 주소 */}
                <FormField label="주소" required>
                  <div className="mb-2 flex gap-2">
                    <div className={FORM_STYLES.zipcode.display}>
                      {addressData.zipcode || '우편번호'}
                    </div>
                    <button
                      type="button"
                      className={FORM_STYLES.button.pinkOutline + ' h-12 min-w-[120px] rounded-lg'}
                    >
                      우편 번호
                    </button>
                  </div>
                  <Input
                    type="text"
                    placeholder="도로명"
                    value={addressData.addressRoad}
                    onChange={(e) => handleInputChange('addressRoad', e.target.value)}
                    className={FORM_STYLES.input.base + ' mb-2'}
                    required
                  />
                  <Input
                    type="text"
                    placeholder="지번"
                    value={addressData.addressJibun}
                    onChange={(e) => handleInputChange('addressJibun', e.target.value)}
                    className={FORM_STYLES.input.base}
                    required
                  />
                </FormField>

                {/* 3-5. 상세주소 */}
                <FormField label="상세주소" required>
                  <Input
                    type="text"
                    placeholder="상세주소를 입력해주세요"
                    value={addressData.addressDetail}
                    onChange={(e) => handleInputChange('addressDetail', e.target.value)}
                    className={FORM_STYLES.input.base + ' ' + FORM_STYLES.input.focus}
                    required
                  />
                </FormField>

                {/* 저장 버튼 */}
                <Button
                  type="submit"
                  disabled={!isFormValid()}
                  className={FORM_STYLES.button.submit + ' mt-6 text-sm font-medium'}
                >
                  저장하기
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </NoFooterLayout>
  );
}
