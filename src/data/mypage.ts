// 마이페이지 아이템 타입 정의
interface NavigationItem {
  icon: string;
  label: string;
  href?: string;
}

interface ProfileAction {
  label: string;
  href?: string;
}

interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

// 마이페이지 mock 데이터
export const myPageData = {
  // 프로필 정보
  profile: {
    nickname: '우르르',
    avatar: '/profile-image.svg',
    badges: ['민감성', '여름쿨톤'],
    points: 12345,
  },

  // 프로필 액션 버튼
  profileActions: [
    { label: '나의 리뷰', href: '/mypage/review' },
    { label: '프로필 수정', href: '/mypage/profile-edit' },
    { label: '뷰티 프로필 수정', href: '/mypage/beauty-profile-edit' },
  ],

  // 사이드바 네비게이션
  navigationSections: [
    {
      title: '쇼핑 활동',
      items: [
        { icon: 'PackageIcon', label: '주문/배송 조회', href: '/mypage/orders' },
        { icon: 'RefreshCwIcon', label: '취소/반품 내역' },
        { icon: 'PointIcon', label: '우르르 포인트 내역' },
        { icon: 'MessageSquareIcon', label: '나의 리뷰', href: '/mypage/review' },
        { icon: 'TruckIcon', label: '배송지 관리', href: '/mypage/address' },
      ],
    },
    {
      title: '계정 관리',
      items: [
        { icon: 'LogOutIcon', label: '로그아웃' },
        { icon: 'UserXIcon', label: '회원탈퇴' },
      ],
    },
    {
      title: '도움말',
      items: [
        { icon: 'FileTextIcon', label: '개인정보 처리방침' },
        { icon: 'FileIcon', label: '서비스 이용약관' },
      ],
    },
  ],
};

// 뷰티 프로필 mock 데이터
export const beautyProfileData = {
  // 뷰티 프로필이 있는 경우
  withProfile: {
    skinType: 'combination',
    skinTone: 'summer_cool',
    skinConcerns: ['blemishes', 'pores', 'sensitive'],
    skinReaction: 'yes',
    interestCategories: ['skincare', 'mask', 'cleansing'],
    minPrice: '10000',
    maxPrice: '50000',
    productRequest:
      '건조한 겨울철에 특히 각질이 많이 일어나고, 향이 강한 제품을 피하고 싶어요. 민감성 피부라서 순한 성분의 제품을 선호합니다.',
  },

  // 뷰티 프로필이 없는 경우
  empty: {
    skinType: '',
    skinTone: '',
    skinConcerns: [],
    skinReaction: '',
    interestCategories: [],
    minPrice: '',
    maxPrice: '',
    productRequest: '',
  },
};
