export interface CategoryItem {
  title: string;
  subItems: SubCategoryItem[];
}

export interface SubCategoryItem {
  title: string;
}

export const categoryItems: CategoryItem[] = [
  {
    title: '스킨케어',
    subItems: [
      { title: '스킨/토너' },
      { title: '에센스/세럼/앰플' },
      { title: '크림' },
      { title: '로션' },
      { title: '미스트/오일' },
      { title: '스킨케어세트' },
      { title: '스킨케어 디바이스' },
    ],
  },
  {
    title: '마스크팩',
    subItems: [
      { title: '시트팩' },
      { title: '패드' },
      { title: '페이셜팩' },
      { title: '코팩' },
      { title: '패치' },
    ],
  },
  {
    title: '클렌징',
    subItems: [
      { title: '클렌징폼/젤' },
      { title: '오일/밤' },
      { title: '워터/밀크' },
      { title: '필링&스크럽' },
      { title: '티슈/패드' },
      { title: '립&아이리무버' },
      { title: '클렌징 디바이스' },
    ],
  },
  {
    title: '선케어',
    subItems: [
      { title: '선크림' },
      { title: '선스틱' },
      { title: '선쿠션' },
      { title: '선스프레이/선패치' },
      { title: '태닝/애프터선' },
    ],
  },
  {
    title: '메이크업',
    subItems: [{ title: '립메이크업' }, { title: '베이스메이크업' }, { title: '아이메이크업' }],
  },
  {
    title: '향수',
    subItems: [
      { title: '액체향수' },
      { title: '고체향수' },
      { title: '바디퍼퓸' },
      { title: '헤어퍼퓸' },
    ],
  },
  {
    title: '헤어케어',
    subItems: [
      { title: '샴푸/린스' },
      { title: '트리트먼트/팩' },
      { title: '두피앰플/토닉' },
      { title: '헤어에센스' },
      { title: '염색약/펌' },
      { title: '헤어기기/브러시' },
      { title: '스타일링' },
    ],
  },
  {
    title: '바디케어',
    subItems: [
      { title: '샤워/입욕' },
      { title: '로션/오일/미스트' },
      { title: '핸드케어' },
      { title: '풋케어' },
      { title: '제모/왁싱' },
      { title: '데오드란트' },
      { title: '베이비' },
    ],
  },
];
