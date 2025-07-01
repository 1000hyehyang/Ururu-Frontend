'use client';

import React, { useState } from 'react';
import { FormField } from '@/components/form/FormField';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Sidebar } from '@/components/mypage/Sidebar';
import { Calendar } from '@/components/ui/calendar';
import { NoFooterLayout } from '@/components/layout/layouts';
import { Card, CardContent } from '@/components/ui/card';
import { FORM_STYLES } from '@/constants/form-styles';
import { formatPhoneNumber } from '@/lib/format-utils';
import { Camera } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { GENDER_OPTIONS, DEFAULT_AGREEMENTS, VALIDATION_CONSTANTS } from '@/constants/validation';

export default function ProfileEditPage() {
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('');
  const [birth, setBirth] = useState<Date | undefined>(undefined);
  const [phone, setPhone] = useState('');
  const [agreements, setAgreements] = useState(DEFAULT_AGREEMENTS);
  const [profileImg, setProfileImg] = useState('/profile-image.svg');
  const [nicknameGuide, setNicknameGuide] = useState('');
  const [nicknameGuideType, setNicknameGuideType] = useState<'success' | 'error' | 'base'>('base');

  const handleNicknameCheck = () => {
    if (!nickname.trim()) {
      setNicknameGuide('닉네임을 입력해주세요.');
      setNicknameGuideType('error');
      return;
    }
    // TODO: 실제 중복확인 API 연동 필요
    setNicknameGuide('사용 가능한 닉네임입니다.');
    setNicknameGuideType('success');
  };

  // TODO: 실제 중복확인, 저장, 이미지 업로드 로직 연결 필요

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
              <h1 className="mb-6 text-center text-2xl font-semibold md:text-2xl">프로필 수정</h1>
              {/* 프로필 이미지 */}
              <div className="relative mb-8 flex flex-col items-center">
                <Avatar className="h-28 w-28 md:h-36 md:w-36">
                  <AvatarImage src={profileImg} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <label
                  htmlFor="profile-upload"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 cursor-pointer"
                >
                  <input id="profile-upload" type="file" accept="image/*" className="hidden" />
                  <span className="flex h-9 w-16 items-center justify-center rounded-full border border-bg-300 bg-bg-100 shadow-md hover:bg-bg-200">
                    <Camera className="h-5 w-5 text-text-300" />
                    <span className="sr-only">프로필 사진 변경</span>
                  </span>
                </label>
              </div>
              <form className="w-full space-y-6">
                {/* 닉네임 */}
                <FormField
                  label="닉네임"
                  required
                  helperText={nicknameGuide}
                  helperTextType={nicknameGuideType}
                  characterCount={{
                    current: nickname.length,
                    max: VALIDATION_CONSTANTS.MAX_LENGTHS.NICKNAME,
                  }}
                >
                  <div className="flex gap-2">
                    <Input
                      value={nickname}
                      onChange={(e) => {
                        setNickname(e.target.value);
                        setNicknameGuide('');
                        setNicknameGuideType('base');
                      }}
                      maxLength={VALIDATION_CONSTANTS.MAX_LENGTHS.NICKNAME}
                      placeholder="닉네임을 입력해주세요"
                      className={FORM_STYLES.input.base + ' ' + FORM_STYLES.input.focus + ' flex-1'}
                    />
                    <button
                      type="button"
                      className={FORM_STYLES.button.pinkOutline + ' h-12 min-w-[120px] rounded-lg'}
                      onClick={handleNicknameCheck}
                    >
                      중복 확인
                    </button>
                  </div>
                </FormField>
                {/* 성별 */}
                <FormField label="성별" required>
                  <div className="flex gap-2">
                    {GENDER_OPTIONS.map((opt) => (
                      <Button
                        key={opt.value}
                        type="button"
                        variant={gender === opt.value ? 'default' : 'outline'}
                        className={`h-12 min-w-0 flex-1 rounded-lg border text-sm font-medium transition ${gender === opt.value ? 'border-primary-300 bg-primary-300 text-text-on' : 'border-bg-300 bg-bg-100 text-text-300 hover:bg-bg-200'}`}
                        onClick={() => setGender(opt.value)}
                      >
                        {opt.label}
                      </Button>
                    ))}
                  </div>
                </FormField>
                {/* 생년월일 */}
                <FormField label="생년월일" required>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={
                          FORM_STYLES.input.base +
                          ' flex w-full items-center justify-between font-normal'
                        }
                      >
                        {birth ? (
                          format(birth, 'yyyy-MM-dd')
                        ) : (
                          <span className="text-text-300">생년월일 선택</span>
                        )}
                        <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={birth}
                        onSelect={setBirth}
                        captionLayout="dropdown"
                        disabled={(date) =>
                          date > new Date() ||
                          date < new Date(`${VALIDATION_CONSTANTS.BIRTH.MIN_YEAR}-01-01`)
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormField>
                {/* 휴대폰 번호 */}
                <FormField
                  label="휴대폰 번호"
                  helperText="하이픈(-)을 제외하고 숫자만 입력해주세요"
                  characterCount={{
                    current: phone.length,
                    max: VALIDATION_CONSTANTS.PHONE.MAX_LENGTH,
                  }}
                >
                  <Input
                    type="tel"
                    value={formatPhoneNumber(phone)}
                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="010-1234-5678"
                    className={FORM_STYLES.input.base + ' ' + FORM_STYLES.input.focus}
                    maxLength={VALIDATION_CONSTANTS.PHONE.FORMATTED_MAX_LENGTH}
                  />
                </FormField>
                <Separator className="my-4" />
                {/* 약관 동의 */}
                <div className="mt-6 space-y-3">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={agreements.marketing}
                      onChange={(e) =>
                        setAgreements((a) => ({ ...a, marketing: e.target.checked }))
                      }
                      className={FORM_STYLES.checkbox.base}
                    />
                    <span className="text-sm text-text-200">
                      마케팅 정보 수신에 동의합니다 (선택)
                    </span>
                  </label>
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={agreements.location}
                      onChange={(e) => setAgreements((a) => ({ ...a, location: e.target.checked }))}
                      className={FORM_STYLES.checkbox.base}
                    />
                    <span className="text-sm text-text-200">
                      위치 기반 서비스 이용약관에 동의합니다 (선택)
                    </span>
                  </label>
                </div>
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
