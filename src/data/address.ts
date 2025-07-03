// 배송지 관련 타입 정의
export interface AddressData {
  id: number;
  addressName: string;
  isDefault: boolean;
  phone: string;
  zipcode: string;
  addressRoad: string;
  addressJibun: string;
  addressDetail: string;
}

// 배송지 목록 mock 데이터
export const addressListData: AddressData[] = [
  {
    id: 1,
    addressName: '아파트',
    isDefault: true,
    zipcode: '06627',
    addressRoad: '서울특별시 서초구 강남대로 327, 2층 (서초동, 대륭서초타워)',
    addressJibun: '서울특별시 서초구 서초동 1337-20, 대륭서초타워 2층',
    phone: '010-0000-0000',
    addressDetail: '',
  },
  {
    id: 2,
    addressName: '회사',
    isDefault: false,
    zipcode: '06123',
    addressRoad: '서울특별시 강남구 테헤란로 501, 3층 (삼성동, 브이플렉스)',
    addressJibun: '서울특별시 강남구 삼성동 159-1, 브이플렉스 3층',
    phone: '010-1234-5678',
    addressDetail: '개발팀',
  },
  {
    id: 3,
    addressName: '우리집',
    isDefault: false,
    zipcode: '13529',
    addressRoad: '경기도 성남시 분당구 판교로 242, 판교디지털센터 A동 3층',
    addressJibun: '경기도 성남시 분당구 삼평동 681, 판교디지털센터 A동 3층',
    phone: '010-9876-5432',
    addressDetail: '',
  },
];

// 배송지 수정용 mock 데이터 (ID별)
export const mockAddressData: Record<number, AddressData> = {
  1: {
    id: 1,
    addressName: '아파트',
    isDefault: true,
    phone: '010-0000-0000',
    zipcode: '06627',
    addressRoad: '서울특별시 서초구 강남대로 327, 2층 (서초동, 대륭서초타워)',
    addressJibun: '서울특별시 서초구 서초동 1337-20, 대륭서초타워 2층',
    addressDetail: '',
  },
  2: {
    id: 2,
    addressName: '회사',
    isDefault: false,
    phone: '010-1234-5678',
    zipcode: '06123',
    addressRoad: '서울특별시 강남구 테헤란로 501, 3층 (삼성동, 브이플렉스)',
    addressJibun: '서울특별시 강남구 삼성동 159-1, 브이플렉스 3층',
    addressDetail: '개발팀',
  },
  3: {
    id: 3,
    addressName: '우리집',
    isDefault: false,
    phone: '010-9876-5432',
    zipcode: '13529',
    addressRoad: '경기도 성남시 분당구 판교로 242, 판교디지털센터 A동 3층',
    addressJibun: '경기도 성남시 분당구 삼평동 681, 판교디지털센터 A3층',
    addressDetail: '',
  },
};
