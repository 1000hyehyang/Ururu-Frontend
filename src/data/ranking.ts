import type { Product } from '@/types/product';
import { CategoryOption } from '@/components/ranking';

// 카테고리 옵션
export const rankingCategories: CategoryOption[] = [
  { value: 'all', label: '전체' },
  { value: 'skincare', label: '스킨케어' },
  { value: 'mask', label: '마스크팩' },
  { value: 'cleansing', label: '클렌징' },
  { value: 'suncare', label: '선케어' },
  { value: 'makeup', label: '메이크업' },
  { value: 'perfume', label: '향수' },
  { value: 'haircare', label: '헤어케어' },
  { value: 'bodycare', label: '바디케어' },
];

// 중앙 집중식 상품 저장소
const ALL_PRODUCTS: Record<string, Product> = {
  '1': {
    id: '1',
    name: '[7월올영픽/산리오캐릭터즈] 롬앤 더 쥬시 래스팅 틴트 (+쉐이킹키링증정)',
    mainImage:
      'https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0021/A00000021315370ko.jpg?l=ko',
    thumbnails: [],
    detailImages: [],
    price: 7500,
    originalPrice: 13000,
    discountRate: 42,
    point: 225,
    participants: 597,
    targetParticipants: 1000,
    remainingDays: 3,
    category: { main: 'makeup', sub: 'lip' },
    shippingInfo: {
      type: '우르르 배송 상품',
      description: '공구 마감 후 평균 4일 이내 배송',
      shippingFee: '기본 배송비 3,000원',
    },
    rewardTiers: [],
    options: [],
  },
  '2': {
    id: '2',
    name: '[올영단독] 토리든 다이브인 저분자 히알루론산 세럼 100ml',
    mainImage:
      'https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0021/A00000021315371ko.jpg?l=ko',
    thumbnails: [],
    detailImages: [],
    price: 15000,
    originalPrice: 25000,
    discountRate: 40,
    point: 450,
    participants: 823,
    targetParticipants: 1000,
    remainingDays: 5,
    category: { main: 'skincare', sub: 'serum' },
    shippingInfo: {
      type: '우르르 배송 상품',
      description: '공구 마감 후 평균 4일 이내 배송',
      shippingFee: '기본 배송비 3,000원',
    },
    rewardTiers: [],
    options: [],
  },
  '3': {
    id: '3',
    name: '[올영단독] 닥터벨머 아쿠아 콜라겐 마스크팩 10매',
    mainImage:
      'https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0021/A00000021315372ko.jpg?l=ko',
    thumbnails: [],
    detailImages: [],
    price: 12000,
    originalPrice: 20000,
    discountRate: 40,
    point: 360,
    participants: 456,
    targetParticipants: 800,
    remainingDays: 7,
    category: { main: 'mask', sub: 'sheet' },
    shippingInfo: {
      type: '우르르 배송 상품',
      description: '공구 마감 후 평균 4일 이내 배송',
      shippingFee: '기본 배송비 3,000원',
    },
    rewardTiers: [],
    options: [],
  },
  '4': {
    id: '4',
    name: '[올영단독] 바닐라코 클리어 시카 클렌징 폼 150ml',
    mainImage:
      'https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/options/item/2025/6/7642808485052705032.jpg',
    thumbnails: [],
    detailImages: [],
    price: 8000,
    originalPrice: 16000,
    discountRate: 50,
    point: 240,
    participants: 342,
    targetParticipants: 600,
    remainingDays: 4,
    category: { main: 'cleansing', sub: 'foam' },
    shippingInfo: {
      type: '우르르 배송 상품',
      description: '공구 마감 후 평균 4일 이내 배송',
      shippingFee: '기본 배송비 3,000원',
    },
    rewardTiers: [],
    options: [],
  },
  '5': {
    id: '5',
    name: '[올영단독] 쏘내추럴 선크림 SPF50+ PA++++ 50ml',
    mainImage:
      'https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/options/item/2025/6/7839022337601283246.jpg',
    thumbnails: [],
    detailImages: [],
    price: 18000,
    originalPrice: 30000,
    discountRate: 40,
    point: 540,
    participants: 678,
    targetParticipants: 1000,
    remainingDays: 6,
    category: { main: 'suncare', sub: 'sunscreen' },
    shippingInfo: {
      type: '우르르 배송 상품',
      description: '공구 마감 후 평균 4일 이내 배송',
      shippingFee: '기본 배송비 3,000원',
    },
    rewardTiers: [],
    options: [],
  },
  '6': {
    id: '6',
    name: '[올영단독] 메디힐 더마 솔루션 프로바이오틱 마스크팩 10매',
    mainImage:
      'https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/options/item/2025/6/4453299188002602854.jpg',
    thumbnails: [],
    detailImages: [],
    price: 14000,
    originalPrice: 22000,
    discountRate: 36,
    point: 420,
    participants: 234,
    targetParticipants: 500,
    remainingDays: 8,
    category: { main: 'mask', sub: 'sheet' },
    shippingInfo: {
      type: '우르르 배송 상품',
      description: '공구 마감 후 평균 4일 이내 배송',
      shippingFee: '기본 배송비 3,000원',
    },
    rewardTiers: [],
    options: [],
  },
  '7': {
    id: '7',
    name: '[올영단독] 셀리맥스 더마토랩 세라마이드 100 50ml',
    mainImage:
      'https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0021/A00000021315370ko.jpg?l=ko',
    thumbnails: [],
    detailImages: [],
    price: 20000,
    originalPrice: 35000,
    discountRate: 43,
    point: 600,
    participants: 567,
    targetParticipants: 800,
    remainingDays: 4,
    category: { main: 'skincare', sub: 'cream' },
    shippingInfo: {
      type: '우르르 배송 상품',
      description: '공구 마감 후 평균 4일 이내 배송',
      shippingFee: '기본 배송비 3,000원',
    },
    rewardTiers: [],
    options: [],
  },
  '8': {
    id: '8',
    name: '[올영단독] 클리오 킬커버 파운데이션 30ml',
    mainImage:
      'https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0021/A00000021315371ko.jpg?l=ko',
    thumbnails: [],
    detailImages: [],
    price: 25000,
    originalPrice: 40000,
    discountRate: 38,
    point: 750,
    participants: 234,
    targetParticipants: 500,
    remainingDays: 6,
    category: { main: 'makeup', sub: 'base' },
    shippingInfo: {
      type: '우르르 배송 상품',
      description: '공구 마감 후 평균 4일 이내 배송',
      shippingFee: '기본 배송비 3,000원',
    },
    rewardTiers: [],
    options: [],
  },
};

// 카테고리별 상품 ID 매핑
const CATEGORY_PRODUCT_MAP: Record<string, string[]> = {
  all: ['1', '2', '3', '4', '5', '6'],
  skincare: ['2', '7'],
  makeup: ['1', '8'],
  mask: ['3', '6'],
  cleansing: ['4'],
  suncare: ['5'],
  perfume: [],
  haircare: [],
  bodycare: [],
};

// 랭킹 상품 데이터를 랭킹 순서로 변환하는 함수
export const getRankingProducts = (category: string) => {
  const productIds = CATEGORY_PRODUCT_MAP[category] || CATEGORY_PRODUCT_MAP.all;
  return productIds.map((id, index) => ({
    product: ALL_PRODUCTS[id],
    rank: index + 1,
  }));
};
