'use client';

import { CustomLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField, PasswordStrengthIndicator } from '@/components/form';
import { Store, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  checkPasswordLength,
  checkPasswordHasLetter,
  checkPasswordHasNumber,
  checkPasswordHasSpecial,
} from '@/lib/password-utils';
import { formatPhoneNumber, formatBusinessNumber } from '@/lib/format-utils';
import { FORM_STYLES } from '@/constants/form-styles';
import { useSignupForm } from '@/hooks/useSignupForm';
import { FormFieldType, AgreementType } from '@/types/form';

export default function SellerSignUpPage() {
  const {
    signupFormData,
    agreements,
    brandGuide,
    brandGuideType,
    handleInputChange,
    handleAgreementChange,
    handleBrandDuplicateCheck,
    handleSubmit,
    isFormValid,
  } = useSignupForm();

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
            <FormField label="이메일" required>
              <Input
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
                value={signupFormData.email}
                onChange={(e) => handleInputChange('email' as FormFieldType, e.target.value)}
                className={FORM_STYLES.input.base + ' ' + FORM_STYLES.input.focus}
                required
              />
            </FormField>

            {/* 비밀번호 */}
            <FormField
              label="비밀번호"
              required
              helperText="영문, 숫자, 특수문자 포함 8자 이상"
              characterCount={{ current: signupFormData.password?.length || 0, max: 50 }}
            >
              <Input
                id="password"
                type="password"
                placeholder="******"
                value={signupFormData.password}
                onChange={(e) => handleInputChange('password' as FormFieldType, e.target.value)}
                className={FORM_STYLES.input.base}
                maxLength={50}
                required
              />
            </FormField>
            <PasswordStrengthIndicator
              password={signupFormData.password}
              checkPasswordLength={checkPasswordLength}
              checkPasswordHasLetter={checkPasswordHasLetter}
              checkPasswordHasNumber={checkPasswordHasNumber}
              checkPasswordHasSpecial={checkPasswordHasSpecial}
            />

            {/* 비밀번호 확인 */}
            <FormField
              label="비밀번호 확인"
              required
              helperText={
                signupFormData.passwordConfirm
                  ? signupFormData.password === signupFormData.passwordConfirm
                    ? '비밀번호가 일치합니다.'
                    : '비밀번호가 일치하지 않습니다.'
                  : undefined
              }
              helperTextType={
                signupFormData.passwordConfirm
                  ? signupFormData.password === signupFormData.passwordConfirm
                    ? 'success'
                    : 'error'
                  : 'base'
              }
              characterCount={{ current: signupFormData.passwordConfirm?.length || 0, max: 50 }}
            >
              <Input
                id="passwordConfirm"
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                value={signupFormData.passwordConfirm}
                onChange={(e) =>
                  handleInputChange('passwordConfirm' as FormFieldType, e.target.value)
                }
                className={FORM_STYLES.input.base}
                maxLength={50}
                required
              />
            </FormField>

            {/* 브랜드명 */}
            <FormField
              label="브랜드명"
              required
              helperText={brandGuide || undefined}
              helperTextType={brandGuideType === 'guide' ? 'base' : brandGuideType}
              characterCount={{ current: signupFormData.brand?.length || 0, max: 20 }}
            >
              <div className="flex gap-2">
                <Input
                  id="brand"
                  type="text"
                  placeholder="브랜드명을 입력해주세요"
                  value={signupFormData.brand}
                  onChange={(e) => handleInputChange('brand' as FormFieldType, e.target.value)}
                  className={FORM_STYLES.input.base + ' flex-1'}
                  maxLength={20}
                  required
                />
                <button
                  type="button"
                  className={FORM_STYLES.button.pinkOutline + ' h-12 min-w-[120px] rounded-lg'}
                  onClick={handleBrandDuplicateCheck}
                >
                  중복 확인
                </button>
              </div>
            </FormField>

            <FormField
              label="상호명"
              required
              characterCount={{ current: signupFormData.company?.length || 0, max: 20 }}
            >
              <Input
                id="company"
                type="text"
                placeholder="상호명을 입력해주세요"
                value={signupFormData.company}
                onChange={(e) => handleInputChange('company' as FormFieldType, e.target.value)}
                className={FORM_STYLES.input.base}
                maxLength={20}
                required
              />
            </FormField>

            <FormField
              label="대표이름"
              required
              characterCount={{ current: signupFormData.ceo?.length || 0, max: 20 }}
            >
              <Input
                id="ceo"
                type="text"
                placeholder="대표 이름을 입력해주세요"
                value={signupFormData.ceo}
                onChange={(e) => handleInputChange('ceo' as FormFieldType, e.target.value)}
                className={FORM_STYLES.input.base}
                maxLength={20}
                required
              />
            </FormField>

            <FormField
              label="사업자 등록번호"
              required
              helperText="하이픈(-)을 제외하고 숫자만 입력해주세요"
              characterCount={{ current: signupFormData.businessNumber?.length || 0, max: 10 }}
            >
              <Input
                id="businessNumber"
                type="text"
                placeholder="123-45-67890"
                value={formatBusinessNumber(signupFormData.businessNumber)}
                onChange={(e) =>
                  handleInputChange(
                    'businessNumber' as FormFieldType,
                    e.target.value.replace(/[^0-9]/g, ''),
                  )
                }
                className={FORM_STYLES.input.base}
                maxLength={12}
                required
              />
            </FormField>

            {/* 전화 번호 */}
            <FormField
              label="휴대폰 번호"
              required
              helperText="하이픈(-)을 제외하고 숫자만 입력해주세요"
              characterCount={{ current: signupFormData.phone?.length || 0, max: 11 }}
            >
              <Input
                id="phone"
                type="tel"
                placeholder="010-1234-5678"
                value={formatPhoneNumber(signupFormData.phone)}
                onChange={(e) =>
                  handleInputChange('phone' as FormFieldType, e.target.value.replace(/[^0-9]/g, ''))
                }
                className={FORM_STYLES.input.base}
                maxLength={13}
                required
              />
            </FormField>

            {/* 주소 */}
            <FormField label="주소" required>
              <div className="mb-2 flex gap-2">
                <div className={FORM_STYLES.zipcode.display}>
                  {signupFormData.zipcode || '우편번호'}
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
                value={signupFormData.addressRoad}
                onChange={(e) => handleInputChange('addressRoad' as FormFieldType, e.target.value)}
                className={FORM_STYLES.input.base + ' mb-2'}
              />
              <Input
                type="text"
                placeholder="지번"
                value={signupFormData.addressJibun}
                onChange={(e) => handleInputChange('addressJibun' as FormFieldType, e.target.value)}
                className={FORM_STYLES.input.base + ' mb-2'}
              />
              <Input
                type="text"
                placeholder="상세주소를 입력해주세요"
                value={signupFormData.addressDetail}
                onChange={(e) =>
                  handleInputChange('addressDetail' as FormFieldType, e.target.value)
                }
                className={FORM_STYLES.input.base}
              />
            </FormField>

            {/* 약관 동의 */}
            <div className="mt-6 space-y-3">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={agreements.all}
                  onChange={(e) => handleAgreementChange('all' as AgreementType, e.target.checked)}
                  className={FORM_STYLES.checkbox.base}
                />
                <span className="text-sm font-medium text-text-100">전체 약관에 동의합니다</span>
              </label>

              <div className="ml-7 space-y-2">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    checked={agreements.terms}
                    onChange={(e) =>
                      handleAgreementChange('terms' as AgreementType, e.target.checked)
                    }
                    className={FORM_STYLES.checkbox.base}
                  />
                  <span className="text-sm text-text-200">
                    <span className="text-primary-300 underline">이용약관</span>에 동의합니다 (필수)
                  </span>
                </label>

                <label className="flex items-start">
                  <input
                    type="checkbox"
                    checked={agreements.privacy}
                    onChange={(e) =>
                      handleAgreementChange('privacy' as AgreementType, e.target.checked)
                    }
                    className={FORM_STYLES.checkbox.base}
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
                    onChange={(e) =>
                      handleAgreementChange('marketing' as AgreementType, e.target.checked)
                    }
                    className={FORM_STYLES.checkbox.base}
                  />
                  <span className="text-sm text-text-200">
                    마케팅 정보 수신에 동의합니다 (선택)
                  </span>
                </label>
              </div>
            </div>

            {/* 회원가입 버튼 */}
            <Button type="submit" disabled={!isFormValid} className={FORM_STYLES.button.submit}>
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
