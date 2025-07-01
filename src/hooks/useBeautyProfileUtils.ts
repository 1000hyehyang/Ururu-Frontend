import { useMemo } from 'react';
import {
  SKIN_TYPE_OPTIONS,
  SKIN_TONE_OPTIONS,
  SKIN_CONCERN_OPTIONS,
  SKIN_REACTION_OPTIONS,
  INTEREST_CATEGORY_OPTIONS,
} from '@/constants/beauty-profile';

export const useBeautyProfileUtils = () => {
  // 옵션에서 라벨 찾기 함수
  const findLabel = (
    options: readonly { readonly label: string; readonly value: string }[],
    value: string,
  ) => {
    return options.find((option) => option.value === value)?.label || value;
  };

  // 선택된 항목들의 라벨 찾기 함수
  const findSelectedLabels = (
    options: readonly { readonly label: string; readonly value: string }[],
    values: string[],
  ) => {
    return values.map((value) => findLabel(options, value));
  };

  // 요약 정보 생성 함수
  const createSummaryInfo = (profileData: any, hasBeautyProfile: boolean) => {
    if (!hasBeautyProfile) return null;

    const skinTypeLabel = findLabel(SKIN_TYPE_OPTIONS, profileData.skinType);
    const skinToneLabel = findLabel(SKIN_TONE_OPTIONS, profileData.skinTone);
    const skinConcernLabels = findSelectedLabels(SKIN_CONCERN_OPTIONS, profileData.skinConcerns);
    const interestLabels = findSelectedLabels(
      INTEREST_CATEGORY_OPTIONS,
      profileData.interestCategories,
    );
    const skinReactionLabel = findLabel(SKIN_REACTION_OPTIONS, profileData.skinReaction);

    return {
      skinType: skinTypeLabel,
      skinTone: skinToneLabel,
      skinConcerns: skinConcernLabels,
      interests: interestLabels,
      skinReaction: skinReactionLabel,
      priceRange: `${Number(profileData.minPrice).toLocaleString()}원 ~ ${Number(profileData.maxPrice).toLocaleString()}원`,
    };
  };

  return {
    findLabel,
    findSelectedLabels,
    createSummaryInfo,
  };
};
