'use client';

import { CustomLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Store } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuthStore } from '@/store';
import { FORM_STYLES } from '@/constants/form-styles';

export default function LoginPage() {
  const { loginType, loginFormData, setLoginType, setLoginFormData } = useAuthStore();

  const handleInputChange = (field: string, value: string) => {
    setLoginFormData({ [field]: value });
  };

  const handleSellerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 실제 로그인 API 연동 예정
  };

  return (
    <CustomLayout showTopBar={false} showSearchBar={false} showMainNav={false} showFooter={false}>
      <div className="bg-bg-100">
        {/* 로그인 컨테이너 */}
        <div className="container mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-4 tablet:max-w-lg desktop:max-w-xl">
          {/* 로고 */}
          <div className="mb-6 flex justify-center">
            <Link href="/" aria-label="우르르 홈으로 이동">
              <Image
                src="/ururu-full-logo.png"
                alt="우르르"
                width={120}
                height={32}
                className="h-12 w-auto"
                priority
              />
            </Link>
          </div>

          {/* 안내 문구 */}
          <div className="mb-6 text-center">
            <p className="text-sm font-normal text-text-200">
              {loginType === 'buyer'
                ? '지금 우르르 몰려가 득템하러 가볼까요?'
                : '우르르와 함께 성장하는 비즈니스를 경험하세요'}
            </p>
          </div>

          {/* 로그인 타입 선택 */}
          <div className="mb-6">
            <div
              className="flex rounded-lg bg-bg-200 p-1"
              role="tablist"
              aria-label="로그인 유형 선택"
            >
              <button
                type="button"
                onClick={() => setLoginType('buyer')}
                className={`flex flex-1 items-center justify-center gap-2 rounded-md py-3 text-sm font-medium transition-all ${
                  loginType === 'buyer'
                    ? 'bg-bg-100 text-text-100 shadow-sm'
                    : 'text-text-200 hover:text-text-100'
                }`}
                role="tab"
                aria-selected={loginType === 'buyer'}
                aria-label="구매자 로그인"
              >
                <User className="h-4 w-4" aria-hidden="true" />
                구매자 로그인
              </button>
              <button
                type="button"
                onClick={() => setLoginType('seller')}
                className={`flex flex-1 items-center justify-center gap-2 rounded-md py-3 text-sm font-medium transition-all ${
                  loginType === 'seller'
                    ? 'bg-bg-100 text-text-100 shadow-sm'
                    : 'text-text-200 hover:text-text-100'
                }`}
                role="tab"
                aria-selected={loginType === 'seller'}
                aria-label="판매자 로그인"
              >
                <Store className="h-4 w-4" aria-hidden="true" />
                판매자 로그인
              </button>
            </div>
          </div>

          {/* 소셜 로그인 (구매자 로그인일 때만 표시) */}
          {loginType === 'buyer' && (
            <div className="min-h-[320px] space-y-4" role="region" aria-label="소셜 로그인">
              <div className="space-y-3">
                {/* 카카오 로그인 */}
                <button
                  type="button"
                  className="flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-[#FEE500] text-sm font-medium text-[#3C1E1E] shadow transition hover:brightness-95"
                  aria-label="카카오 계정으로 로그인"
                >
                  <Image
                    src="/kakao-talk.svg"
                    alt="카카오"
                    width={20}
                    height={20}
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                  카카오 계정으로 로그인하기
                </button>
                {/* 구글 로그인 */}
                <button
                  type="button"
                  className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-bg-300 bg-bg-100 text-sm font-medium text-text-200 shadow transition hover:bg-bg-200"
                  aria-label="구글 계정으로 로그인"
                >
                  <Image
                    src="/google-logo.svg"
                    alt="구글"
                    width={20}
                    height={20}
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                  구글 계정으로 로그인하기
                </button>
              </div>
              {/* 약관 동의 문구 */}
              <div className="mt-6 text-center">
                <p className="text-xs text-text-300">
                  계속 진행 시, <span className="underline">이용약관</span> 및{' '}
                  <span className="underline">개인정보처리방침</span>에 동의한 것으로 간주됩니다.
                </p>
              </div>
            </div>
          )}

          {/* 판매자 로그인 폼 */}
          {loginType === 'seller' && (
            <form
              onSubmit={handleSellerLogin}
              className="min-h-[320px] space-y-5"
              role="form"
              aria-label="판매자 로그인 폼"
            >
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-text-100">
                  이메일
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="이메일을 입력하세요"
                  value={loginFormData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="h-12 rounded-lg border-bg-300 bg-bg-100 px-4 py-3 text-base text-text-100 placeholder:text-text-300 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-0"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-text-100">
                  비밀번호
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={loginFormData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="h-12 rounded-lg border-bg-300 bg-bg-100 px-4 py-3 text-base text-text-100 placeholder:text-text-300 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-0"
                  required
                />
              </div>

              {/* 로그인 유지 & 비밀번호 찾기 */}
              <div className="flex items-center justify-between">
                <label className={FORM_STYLES.checkbox.container}>
                  <input
                    type="checkbox"
                    className={FORM_STYLES.checkbox.base}
                    aria-label="로그인 유지"
                  />
                  <span className={FORM_STYLES.checkbox.label}>로그인 유지</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-text-200 transition-colors hover:text-primary-300"
                  aria-label="비밀번호 찾기"
                >
                  비밀번호 찾기
                </button>
              </div>

              {/* 로그인 버튼 */}
              <Button
                type="submit"
                size="lg"
                className="h-12 w-full rounded-lg border border-primary-300 bg-bg-100 text-primary-300 transition-colors hover:bg-primary-100"
                aria-label="판매자 센터로 이동"
              >
                판매자 센터로 이동
              </Button>

              {/* 약관 동의 문구 */}
              <div className="mt-6 text-center">
                <p className="text-xs text-text-300">
                  계속 진행 시, <span className="underline">이용약관</span> 및{' '}
                  <span className="underline">개인정보처리방침</span>에 동의한 것으로 간주됩니다.
                </p>
              </div>

              {/* 회원가입 문구 (판매자 로그인에서만) */}
              <div className="mt-2 text-center">
                <span className="text-sm text-text-200">아직 회원이 아니신가요? </span>
                <Link
                  href="/seller-signup"
                  className="text-sm font-medium text-primary-300 transition-colors hover:text-primary-200"
                  aria-label="판매자 회원가입 페이지로 이동"
                >
                  회원가입
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </CustomLayout>
  );
}
