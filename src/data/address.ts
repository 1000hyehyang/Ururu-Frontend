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
  // 추가 배송지 예시 데이터 필요시 여기에 추가
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
  // 추가 배송지 예시 데이터 필요시 여기에 추가
};
