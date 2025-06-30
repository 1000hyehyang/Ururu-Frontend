// 마이페이지 mock 데이터
export const myPageData = {
  // 프로필 정보
  profile: {
    nickname: '우르르',
    avatar: '/profile-image.svg',
    badges: ['민감성', '여름쿨톤'],
    points: 12345,
  },

  // 주문/배송 현황
  orderStatuses: [
    { count: 0, label: '배송중' },
    { count: 0, label: '배송 완료' },
    { count: 0, label: '취소/반품' },
  ],

  // 프로필 액션 버튼
  profileActions: [{ label: '나의 리뷰' }, { label: '프로필 수정' }, { label: '뷰티 프로필' }],

  // 사이드바 네비게이션
  navigationSections: [
    {
      title: '쇼핑 활동',
      items: [
        { icon: 'RefreshCwIcon', label: '취소/반품 내역' },
        { icon: 'PointIcon', label: '우르르 포인트 내역' },
        { icon: 'MessageSquareIcon', label: '나의 리뷰' },
        { icon: 'TruckIcon', label: '배송지 관리' },
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
