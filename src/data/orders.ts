import { Order, OrderStatusSummary } from '@/types/order';

export const orderStatusSummary: OrderStatusSummary = {
  inProgress: 2,
  confirmed: 2, // 3에서 2로 변경 (환불 요청으로 이동)
  refundPending: 2, // 1에서 2로 변경 (환불 요청 추가)
  // failed: 2, // 실패한 주문은 주문/배송 조회에서 제외되므로 통계에서도 제외
};

export const mockOrders: Order[] = [
  // 1. 진행중인 공구 - 20% 할인 달성
  {
    id: '1',
    orderNumber: '202512190001',
    orderDate: new Date('2025-06-19'),
    status: 'in_progress',
    progressRate: 25, // 20% 이상으로 20% 할인 달성
    totalAmount: 31800,
    shippingFee: 3000,
    items: [
      {
        id: '1-1',
        productId: 'product-1',
        productName: '[유리알속광/화잘먹앰플] 차앤박 프로폴리스 에너지 액티브 앰플 30ml 2개입',
        productImage:
          'https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0021/A00000021315370ko.jpg?l=ko',
        option: '에스네이처 아쿠아 스쿠알란 수분크림 60ml 더블기획(60ml+60ml)',
        quantity: 1,
        price: 28800,
        canWriteReview: false,
        hasReview: false,
      },
    ],
    canRefund: true,
    canTrackDelivery: true,
    deliveryStatus: 'preparing',
    refundDeadline: new Date('2025-07-19'), // 30일 후
  },

  // 2. 확정된 공구 - 60% 할인 달성
  {
    id: '2',
    orderNumber: '202512180002',
    orderDate: new Date('2025-06-18'),
    status: 'confirmed',
    progressRate: 65, // 60% 이상으로 60% 할인 달성
    totalAmount: 45600,
    shippingFee: 0,
    items: [
      {
        id: '2-1',
        productId: 'product-2',
        productName: '닥터벨머 시카 리페어 크림',
        productImage:
          'https://image.oliveyoung.co.kr/uploads/images/goods/550/10/0000/0021/A00000021315371ko.jpg?l=ko',
        option: '닥터벨머 시카 리페어 크림 50ml',
        quantity: 2,
        price: 22800,
        canWriteReview: true,
        hasReview: false,
      },
      {
        id: '2-2',
        productId: 'product-3',
        productName: '라네즈 워터뱅크 하이드로 크림',
        productImage:
          'https://image.oliveyoung.co.kr/uploads/images/goods/550/10/0000/0021/A00000021315372ko.jpg?l=ko',
        option: '라네즈 워터뱅크 하이드로 크림 100ml',
        quantity: 1,
        price: 22800,
        canWriteReview: true,
        hasReview: true,
        reviewId: 'review-1',
      },
    ],
    canRefund: true,
    canTrackDelivery: true,
    deliveryStatus: 'delivered',
    refundDeadline: new Date('2025-07-18'), // 30일 후
  },

  // 3. 진행중인 공구 - 리워드 달성률 낮음 (20% 미만)
  {
    id: '3',
    orderNumber: '202512170003',
    orderDate: new Date('2025-06-17'),
    status: 'in_progress',
    progressRate: 15, // 20% 미만으로 리워드 뱃지 없음
    totalAmount: 15600,
    shippingFee: 3000,
    items: [
      {
        id: '3-1',
        productId: 'product-4',
        productName: '토니모리 원더 세라마이드 모이스처 크림',
        productImage:
          'https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0021/A00000021315370ko.jpg?l=ko',
        option: '토니모리 원더 세라마이드 모이스처 크림 80ml',
        quantity: 1,
        price: 12600,
        canWriteReview: false,
        hasReview: false,
      },
    ],
    canRefund: true,
    canTrackDelivery: true,
    deliveryStatus: 'preparing',
    refundDeadline: new Date('2025-07-17'), // 30일 후
  },

  // 4. 확정된 공구 - 40% 할인 달성, 배송 완료 후 7일 초과 30일 이내, 하자/오배송으로 환불 대기중
  {
    id: '4',
    orderNumber: '202512160004',
    orderDate: new Date('2025-06-16'),
    status: 'refund_pending',
    progressRate: 45, // 40% 이상으로 40% 할인 달성
    totalAmount: 89000,
    shippingFee: 0,
    items: [
      {
        id: '4-1',
        productId: 'product-5',
        productName: '이니스프리 그린티 씨드 세럼',
        productImage:
          'https://image.oliveyoung.co.kr/uploads/images/goods/550/10/0000/0021/A00000021315371ko.jpg?l=ko',
        option: '이니스프리 그린티 씨드 세럼 80ml',
        quantity: 1,
        price: 45000,
        canWriteReview: true,
        hasReview: false,
      },
      {
        id: '4-2',
        productId: 'product-6',
        productName: '미샤 타임 레볼루션 앰플',
        productImage:
          'https://image.oliveyoung.co.kr/uploads/images/goods/550/10/0000/0021/A00000021315372ko.jpg?l=ko',
        option: '미샤 타임 레볼루션 앰플 50ml',
        quantity: 1,
        price: 44000,
        canWriteReview: true,
        hasReview: false,
      },
    ],
    canRefund: false, // 환불 대기중이므로 취소 불가
    canTrackDelivery: true,
    deliveryStatus: 'delivered',
    refundDeadline: new Date('2025-07-16'), // 30일 후
    refundRequestDate: new Date('2025-06-25'), // 배송 완료 후 9일째 환불 신청
    refundReason: '상품에 하자가 있어서 환불 신청합니다.',
    refundType: 'DEFECTIVE_PRODUCT',
  },

  // 5. 확정된 공구 - 60% 할인 달성, 배송 완료 후 7일 초과 30일 이내, 단순 변심으로 환불 불가
  {
    id: '5',
    orderNumber: '202512150005',
    orderDate: new Date('2025-06-15'),
    status: 'confirmed',
    progressRate: 70, // 60% 이상으로 60% 할인 달성
    totalAmount: 23400,
    shippingFee: 3000,
    items: [
      {
        id: '5-1',
        productId: 'product-7',
        productName: '클리오 킬커버 파운데이션',
        productImage:
          'https://image.oliveyoung.co.kr/uploads/images/goods/550/10/0000/0021/A00000021315371ko.jpg?l=ko',
        option: '클리오 킬커버 파운데이션 30ml (21호)',
        quantity: 1,
        price: 20400,
        canWriteReview: true,
        hasReview: true,
        reviewId: 'review-2',
      },
    ],
    canRefund: false, // 배송 완료 후 7일 초과로 단순 변심 환불 불가
    canTrackDelivery: false, // 배송 완료로 조회 불가
    deliveryStatus: 'completed',
    refundDeadline: new Date('2025-07-15'), // 30일 후
  },

  // 6. 확정된 공구 - 40% 할인 달성, 배송 완료 후 30일 초과로 환불 기간 만료
  {
    id: '6',
    orderNumber: '202512140006',
    orderDate: new Date('2025-06-14'),
    status: 'confirmed',
    progressRate: 50, // 40% 이상으로 40% 할인 달성
    totalAmount: 15600,
    shippingFee: 3000,
    items: [
      {
        id: '6-1',
        productId: 'product-8',
        productName: '아누아 365 토너',
        productImage:
          'https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0021/A00000021315370ko.jpg?l=ko',
        option: '아누아 365 토너 500ml',
        quantity: 1,
        price: 12600,
        canWriteReview: true,
        hasReview: false,
      },
    ],
    canRefund: false, // 환불 기간 만료
    canTrackDelivery: true,
    deliveryStatus: 'delivered',
    refundDeadline: new Date('2025-05-14'), // 이미 지난 날짜
  },

  // 7. 진행중인 공구 - 리워드 달성률 매우 낮음 (20% 미만)
  {
    id: '7',
    orderNumber: '202512130007',
    orderDate: new Date('2025-06-13'),
    status: 'in_progress',
    progressRate: 8, // 20% 미만으로 리워드 뱃지 없음
    totalAmount: 45600,
    shippingFee: 0,
    items: [
      {
        id: '7-1',
        productId: 'product-9',
        productName: '에이지20스 에센스',
        productImage:
          'https://image.oliveyoung.co.kr/uploads/images/goods/550/10/0000/0021/A00000021315371ko.jpg?l=ko',
        option: '에이지20스 에센스 50ml',
        quantity: 1,
        price: 45600,
        canWriteReview: false,
        hasReview: false,
      },
    ],
    canRefund: true,
    canTrackDelivery: true,
    deliveryStatus: 'preparing',
    refundDeadline: new Date('2025-07-13'), // 30일 후
  },

  // 8. 환불 요청 중인 주문 - 20% 할인 달성
  {
    id: '9',
    orderNumber: '202512110009',
    orderDate: new Date('2025-06-11'),
    status: 'refund_pending',
    progressRate: 30, // 20% 이상으로 20% 할인 달성
    totalAmount: 67800,
    shippingFee: 0,
    items: [
      {
        id: '9-1',
        productId: 'product-11',
        productName: '닥터지 레드 블레미쉬 클리어 수딩 크림',
        productImage:
          'https://image.oliveyoung.co.kr/uploads/images/goods/550/10/0000/0021/A00000021315372ko.jpg?l=ko',
        option: '닥터지 레드 블레미쉬 클리어 수딩 크림 50ml',
        quantity: 1,
        price: 67800,
        canWriteReview: true,
        hasReview: false,
      },
    ],
    canRefund: false, // 환불 요청 중이므로 취소 불가
    canTrackDelivery: true,
    deliveryStatus: 'delivered',
    refundDeadline: new Date('2025-07-11'), // 30일 후
    refundRequestDate: new Date('2025-06-20'), // 배송 완료 후 9일째 환불 신청
    refundReason: '상품이 기대와 달라서 환불 신청합니다.',
    refundType: 'CHANGE_OF_MIND',
  },

  // 9. 실패한 주문 (취소/환불 내역으로 이동)
  {
    id: '8',
    orderNumber: '202512120008',
    orderDate: new Date('2025-06-12'),
    status: 'failed',
    progressRate: 0,
    totalAmount: 67800,
    shippingFee: 0,
    items: [
      {
        id: '8-1',
        productId: 'product-10',
        productName: '닥터지 레드 블레미쉬 클리어 수딩 크림',
        productImage:
          'https://image.oliveyoung.co.kr/uploads/images/goods/550/10/0000/0021/A00000021315372ko.jpg?l=ko',
        option: '닥터지 레드 블레미쉬 클리어 수딩 크림 50ml',
        quantity: 1,
        price: 67800,
        canWriteReview: false,
        hasReview: false,
      },
    ],
    canRefund: true,
    canTrackDelivery: false,
    deliveryStatus: 'preparing',
    refundDeadline: new Date('2025-07-12'), // 30일 후
  },
];
