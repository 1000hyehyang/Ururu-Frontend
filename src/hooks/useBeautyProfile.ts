import { useState, useCallback } from 'react';
import { BeautyProfileFormData } from '@/types/form';

const INITIAL_BEAUTY_PROFILE_DATA: BeautyProfileFormData = {
  skinType: 'normal',
  skinTone: 'neutral',
  skinConcerns: ['none'],
  skinReaction: 'no',
  interestCategories: ['none'],
  minPrice: '',
  maxPrice: '',
  productRequest: '',
};

export const useBeautyProfile = () => {
  const [beautyProfileData, setBeautyProfileData] = useState<BeautyProfileFormData>(
    INITIAL_BEAUTY_PROFILE_DATA,
  );

  const handleInputChange = useCallback(
    (field: keyof BeautyProfileFormData, value: string | string[]) => {
      setBeautyProfileData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [],
  );

  const handleSkinConcernToggle = useCallback((concern: string) => {
    setBeautyProfileData((prev) => {
      if (concern === 'none') {
        return {
          ...prev,
          skinConcerns: ['none'],
        };
      } else {
        const newConcerns = prev.skinConcerns.includes(concern)
          ? prev.skinConcerns.filter((c) => c !== concern)
          : prev.skinConcerns.length < 3
            ? [...prev.skinConcerns.filter((c) => c !== 'none'), concern]
            : prev.skinConcerns.filter((c) => c !== 'none');

        return {
          ...prev,
          skinConcerns: newConcerns.length > 0 ? newConcerns : ['none'],
        };
      }
    });
  }, []);

  const handleInterestCategoryToggle = useCallback((category: string) => {
    setBeautyProfileData((prev) => {
      if (category === 'none') {
        return {
          ...prev,
          interestCategories: ['none'],
        };
      } else {
        const newCategories = prev.interestCategories.includes(category)
          ? prev.interestCategories.filter((c) => c !== category)
          : [...prev.interestCategories.filter((c) => c !== 'none'), category];

        return {
          ...prev,
          interestCategories: newCategories.length > 0 ? newCategories : ['none'],
        };
      }
    });
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      // TODO: 실제 뷰티프로필 저장 API 연동 필요
      console.log('뷰티프로필 저장:', beautyProfileData);
    },
    [beautyProfileData],
  );

  const resetForm = useCallback(() => {
    setBeautyProfileData(INITIAL_BEAUTY_PROFILE_DATA);
  }, []);

  return {
    beautyProfileData,
    handleInputChange,
    handleSkinConcernToggle,
    handleInterestCategoryToggle,
    handleSubmit,
    resetForm,
  };
};
