'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { MyPageLayout } from '@/components/mypage/MyPageLayout';
import { BeautyProfileFormFields } from '@/components/mypage/beauty-profile-edit';
import { Card, CardContent } from '@/components/ui/card';
import { FORM_STYLES } from '@/constants/form-styles';
import { useBeautyProfileEdit } from '@/hooks/useBeautyProfileEdit';
import Image from 'next/image';

export default function BeautyProfileEditPage() {
  const {
    beautyProfileData,
    handleInputChange,
    handleSkinConcernToggle,
    handleInterestCategoryToggle,
    handleSubmit,
    SKIN_TYPE_OPTIONS,
    SKIN_TONE_OPTIONS,
    SKIN_CONCERN_OPTIONS,
    SKIN_REACTION_OPTIONS,
    INTEREST_CATEGORY_OPTIONS,
    BEAUTY_PROFILE_CONSTANTS,
  } = useBeautyProfileEdit();

  return (
    <MyPageLayout>
      <Card className="w-full rounded-2xl border-0 bg-bg-100 px-4 py-6 shadow-none md:px-8">
        <CardContent className="p-0">
          <h1 className="mb-6 text-center text-2xl font-semibold md:text-2xl">뷰티프로필 수정</h1>

          {/* 알림 박스 */}
          <div className="mb-8 flex items-start gap-3 rounded-lg bg-bg-100 p-6 shadow-sm">
            <Image
              src="/ururu-gradient.svg"
              alt="우르르"
              width={24}
              height={24}
              className="h-6 w-6 flex-shrink-0"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-text-300">
                뷰티 프로필을 설정하면 회원님만의 맞춤 서비스가 제공돼요!
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <BeautyProfileFormFields
              beautyProfileData={beautyProfileData}
              onInputChange={handleInputChange}
              onSkinConcernToggle={handleSkinConcernToggle}
              onInterestCategoryToggle={handleInterestCategoryToggle}
              skinTypeOptions={SKIN_TYPE_OPTIONS}
              skinToneOptions={SKIN_TONE_OPTIONS}
              skinConcernOptions={SKIN_CONCERN_OPTIONS}
              skinReactionOptions={SKIN_REACTION_OPTIONS}
              interestCategoryOptions={INTEREST_CATEGORY_OPTIONS}
              productRequestMaxLength={BEAUTY_PROFILE_CONSTANTS.PRODUCT_REQUEST_MAX_LENGTH}
            />

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
