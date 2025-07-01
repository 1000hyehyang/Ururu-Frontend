import React from 'react';
import { FormField } from '@/components/form/FormField';
import { Input } from '@/components/ui/input';
import { SelectableButton, SelectableButtonGroup } from '@/components/ui/selectable-button';
import { FORM_STYLES } from '@/constants/form-styles';
import { BeautyProfileFormData } from '@/types/form';

interface BeautyProfileFormFieldsProps {
  beautyProfileData: BeautyProfileFormData;
  onInputChange: (field: keyof BeautyProfileFormData, value: string | string[]) => void;
  onSkinConcernToggle: (concern: string) => void;
  onInterestCategoryToggle: (category: string) => void;
  skinTypeOptions: readonly { readonly label: string; readonly value: string }[];
  skinToneOptions: readonly { readonly label: string; readonly value: string }[];
  skinConcernOptions: readonly { readonly label: string; readonly value: string }[];
  skinReactionOptions: readonly { readonly label: string; readonly value: string }[];
  interestCategoryOptions: readonly { readonly label: string; readonly value: string }[];
  productRequestMaxLength: number;
}

export function BeautyProfileFormFields({
  beautyProfileData,
  onInputChange,
  onSkinConcernToggle,
  onInterestCategoryToggle,
  skinTypeOptions,
  skinToneOptions,
  skinConcernOptions,
  skinReactionOptions,
  interestCategoryOptions,
  productRequestMaxLength,
}: BeautyProfileFormFieldsProps) {
  return (
    <>
      {/* 3-1. 피부 타입 */}
      <FormField label="피부 타입 (중복 선택 가능)" required>
        <SelectableButtonGroup
          options={skinTypeOptions}
          selectedValue={beautyProfileData.skinType}
          onSelect={(value) => onInputChange('skinType', value)}
        />
      </FormField>

      {/* 3-2. 피부 톤 */}
      <FormField label="피부 톤 (중복 선택 가능)" required>
        <SelectableButtonGroup
          options={skinToneOptions}
          selectedValue={beautyProfileData.skinTone}
          onSelect={(value) => onInputChange('skinTone', value)}
        />
      </FormField>

      {/* 3-3. 피부 고민 */}
      <FormField label="피부 고민 (최대 3개)" required>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
            {skinConcernOptions.map((option) => {
              const isSelected = beautyProfileData.skinConcerns.includes(option.value);
              const isDisabled = !isSelected && beautyProfileData.skinConcerns.length >= 3;

              return (
                <SelectableButton
                  key={option.value}
                  value={option.value}
                  label={option.label}
                  isSelected={isSelected}
                  isDisabled={isDisabled}
                  onClick={() => onSkinConcernToggle(option.value)}
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
            {skinReactionOptions.map((option) => (
              <SelectableButton
                key={option.value}
                value={option.value}
                label={option.label}
                isSelected={beautyProfileData.skinReaction === option.value}
                onClick={() => onInputChange('skinReaction', option.value)}
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
            {interestCategoryOptions.map((option) => {
              const isSelected = beautyProfileData.interestCategories.includes(option.value);

              return (
                <SelectableButton
                  key={option.value}
                  value={option.value}
                  label={option.label}
                  isSelected={isSelected}
                  onClick={() => onInterestCategoryToggle(option.value)}
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
              onChange={(e) => onInputChange('minPrice', e.target.value)}
              className={FORM_STYLES.input.base}
            />
          </div>
          <div className="flex items-center text-text-300">~</div>
          <div className="flex-1">
            <Input
              type="number"
              placeholder="최대 가격"
              value={beautyProfileData.maxPrice}
              onChange={(e) => onInputChange('maxPrice', e.target.value)}
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
          max: productRequestMaxLength,
        }}
      >
        <textarea
          value={beautyProfileData.productRequest}
          onChange={(e) => onInputChange('productRequest', e.target.value)}
          maxLength={productRequestMaxLength}
          placeholder="EX) 건조한 겨울철에 특히 각질이 많이 일어나고, 향이 강한 제품을 피하고 싶어요."
          className={`${FORM_STYLES.textarea.base} ${FORM_STYLES.textarea.focus} min-h-[120px] w-full`}
          rows={5}
        />
      </FormField>
    </>
  );
}
