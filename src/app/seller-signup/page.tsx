'use client';

import { CustomLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Store, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuthStore } from '@/store';

export default function SellerSignUpPage() {
  const {
    signupFormData,
    agreements,
    brandGuide,
    brandGuideType,
    setSignupFormData,
    setAgreements,
    setBrandGuide,
  } = useAuthStore();

  const handleInputChange = (field: string, value: string) => {
    setSignupFormData({ [field]: value });
    if (field === 'brand') {
      setBrandGuide('', 'guide');
    }
  };

  const handleAgreementChange = (field: string, checked: boolean) => {
    setAgreements({ [field]: checked });
  };

  const isFormValid = () => {
    return (
      signupFormData.email &&
      signupFormData.password &&
      signupFormData.passwordConfirm &&
      signupFormData.password === signupFormData.passwordConfirm &&
      signupFormData.brand &&
      signupFormData.company &&
      signupFormData.ceo &&
      signupFormData.businessNumber &&
      signupFormData.phone &&
      agreements.terms &&
      agreements.privacy
    );
  };

  // 비밀번호 일치 여부 확인
  const isPasswordMatch = () => {
    return (
      signupFormData.password &&
      signupFormData.passwordConfirm &&
      signupFormData.password === signupFormData.passwordConfirm
    );
  };

  // 비밀번호 확인 메시지
  const getPasswordConfirmMessage = () => {
    if (!signupFormData.passwordConfirm) return '';
    if (signupFormData.password === signupFormData.passwordConfirm) {
      return '비밀번호가 일치합니다.';
    } else {
      return '비밀번호가 일치하지 않습니다.';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      console.log('회원가입 시도:', signupFormData);
      // TODO: 실제 회원가입 API 연동 예정
    }
  };

  const getLength = (field: keyof typeof signupFormData, max: number) =>
    `${signupFormData[field]?.length || 0}/${max}자`;

  // 전화번호 자동 하이픈 포맷팅 함수
  const formatPhoneNumber = (value: string) => {
    // 숫자만 추출
    const numbers = value.replace(/[^0-9]/g, '');

    // 길이에 따라 하이픈 추가
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  // 사업자등록번호 자동 하이픈 포맷팅 함수
  const formatBusinessNumber = (value: string) => {
    // 숫자만 추출
    const numbers = value.replace(/[^0-9]/g, '');

    // 길이에 따라 하이픈 추가 (123-45-67890 형식)
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 5) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(5, 10)}`;
    }
  };

  // 브랜드명 중복 확인 함수
  const handleBrandDuplicateCheck = async () => {
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
      console.error('브랜드명 중복 확인 실패:', error);
      setBrandGuide('중복 확인 중 오류가 발생했습니다.', 'error');
    }
  };

  const pinkOutlineBtn =
    'h-10 px-4 rounded-lg border border-primary-300 bg-bg-100 text-primary-300 text-sm font-medium hover:bg-primary-100 transition';

  return (
    <CustomLayout showTopBar={false} showSearchBar={false} showMainNav={false} showFooter={false}>
      <div className="bg-bg-100">
        {/* 회원가입 컨테이너 */}
        <div className="container mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-4 tablet:max-w-lg desktop:max-w-xl">
          {/* 로고 */}
          <div className="mb-6 flex justify-center pt-8">
            <Image
              src="/ururu-full-logo.png"
              alt="우르르"
              width={120}
              height={32}
              className="h-12 w-auto"
              priority
            />
          </div>

          {/* 안내 문구 */}
          <div className="mb-6 text-center">
            <h1 className="mb-2 text-xl font-semibold text-text-100">회원가입</h1>
            <p className="text-sm font-normal text-text-200">
              우르르와 함께 성장하는 비즈니스를 경험하세요
            </p>
          </div>

          {/* 회원가입 폼 */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 이메일 */}
            <div>
              <label className="mb-2 block text-sm font-medium text-text-100">
                이메일 <span className="text-primary-300">*</span>
              </label>
              <Input
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
                value={signupFormData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="h-12 rounded-lg border-bg-300 bg-bg-100 px-4 py-3 text-base text-text-100 placeholder:text-text-300 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-0"
                required
              />
            </div>

            {/* 비밀번호 */}
            <div>
              <label className="mb-2 block text-sm font-medium text-text-100">
                비밀번호 <span className="text-primary-300">*</span>
              </label>
              <Input
                id="password"
                type="password"
                placeholder="******"
                value={signupFormData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="h-12 rounded-lg border-bg-300 bg-bg-100 px-4 py-3 text-base text-text-100 placeholder:text-text-300 focus:border-primary-300 focus:ring-2 focus:ring-primary-300"
                maxLength={50}
                required
              />
              <div className="mt-1 flex justify-end">
                <span className="text-xs text-text-300">{getLength('password', 50)}</span>
              </div>
            </div>

            {/* 비밀번호 확인 */}
            <div>
              <label className="mb-2 block text-sm font-medium text-text-100">
                비밀번호 확인 <span className="text-primary-300">*</span>
              </label>
              <Input
                id="passwordConfirm"
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                value={signupFormData.passwordConfirm}
                onChange={(e) => handleInputChange('passwordConfirm', e.target.value)}
                className="h-12 rounded-lg border-bg-300 bg-bg-100 px-4 py-3 text-base text-text-100 placeholder:text-text-300 focus:border-primary-300 focus:ring-2 focus:ring-primary-300"
                maxLength={50}
                required
              />
              <div className="mt-1 flex items-center justify-between">
                {signupFormData.passwordConfirm && (
                  <span
                    className={`text-xs ${
                      signupFormData.password === signupFormData.passwordConfirm
                        ? 'text-primary-300'
                        : 'text-red-500'
                    }`}
                  >
                    {getPasswordConfirmMessage()}
                  </span>
                )}
                <span className="text-xs text-text-300">{getLength('passwordConfirm', 50)}</span>
              </div>
            </div>

            {/* 브랜드명 */}
            <div>
              <div className="mb-2 flex items-center">
                <label className="mr-2 text-sm font-medium text-text-100">
                  브랜드명 <span className="text-primary-300">*</span>
                </label>
              </div>
              <div className="flex gap-2">
                <Input
                  id="brand"
                  type="text"
                  placeholder="브랜드명을 입력해주세요"
                  value={signupFormData.brand}
                  onChange={(e) => handleInputChange('brand', e.target.value)}
                  className="h-12 flex-1 rounded-lg border-bg-300 bg-bg-100 px-4 py-3 text-base text-text-100 placeholder:text-text-300 focus:border-primary-300 focus:ring-2 focus:ring-primary-300"
                  maxLength={20}
                  required
                />
                <button
                  type="button"
                  className={pinkOutlineBtn + ' h-12 min-w-[120px] rounded-lg'}
                  onClick={handleBrandDuplicateCheck}
                >
                  중복 확인
                </button>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span
                  className={
                    brandGuideType === 'success'
                      ? 'text-xs text-primary-300'
                      : 'text-xs text-text-300'
                  }
                >
                  {brandGuide}
                </span>
                <span className="text-xs text-text-300">{getLength('brand', 20)}</span>
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-text-100">
                  상호명 <span className="text-primary-300">*</span>
                </label>
              </div>
              <Input
                id="company"
                type="text"
                placeholder="상호명을 입력해주세요"
                value={signupFormData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className="h-12 rounded-lg border-bg-300 bg-bg-100 px-4 py-3 text-base text-text-100 placeholder:text-text-300 focus:border-primary-300 focus:ring-2 focus:ring-primary-300"
                maxLength={20}
                required
              />
              <div className="mt-1 flex justify-end">
                <span className="text-xs text-text-300">{getLength('company', 20)}</span>
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-text-100">
                  대표이름 <span className="text-primary-300">*</span>
                </label>
              </div>
              <Input
                id="ceo"
                type="text"
                placeholder="대표 이름을 입력해주세요"
                value={signupFormData.ceo}
                onChange={(e) => handleInputChange('ceo', e.target.value)}
                className="h-12 rounded-lg border-bg-300 bg-bg-100 px-4 py-3 text-base text-text-100 placeholder:text-text-300 focus:border-primary-300 focus:ring-2 focus:ring-primary-300"
                maxLength={20}
                required
              />
              <div className="mt-1 flex justify-end">
                <span className="text-xs text-text-300">{getLength('ceo', 20)}</span>
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-text-100">
                  사업자 등록번호 <span className="text-primary-300">*</span>
                </label>
              </div>
              <Input
                id="businessNumber"
                type="text"
                placeholder="123-45-67890"
                value={formatBusinessNumber(signupFormData.businessNumber)}
                onChange={(e) =>
                  handleInputChange('businessNumber', e.target.value.replace(/[^0-9]/g, ''))
                }
                className="h-12 rounded-lg border-bg-300 bg-bg-100 px-4 py-3 text-base text-text-100 placeholder:text-text-300 focus:border-primary-300 focus:ring-2 focus:ring-primary-300"
                maxLength={12}
                required
              />
              <div className="mt-1 flex items-center justify-between">
                <span className="text-xs text-text-300">
                  하이픈(-)을 제외하고 숫자만 입력해주세요
                </span>
                <span className="text-xs text-text-300">{getLength('businessNumber', 10)}</span>
              </div>
            </div>

            {/* 전화 번호 */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-text-100">
                  휴대폰 번호 <span className="text-primary-300">*</span>
                </label>
              </div>
              <Input
                id="phone"
                type="tel"
                placeholder="010-1234-5678"
                value={formatPhoneNumber(signupFormData.phone)}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="h-12 rounded-lg border-bg-300 bg-bg-100 px-4 py-3 text-base text-text-100 placeholder:text-text-300 focus:border-primary-300 focus:ring-2 focus:ring-primary-300"
                maxLength={13}
                required
              />
              <div className="mt-1 flex items-center justify-between">
                <span className="text-xs text-text-300">
                  하이픈(-)을 제외하고 숫자만 입력해주세요
                </span>
                <span className="text-xs text-text-300">{getLength('phone', 11)}</span>
              </div>
            </div>

            {/* 주소 */}
            <div>
              <div className="mb-2 flex items-center">
                <label className="mr-2 text-sm font-medium text-text-100">
                  주소 <span className="text-primary-300">*</span>
                </label>
              </div>
              <div className="mb-2 flex gap-2">
                <div className="flex h-12 min-w-0 flex-1 items-center rounded-lg border border-bg-300 bg-bg-200 px-4 text-base text-text-300">
                  {signupFormData.zipcode || '우편번호'}
                </div>
                <button type="button" className={pinkOutlineBtn + ' h-12 min-w-[120px] rounded-lg'}>
                  우편 번호
                </button>
              </div>
              <Input
                type="text"
                placeholder="도로명"
                value={signupFormData.addressRoad}
                onChange={(e) => handleInputChange('addressRoad', e.target.value)}
                className="mb-2 h-12 rounded-lg border-bg-300 bg-bg-100 px-4 py-3 text-base text-text-100 placeholder:text-text-300 focus:border-primary-300 focus:ring-2 focus:ring-primary-300"
              />
              <Input
                type="text"
                placeholder="지번"
                value={signupFormData.addressJibun}
                onChange={(e) => handleInputChange('addressJibun', e.target.value)}
                className="mb-2 h-12 rounded-lg border-bg-300 bg-bg-100 px-4 py-3 text-base text-text-100 placeholder:text-text-300 focus:border-primary-300 focus:ring-2 focus:ring-primary-300"
              />
              <Input
                type="text"
                placeholder="상세주소를 입력해주세요"
                value={signupFormData.addressDetail}
                onChange={(e) => handleInputChange('addressDetail', e.target.value)}
                className="h-12 rounded-lg border-bg-300 bg-bg-100 px-4 py-3 text-base text-text-100 placeholder:text-text-300 focus:border-primary-300 focus:ring-2 focus:ring-primary-300"
              />
            </div>

            {/* 약관 동의 */}
            <div className="mt-6 space-y-3">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={agreements.all}
                  onChange={(e) => handleAgreementChange('all', e.target.checked)}
                  className="custom-checkbox mr-3 mt-0.5"
                />
                <span className="text-sm font-medium text-text-100">전체 약관에 동의합니다</span>
              </label>

              <div className="ml-7 space-y-2">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    checked={agreements.terms}
                    onChange={(e) => handleAgreementChange('terms', e.target.checked)}
                    className="custom-checkbox mr-3 mt-0.5"
                  />
                  <span className="text-sm text-text-200">
                    <span className="text-primary-300 underline">이용약관</span>에 동의합니다 (필수)
                  </span>
                </label>

                <label className="flex items-start">
                  <input
                    type="checkbox"
                    checked={agreements.privacy}
                    onChange={(e) => handleAgreementChange('privacy', e.target.checked)}
                    className="custom-checkbox mr-3 mt-0.5"
                  />
                  <span className="text-sm text-text-200">
                    <span className="text-primary-300 underline">개인정보처리방침</span>에
                    동의합니다 (필수)
                  </span>
                </label>

                <label className="flex items-start">
                  <input
                    type="checkbox"
                    checked={agreements.marketing}
                    onChange={(e) => handleAgreementChange('marketing', e.target.checked)}
                    className="custom-checkbox mr-3 mt-0.5"
                  />
                  <span className="text-sm text-text-200">
                    마케팅 정보 수신에 동의합니다 (선택)
                  </span>
                </label>
              </div>
            </div>

            {/* 회원가입 버튼 */}
            <Button
              type="submit"
              disabled={!isFormValid()}
              className="h-12 w-full rounded-lg border border-primary-300 bg-bg-100 text-primary-300 transition-colors hover:bg-primary-100 disabled:border-bg-300 disabled:text-text-300 disabled:hover:bg-bg-100"
            >
              <Store className="h-4 w-4" />
              판매자 회원가입
            </Button>
          </form>

          {/* 로그인 이동 */}
          <div className="mt-6 text-center">
            <span className="text-sm text-text-200">이미 계정이 있으신가요? </span>
            <Link
              href="/login"
              className="text-sm font-medium text-primary-300 transition-colors hover:text-primary-200"
            >
              로그인
            </Link>
          </div>

          {/* 안내 문구 */}
          <div className="mt-6 text-center">
            <p className="text-xs text-text-300">
              회원가입 시, <span className="underline">이용약관</span> 및{' '}
              <span className="underline">개인정보처리방침</span>에 동의한 것으로 간주됩니다.
            </p>
          </div>
        </div>
      </div>
    </CustomLayout>
  );
}
