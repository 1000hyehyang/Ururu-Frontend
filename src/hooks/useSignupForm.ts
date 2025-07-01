import { useCallback } from 'react';
import { useAuthStore } from '@/store';
import { isPasswordValid } from '@/lib/password-utils';
import { FormFieldType, AgreementType, SignupFormData, AgreementData } from '@/types/form';

export const useSignupForm = () => {
  const {
    signupFormData,
    agreements,
    brandGuide,
    brandGuideType,
    setSignupFormData,
    setAgreements,
    setBrandGuide,
  } = useAuthStore();

  // 입력 필드 변경 핸들러
  const handleInputChange = useCallback(
    (field: FormFieldType, value: string) => {
      setSignupFormData({ [field]: value } as Partial<SignupFormData>);
      if (field === 'brand') {
        setBrandGuide('', 'guide');
      }
    },
    [setSignupFormData, setBrandGuide],
  );

  // 약관 동의 변경 핸들러
  const handleAgreementChange = useCallback(
    (field: AgreementType, checked: boolean) => {
      setAgreements({ [field]: checked } as Partial<AgreementData>);
    },
    [setAgreements],
  );

  // 브랜드명 중복 확인 핸들러
  const handleBrandDuplicateCheck = useCallback(async () => {
    if (!signupFormData.brand.trim()) {
      setBrandGuide('브랜드명을 입력해주세요.', 'error');
      return;
    }

    try {
      // TODO: 실제 브랜드명 중복 확인 API 호출
      // const response = await checkBrandDuplicate(signupFormData.brand);
      // if (response.isDuplicate) {
      //   setBrandGuide('이미 사용 중인 브랜드명입니다.', 'error');
      // } else {
      //   setBrandGuide('사용 가능한 브랜드명입니다.', 'success');
      // }

      // 임시 로직 (API 구현 전)
      setBrandGuide('사용 가능한 브랜드명입니다.', 'success');
    } catch (error) {
      // TODO: 에러 로깅 서비스 연동
      setBrandGuide('중복 확인 중 오류가 발생했습니다.', 'error');
    }
  }, [signupFormData.brand, setBrandGuide]);

  // 폼 유효성 검사
  const isFormValid = useCallback(() => {
    return (
      signupFormData.email &&
      signupFormData.password &&
      signupFormData.passwordConfirm &&
      signupFormData.password === signupFormData.passwordConfirm &&
      isPasswordValid(signupFormData.password) &&
      signupFormData.brand &&
      signupFormData.company &&
      signupFormData.ceo &&
      signupFormData.businessNumber &&
      signupFormData.phone &&
      agreements.terms &&
      agreements.privacy
    );
  }, [signupFormData, agreements]);

  // 폼 제출 핸들러
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (isFormValid()) {
        // TODO: 실제 회원가입 API 연동 예정
      }
    },
    [isFormValid, signupFormData],
  );

  return {
    // 상태
    signupFormData,
    agreements,
    brandGuide,
    brandGuideType,

    // 핸들러
    handleInputChange,
    handleAgreementChange,
    handleBrandDuplicateCheck,
    handleSubmit,

    // 유효성 검사
    isFormValid: isFormValid(),
  };
};
