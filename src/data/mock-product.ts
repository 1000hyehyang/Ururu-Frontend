// 상품 상세 mock 데이터 예시
import type { Product } from '@/types/product';

export type { Product };

// 기본 이미지 URL (빈 배열일 때 사용)
export const DEFAULT_PRODUCT_IMAGE = '/placeholder-product.jpg';

export const mockProductData: Product = {
  id: '1',
  name: '[7월올영픽/산리오캐릭터즈] 롬앤 더 쥬시 래스팅 틴트 (+쉐이킹키링증정) 단품/기획',
  mainImage:
    'https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0021/A00000021315370ko.jpg?l=ko',
  thumbnails: [
    'https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0021/A00000021315371ko.jpg?l=ko',
    'https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0021/A00000021315372ko.jpg?l=ko',
    'https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/options/item/2025/6/7642808485052705032.jpg',
    'https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/options/item/2025/6/7839022337601283246.jpg',
    'https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/options/item/2025/6/4453299188002602854.jpg',
  ],
  detailImages: [
    'https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/html/crop/A000000213153/202507021050/crop0/image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/html/attached/2025/07/01/e43_01002920.jpg?created=202507021050',
    'https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/html/crop/A000000213153/202507021050/crop1/image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/html/attached/2025/07/01/e43_01002920.jpg?created=202507021050',
    'https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/html/crop/A000000213153/202507021050/crop2/image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/html/attached/2025/07/01/e43_01002920.jpg?created=202507021050',
  ],
  price: 7500,
  originalPrice: 13000,
  discountRate: 42,
  point: 225,
  participants: 597,
  targetParticipants: 1000,
  remainingDays: 3,
  category: {
    main: 'makeup',
    sub: 'lip',
  },
  shippingInfo: {
    type: '우르르 배송 상품',
    description: '공구 마감 후 평균 4일 이내 배송',
    shippingFee: '기본 배송비 3,000원',
  },
  rewardTiers: [
    { participants: 300, discount: '20% 할인', achieved: true },
    { participants: 500, discount: '42% 할인', achieved: true },
    { participants: 1000, discount: '70% 할인', achieved: false },
  ],
  options: [
    {
      id: 'option1',
      name: '[태닝 시나모롤]03 베어 그레이프 기획',
      price: 0,
      image: null,
      fullIngredients: '',
    },
    {
      id: 'option2',
      name: '[태닝 포차코] 23 피치 피치 미 기획',
      price: 0,
      image: null,
      fullIngredients: '',
    },
    {
      id: 'option3',
      name: '[NEW태닝 포차코] 31 탠드 코코 ',
      price: 0,
      image: null,
      fullIngredients: '',
    },
    {
      id: 'option4',
      name: '[NEW태닝 시나모롤]32태니구아바 기획',
      price: 0,
      image: null,
      fullIngredients: '',
    },
    {
      id: 'option5',
      name: '[NEW태닝 포차코] 33 알로하 쥬시 ',
      price: 0,
      image: null,
      fullIngredients: '',
    },
  ],
};
