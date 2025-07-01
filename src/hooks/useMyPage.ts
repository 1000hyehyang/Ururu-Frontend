import { useMemo } from 'react';
import { beautyProfileData } from '@/data/mypage';
import { useBeautyProfileUtils } from '@/hooks/useBeautyProfileUtils';

export const useMyPage = () => {
  const { createSummaryInfo } = useBeautyProfileUtils();

  // 실제로는 API에서 가져올 데이터 (현재는 mock 데이터 사용)
  const profileData = beautyProfileData.withProfile;

  // 뷰티 프로필이 있는지 확인
  const hasBeautyProfile = useMemo(() => {
    return Boolean(profileData.skinType && profileData.skinTone);
  }, [profileData.skinType, profileData.skinTone]);

  // 뷰티 프로필 요약 정보 생성
  const summaryInfo = useMemo(() => {
    return createSummaryInfo(profileData, hasBeautyProfile);
  }, [profileData, hasBeautyProfile, createSummaryInfo]);

  return {
    profileData,
    hasBeautyProfile,
    summaryInfo,
  };
};
