import { PointEarnMethod, GroupedPointHistory } from '../types/point';

export const MOCK_POINT_BALANCE = 12345;

export const MOCK_POINT_EARN_METHODS: PointEarnMethod[] = [
  { icon: '🎁', label: '공구 참여', amount: 10 },
  { icon: '👥', label: '친구 초대', amount: 100 },
  { icon: '✍️', label: '리뷰 작성', amount: 50 },
  { icon: '📸', label: '포토 리뷰', amount: 100 },
];

export const MOCK_POINT_HISTORY: GroupedPointHistory[] = [
  {
    date: '2025.06.19',
    items: [
      {
        id: '1',
        type: '적립',
        title: '포토 리뷰 작성',
        description: '[유리알속광/화잘먹앰플] 차앤박 프로폴리스 에너지 액티브 앰플 30ml 2개입',
        amount: 100,
        date: '2025.06.19',
      },
      {
        id: '2',
        type: '적립',
        title: '공동 구매 보상 적립금',
        description: '[유리알속광/화잘먹앰플] 차앤박 프로폴리스 에너지 액티브 앰플 30ml 2개입',
        amount: 12245,
        date: '2025.06.19',
      },
    ],
  },
  {
    date: '2025.06.17',
    items: [
      {
        id: '3',
        type: '사용',
        title: '포인트 사용',
        description: '주문 결제',
        amount: -100,
        date: '2025.06.17',
      },
    ],
  },
];
