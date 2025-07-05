'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { MyPageLayout } from '@/components/mypage/MyPageLayout';
import { ProfileFormFields, ProfileImageUpload } from '@/components/mypage/profile-edit';
import { Card, CardContent } from '@/components/ui/card';
import { PageHeader } from '@/components/common';
import { FORM_STYLES } from '@/constants/form-styles';
import { useProfileEdit } from '@/hooks/useProfileEdit';

export default function ProfileEditPage() {
  const {
    nickname,
    gender,
    birth,
    phone,
    agreements,
    profileImg,
    nicknameGuide,
    nicknameGuideType,
    handleNicknameChange,
    handleNicknameCheck,
    setGender,
    setBirth,
    handlePhoneChange,
    handleAgreementChange,
    handleSubmit,
    GENDER_OPTIONS,
  } = useProfileEdit();

  return (
    <MyPageLayout>
      <Card className={FORM_STYLES.card.base}>
        <CardContent className={FORM_STYLES.card.content}>
          <PageHeader title="프로필 수정" />

          {/* 프로필 이미지 */}
          <ProfileImageUpload profileImg={profileImg} />

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <ProfileFormFields
              nickname={nickname}
              gender={gender}
              birth={birth}
              phone={phone}
              agreements={agreements}
              nicknameGuide={nicknameGuide}
              nicknameGuideType={nicknameGuideType}
              onNicknameChange={handleNicknameChange}
              onNicknameCheck={handleNicknameCheck}
              onGenderChange={setGender}
              onBirthChange={setBirth}
              onPhoneChange={handlePhoneChange}
              onAgreementChange={handleAgreementChange}
              genderOptions={GENDER_OPTIONS}
            />

            <Button
              type="submit"
              className={FORM_STYLES.button.submit + ' mt-6 text-sm font-medium'}
            >
              저장하기
            </Button>
          </form>
        </CardContent>
      </Card>
    </MyPageLayout>
  );
}
