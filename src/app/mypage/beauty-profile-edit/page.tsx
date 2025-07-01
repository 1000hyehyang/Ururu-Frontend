'use client';

import React from 'react';
import { FormField } from '@/components/form/FormField';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SelectableButton, SelectableButtonGroup } from '@/components/ui/selectable-button';
import { Sidebar } from '@/components/mypage/Sidebar';
import { NoFooterLayout } from '@/components/layout/layouts';
import { Card, CardContent } from '@/components/ui/card';
import { FORM_STYLES } from '@/constants/form-styles';
import {
  SKIN_TYPE_OPTIONS,
  SKIN_TONE_OPTIONS,
  SKIN_CONCERN_OPTIONS,
  SKIN_REACTION_OPTIONS,
  INTEREST_CATEGORY_OPTIONS,
  BEAUTY_PROFILE_CONSTANTS,
} from '@/constants/beauty-profile';
import { useBeautyProfile } from '@/hooks/useBeautyProfile';

export default function BeautyProfileEditPage() {
  const {
    beautyProfileData,
    handleInputChange,
    handleSkinConcernToggle,
    handleInterestCategoryToggle,
    handleSubmit,
  } = useBeautyProfile();

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
              <h1 className="mb-6 text-center text-2xl font-semibold md:text-2xl">
                뷰티프로필 수정
              </h1>

              <form onSubmit={handleSubmit} className="w-full space-y-6">
                {/* 3-1. 피부 타입 */}
                <FormField label="피부 타입 (중복 선택 가능)" required>
                  <SelectableButtonGroup
                    options={SKIN_TYPE_OPTIONS}
                    selectedValue={beautyProfileData.skinType}
                    onSelect={(value) => handleInputChange('skinType', value)}
                  />
                </FormField>

                {/* 3-2. 피부 톤 */}
                <FormField label="피부 톤 (중복 선택 가능)" required>
                  <SelectableButtonGroup
                    options={SKIN_TONE_OPTIONS}
                    selectedValue={beautyProfileData.skinTone}
                    onSelect={(value) => handleInputChange('skinTone', value)}
                  />
                </FormField>

                {/* 3-3. 피부 고민 */}
                <FormField label="피부 고민 (최대 3개)" required>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                      {SKIN_CONCERN_OPTIONS.map((option) => {
                        const isSelected = beautyProfileData.skinConcerns.includes(option.value);
                        const isDisabled =
                          !isSelected && beautyProfileData.skinConcerns.length >= 3;

                        return (
                          <SelectableButton
                            key={option.value}
                            value={option.value}
                            label={option.label}
                            isSelected={isSelected}
                            isDisabled={isDisabled}
                            onClick={() => handleSkinConcernToggle(option.value)}
                          />
                        );
                      })}
                    </div>
                  </div>
                </FormField>

                {/* 3-4. 특정 화장품 사용 후 이상 경험 여부 */}
                <FormField label="특정 화장품 사용 후 이상 경험 여부" required>
                  <div className="space-y-3">
                    <p className="text-sm text-text-200">
                      피부가 예민하거나, 특정 화장품 사용 후 발진, 가려움 등을 경험한 적이 있나요?
                    </p>
                    <div className="flex gap-2">
                      {SKIN_REACTION_OPTIONS.map((option) => (
                        <SelectableButton
                          key={option.value}
                          value={option.value}
                          label={option.label}
                          isSelected={beautyProfileData.skinReaction === option.value}
                          onClick={() => handleInputChange('skinReaction', option.value)}
                          className="min-w-0 flex-1"
                        />
                      ))}
                    </div>
                  </div>
                </FormField>

                {/* 3-5. 관심 카테고리 */}
                <FormField label="관심 카테고리 (중복 선택 가능)" required>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                      {INTEREST_CATEGORY_OPTIONS.map((option) => {
                        const isSelected = beautyProfileData.interestCategories.includes(
                          option.value,
                        );

                        return (
                          <SelectableButton
                            key={option.value}
                            value={option.value}
                            label={option.label}
                            isSelected={isSelected}
                            onClick={() => handleInterestCategoryToggle(option.value)}
                          />
                        );
                      })}
                    </div>
                  </div>
                </FormField>

                {/* 3-6. 선호 가격대 */}
                <FormField label="선호 가격대" required>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Input
                        type="number"
                        placeholder="최소 가격"
                        value={beautyProfileData.minPrice}
                        onChange={(e) => handleInputChange('minPrice', e.target.value)}
                        className={FORM_STYLES.input.base}
                      />
                    </div>
                    <div className="flex items-center text-text-300">~</div>
                    <div className="flex-1">
                      <Input
                        type="number"
                        placeholder="최대 가격"
                        value={beautyProfileData.maxPrice}
                        onChange={(e) => handleInputChange('maxPrice', e.target.value)}
                        className={FORM_STYLES.input.base}
                      />
                    </div>
                    <div className="flex items-center text-text-300">원</div>
                  </div>
                </FormField>

                {/* 3-7. 상품 추천 요청 */}
                <FormField
                  label="이런 상품을 추천해주세요"
                  characterCount={{
                    current: beautyProfileData.productRequest.length,
                    max: BEAUTY_PROFILE_CONSTANTS.PRODUCT_REQUEST_MAX_LENGTH,
                  }}
                >
                  <textarea
                    value={beautyProfileData.productRequest}
                    onChange={(e) => handleInputChange('productRequest', e.target.value)}
                    maxLength={BEAUTY_PROFILE_CONSTANTS.PRODUCT_REQUEST_MAX_LENGTH}
                    placeholder="EX) 건조한 겨울철에 특히 각질이 많이 일어나고, 향이 강한 제품을 피하고 싶어요."
                    className={`${FORM_STYLES.textarea.base} ${FORM_STYLES.textarea.focus} min-h-[120px] w-full`}
                    rows={5}
                  />
                </FormField>

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
        </main>
      </div>
    </NoFooterLayout>
  );
}
