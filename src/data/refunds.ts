import { Refund } from '@/types/refund';

// 공구 실패한 주문을 자동 환불로 변환하는 함수
const convertFailedOrdersToRefunds = (): Refund[] => {
  return [
    {
      id: 'refund-1',
      paymentId: 'payment-1',
      refundNumber: 'RF202512120001',
      type: 'OTHER',
      reason: '공구 실패로 인한 자동 환불',
      amount: 67800,
      status: 'COMPLETED',
      refundedAt: new Date('2025-06-12'),
      createdAt: new Date('2025-06-12'),
      updatedAt: new Date('2025-06-12'),
      scope: 'FULL_ORDER',
      items: [
        {
          id: 'refund-item-1',
          productId: 'product-10',
          productName: '닥터지 레드 블레미쉬 클리어 수딩 크림',
          productImage:
            'https://image.oliveyoung.co.kr/uploads/images/goods/550/10/0000/0021/A00000021315372ko.jpg?l=ko',
          option: '닥터지 레드 블레미쉬 클리어 수딩 크림 50ml',
          quantity: 1,
          price: 67800,
          refundAmount: 67800,
        },
      ],
    },
  ];
};

// 일반 환불 데이터 (완료/거절만)
const mockRefunds: Refund[] = [
  // 1. 공구 성사 전 바로 환불 완료된 케이스
  {
    id: 'refund-2',
    paymentId: 'payment-2',
    refundNumber: 'RF202512190001',
    type: 'CHANGE_OF_MIND',
    reason: '단순 변심으로 인한 환불',
    amount: 31800,
    status: 'COMPLETED',
    refundedAt: new Date('2025-06-19'),
    createdAt: new Date('2025-06-19'),
    updatedAt: new Date('2025-06-19'),
    scope: 'FULL_ORDER',
    items: [
      {
        id: 'refund-item-2',
        productId: 'product-1',
        productName: '[유리알속광/화잘먹앰플] 차앤박 프로폴리스 에너지 액티브 앰플 30ml 2개입',
        productImage:
          'https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0021/A00000021315370ko.jpg?l=ko',
        option: '에스네이처 아쿠아 스쿠알란 수분크림 60ml 더블기획(60ml+60ml)',
        quantity: 1,
        price: 28800,
        refundAmount: 31800, // 배송비 포함
      },
    ],
  },

  // 2. 배송 완료 후 7일 이내 바로 환불 완료된 케이스
  {
    id: 'refund-3',
    paymentId: 'payment-3',
    refundNumber: 'RF202512180001',
    type: 'CHANGE_OF_MIND',
    reason: '상품이 기대와 달라서 환불 신청합니다.',
    amount: 45600,
    status: 'COMPLETED',
    refundedAt: new Date('2025-06-20'),
    createdAt: new Date('2025-06-20'),
    updatedAt: new Date('2025-06-20'),
    scope: 'FULL_ORDER',
    items: [
      {
        id: 'refund-item-3-1',
        productId: 'product-2',
        productName: '닥터벨머 시카 리페어 크림',
        productImage:
          'https://image.oliveyoung.co.kr/uploads/images/goods/550/10/0000/0021/A00000021315371ko.jpg?l=ko',
        option: '닥터벨머 시카 리페어 크림 50ml',
        quantity: 2,
        price: 22800,
        refundAmount: 22800,
      },
      {
        id: 'refund-item-3-2',
        productId: 'product-3',
        productName: '라네즈 워터뱅크 하이드로 크림',
        productImage:
          'https://image.oliveyoung.co.kr/uploads/images/goods/550/10/0000/0021/A00000021315372ko.jpg?l=ko',
        option: '라네즈 워터뱅크 하이드로 크림 100ml',
        quantity: 1,
        price: 22800,
        refundAmount: 22800,
      },
    ],
  },

  // 3. 환불 거절된 케이스
  {
    id: 'refund-4',
    paymentId: 'payment-4',
    refundNumber: 'RF202512160001',
    type: 'DEFECTIVE_PRODUCT',
    reason: '상품에 하자가 있어서 환불 신청합니다.',
    amount: 89000,
    status: 'REJECTED',
    rejectReason: '상품 검수 결과 하자가 확인되지 않았습니다.',
    createdAt: new Date('2025-06-25'),
    updatedAt: new Date('2025-06-25'),
    scope: 'FULL_ORDER',
    items: [
      {
        id: 'refund-item-4-1',
        productId: 'product-5',
        productName: '이니스프리 그린티 씨드 세럼',
        productImage:
          'https://image.oliveyoung.co.kr/uploads/images/goods/550/10/0000/0021/A00000021315371ko.jpg?l=ko',
        option: '이니스프리 그린티 씨드 세럼 80ml',
        quantity: 1,
        price: 45000,
        refundAmount: 45000,
      },
      {
        id: 'refund-item-4-2',
        productId: 'product-6',
        productName: '미샤 타임 레볼루션 앰플',
        productImage:
          'https://image.oliveyoung.co.kr/uploads/images/goods/550/10/0000/0021/A00000021315372ko.jpg?l=ko',
        option: '미샤 타임 레볼루션 앰플 50ml',
        quantity: 1,
        price: 44000,
        refundAmount: 44000,
      },
    ],
  },

  // 4. 환불 완료된 케이스
  {
    id: 'refund-5',
    paymentId: 'payment-5',
    refundNumber: 'RF202512150001',
    type: 'DELIVERY_ISSUE',
    reason: '배송 중 상품이 파손되어 환불 신청합니다.',
    amount: 23400,
    status: 'COMPLETED',
    refundedAt: new Date('2025-06-22'),
    createdAt: new Date('2025-06-15'),
    updatedAt: new Date('2025-06-22'),
    scope: 'FULL_ORDER',
    items: [
      {
        id: 'refund-item-5',
        productId: 'product-7',
        productName: '클리오 킬커버 파운데이션',
        productImage:
          'https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0021/A00000021315371ko.jpg?l=ko',
        option: '클리오 킬커버 파운데이션 30ml (21호)',
        quantity: 1,
        price: 20400,
        refundAmount: 23400, // 배송비 포함
      },
    ],
  },

  // 5. 환불 완료된 케이스
  {
    id: 'refund-6',
    paymentId: 'payment-6',
    refundNumber: 'RF202512140001',
    type: 'DEFECTIVE_PRODUCT',
    reason: '상품 품질에 문제가 있어 환불 신청합니다.',
    amount: 15600,
    status: 'COMPLETED',
    refundedAt: new Date('2025-06-21'),
    createdAt: new Date('2025-06-14'),
    updatedAt: new Date('2025-06-21'),
    scope: 'FULL_ORDER',
    items: [
      {
        id: 'refund-item-6',
        productId: 'product-8',
        productName: '아누아 365 토너',
        productImage:
          'https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0021/A00000021315370ko.jpg?l=ko',
        option: '아누아 365 토너 500ml',
        quantity: 1,
        price: 12600,
        refundAmount: 15600, // 배송비 포함
      },
    ],
  },
];

// 전체 환불 데이터 (공구 실패 자동 환불 + 일반 환불)
export const allRefunds: Refund[] = [...convertFailedOrdersToRefunds(), ...mockRefunds];

export const refundStatusSummary = {
  completed: allRefunds.filter((r) => r.status === 'COMPLETED').length,
  rejected: allRefunds.filter((r) => r.status === 'REJECTED').length,
};
