// 상품정보 제공고시 mock 데이터
import {
  PRODUCT_INGREDIENTS,
  PRODUCT_CAUTIONS,
  EXCHANGE_REFUND_COSTS,
  EXCHANGE_REFUND_RESTRICTIONS,
} from './product-info-texts';

export const productInfoNoticeRows = [
  { label: '내용물의 용량 또는 중량', value: '3.5g' },
  { label: '제품 주요 사양', value: '모든 피부 타입' },
  { label: '사용기한(또는 개봉 후 사용기간)', value: '제조일로부터 36개월 / 개봉 후 12개월' },
  {
    label: '사용방법',
    value: '입술 안쪽부터 바깥쪽까지 자연스럽게 채우듯 발라줍니다.',
  },
  {
    label: '화장품제조업자, 화장품책임판매업자 및 화장품 판매업자',
    value: '(주)코스맥스/(주)아이패밀리sc',
  },
  { label: '제조국', value: '대한민국' },
  {
    label: '화장품법에 따라 기재해야 하는 모든 성분',
    value: PRODUCT_INGREDIENTS,
  },
  { label: '기능성 화장품 식품의약품안전처 심사필 여부', value: '해당사항 없음' },
  {
    label: '사용할 때의 주의사항',
    value: PRODUCT_CAUTIONS,
  },
  {
    label: '품질보증기준',
    value: '본 제품에 이상이 있을 경우 공정거래위원회 고시에 의거 보상해 드립니다.',
  },
  { label: '소비자상담 전화번호', value: '1670-2238' },
];

// 교환/반품/환불 안내 mock 데이터
export const exchangeRefundNoticeRows = [
  {
    label: '교환/반품 신청 방법',
    value: '마이페이지 내 주문내역에서 신청가능하며,반품 신청의 경우 택배회수로신청가능합니다.',
  },
  {
    label: '교환/반품 신청 기간',
    value:
      '교환, 반품 신청은 배송이 완료된 후 7일 이내 가능합니다.고객님이 배송 받으신 상품의 내용이 표시∙광고의 내용과 다르거나 계약내용과 다르게 이행된 경우에는 배송 받으신 날로부터 30일 이내에 가능합니다.',
  },
  {
    label: '교환/반품/회수 비용',
    value: EXCHANGE_REFUND_COSTS,
  },
  {
    label: '교환/반품 불가 안내',
    value: EXCHANGE_REFUND_RESTRICTIONS,
  },
];
