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
      setBeautyProfileData((prev) => {
        const newData = {
          ...prev,
          [field]: value,
        };

        // 가격 입력 시 최소값과 최대값 자동 정렬
        if ((field === 'minPrice' || field === 'maxPrice') && typeof value === 'string') {
          const minPrice = field === 'minPrice' ? value : prev.minPrice;
          const maxPrice = field === 'maxPrice' ? value : prev.maxPrice;

          if (minPrice && maxPrice) {
            const minNum = Number(minPrice);
            const maxNum = Number(maxPrice);

            if (!isNaN(minNum) && !isNaN(maxNum)) {
              if (minNum > maxNum) {
                // 최소값이 최대값보다 크면 자동으로 교체
                newData.minPrice = maxPrice;
                newData.maxPrice = minPrice;
              }
            }
          }
        }

        return newData;
      });
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

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 실제 뷰티프로필 저장 API 연동 필요
  }, []);

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
