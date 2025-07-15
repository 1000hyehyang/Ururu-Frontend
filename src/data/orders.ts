import { Order } from '@/types/order';

// 목업 주문 데이터
export const mockOrders: Order[] = [
  // 1. 진행중인 공구
  {
    id: '1',
    orderNumber: '202512180001',
    orderDate: new Date('2025-06-19'),
    status: 'in_progress',
    progressRate: 40,
    totalAmount: 67200,
    shippingFee: 0,
    items: [
      {
        id: '1',
        productId: '1',
        productName: '메디힐 샤론 앰플 마스크',
        productImage: '/images/product1.jpg',
        option: '10매',
        quantity: 1,
        price: 67200,
        canWriteReview: false,
        hasReview: false,
      },
    ],
    canRefund: true,
    canRefundOthers: false,
    canTrackDelivery: true,
    isGroupBuy: true,
    deliveryStatus: 'preparing',
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
        id: '2',
        productId: '2',
        productName: '라네즈 워터 뱅크 블루 하이알루로닉 크림',
        productImage: '/images/product2.jpg',
        option: '50ml',
        quantity: 1,
        price: 45600,
        canWriteReview: true,
        hasReview: false,
      },
      {
        id: '3',
        productId: '3',
        productName: '설화수 자음생 크림',
        productImage: '/images/product3.jpg',
        option: '60ml',
        quantity: 2,
        price: 89000,
        canWriteReview: true,
        hasReview: true,
        reviewId: 'review-1',
      },
    ],
    canRefund: true,
    canRefundOthers: false,
    canTrackDelivery: true,
    isGroupBuy: true,
    deliveryStatus: 'delivered',
  },

  // 3. 확정된 공구 - 40% 할인 달성, 배송 완료
  {
    id: '3',
    orderNumber: '202512180003',
    orderDate: new Date('2025-06-17'),
    status: 'confirmed',
    progressRate: 50, // 40% 이상으로 40% 할인 달성
    totalAmount: 12800,
    shippingFee: 0,
    items: [
      {
        id: '4',
        productId: '4',
        productName: '토니앤가이 스타일링 젤',
        productImage: '/images/product4.jpg',
        option: '150ml',
        quantity: 1,
        price: 12800,
        canWriteReview: true,
        hasReview: false,
      },
    ],
    canRefund: true,
    canRefundOthers: false,
    canTrackDelivery: true,
    isGroupBuy: true,
    deliveryStatus: 'completed',
  },

  // 4. 진행중인 공구 (배송 중)
  {
    id: '4',
    orderNumber: '202512180004',
    orderDate: new Date('2025-06-16'),
    status: 'in_progress',
    progressRate: 25,
    totalAmount: 28000,
    shippingFee: 0,
    items: [
      {
        id: '5',
        productId: '5',
        productName: '바이오힐 더마 토너',
        productImage: '/images/product5.jpg',
        option: '200ml',
        quantity: 1,
        price: 28000,
        canWriteReview: false,
        hasReview: false,
      },
    ],
    canRefund: true,
    canRefundOthers: false,
    canTrackDelivery: true,
    isGroupBuy: true,
    deliveryStatus: 'shipping',
    trackingNumber: '123456789',
  },

  // 5. 진행중인 공구 (운송장 없음)
  {
    id: '5',
    orderNumber: '202512180005',
    orderDate: new Date('2025-06-15'),
    status: 'in_progress',
    progressRate: 30,
    totalAmount: 45000,
    shippingFee: 0,
    items: [
      {
        id: '6',
        productId: '6',
        productName: '헤라 블랙 쿠션',
        productImage: '/images/product6.jpg',
        option: '15g',
        quantity: 1,
        price: 45000,
        canWriteReview: false,
        hasReview: false,
      },
    ],
    canRefund: true,
    canRefundOthers: false,
    canTrackDelivery: false,
    isGroupBuy: true,
    deliveryStatus: 'preparing',
  },

  // 6. 확정된 공구 - 20% 할인 달성 (일반 상품)
  {
    id: '6',
    orderNumber: '202512180006',
    orderDate: new Date('2025-05-14'),
    status: 'confirmed',
    progressRate: 25, // 20% 이상으로 20% 할인 달성
    totalAmount: 18900,
    shippingFee: 0,
    items: [
      {
        id: '7',
        productId: '7',
        productName: '닥터지 레드 블레미쉬 클리어 수딩 크림',
        productImage: '/images/product7.jpg',
        option: '70ml',
        quantity: 1,
        price: 18900,
        canWriteReview: true,
        hasReview: false,
      },
    ],
    canRefund: false, // 환불 불가
    canRefundOthers: false,
    canTrackDelivery: true,
    isGroupBuy: false, // 일반 상품
    deliveryStatus: 'delivered',
  },

  // 7. 확정된 공구 - 할인 달성 못함
  {
    id: '7',
    orderNumber: '202512180007',
    orderDate: new Date('2025-06-13'),
    status: 'confirmed',
    progressRate: 15, // 20% 미만으로 할인 달성 실패
    totalAmount: 32000,
    shippingFee: 0,
    items: [
      {
        id: '8',
        productId: '8',
        productName: '더 오디너리 하이알루로닉 애시드',
        productImage: '/images/product8.jpg',
        option: '30ml',
        quantity: 1,
        price: 32000,
        canWriteReview: true,
        hasReview: false,
      },
    ],
    canRefund: true,
    canRefundOthers: false,
    canTrackDelivery: true,
    isGroupBuy: true,
    deliveryStatus: 'delivered',
  },

  // 8. 진행중인 공구 (높은 할인율)
  {
    id: '8',
    orderNumber: '202512180008',
    orderDate: new Date('2025-06-11'),
    status: 'in_progress',
    progressRate: 80, // 높은 할인율
    totalAmount: 75000,
    shippingFee: 0,
    items: [
      {
        id: '9',
        productId: '9',
        productName: '에스티로더 어드밴스드 나이트 리페어',
        productImage: '/images/product9.jpg',
        option: '50ml',
        quantity: 1,
        price: 75000,
        canWriteReview: false,
        hasReview: false,
      },
    ],
    canRefund: true,
    canRefundOthers: false,
    canTrackDelivery: true,
    isGroupBuy: true,
    deliveryStatus: 'preparing',
  },

  // 9. 환불 대기중인 주문
  {
    id: '9',
    orderNumber: '202512180009',
    orderDate: new Date('2025-06-12'),
    status: 'refund_pending',
    progressRate: 0,
    totalAmount: 25000,
    shippingFee: 0,
    items: [
      {
        id: '10',
        productId: '10',
        productName: '이니스프리 그린티 시드 세럼',
        productImage: '/images/product10.jpg',
        option: '80ml',
        quantity: 1,
        price: 25000,
        canWriteReview: false,
        hasReview: false,
      },
    ],
    canRefund: false, // 이미 환불 진행중
    canRefundOthers: false,
    canTrackDelivery: true,
    isGroupBuy: true,
    deliveryStatus: 'preparing',
    refundReason: '단순 변심으로 인한 환불 요청',
    refundType: 'CHANGE_OF_MIND',
  },
];

// 주문 상태별 개수
export const orderStatusSummary = {
  inProgress: 4,
  confirmed: 4,
  refundPending: 1,
};
