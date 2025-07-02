// 카테고리별 리뷰 옵션 타입 정의
export interface ReviewOption {
  id: number;
  categoryId: number;
  code: string;
  label: string;
}

export interface CategoryReviewOptions {
  categoryId: number;
  categoryName: string;
  attributes: {
    name: string;
    options: ReviewOption[];
  }[];
}

// 카테고리별 리뷰 옵션 데이터
export const categoryReviewOptions: CategoryReviewOptions[] = [
  {
    categoryId: 1,
    categoryName: '스킨케어',
    attributes: [
      {
        name: '보습력',
        options: [
          { id: 101, categoryId: 1, code: 'moisturizing_high', label: '촉촉함이 오래가요' },
          { id: 102, categoryId: 1, code: 'moisturizing_medium', label: '무난해요' },
          { id: 103, categoryId: 1, code: 'moisturizing_low', label: '건조함이 느껴져요' },
        ],
      },
      {
        name: '진정',
        options: [
          { id: 110, categoryId: 1, code: 'soothing_good', label: '피부 진정에 좋아요' },
          { id: 111, categoryId: 1, code: 'soothing_neutral', label: '무난해요' },
          { id: 112, categoryId: 1, code: 'soothing_bad', label: '진정 효과가 없어요' },
        ],
      },
      {
        name: '자극도',
        options: [
          { id: 113, categoryId: 1, code: 'non_irritating', label: '자극 없이 순해요' },
          { id: 114, categoryId: 1, code: 'mildly_irritating', label: '무난해요' },
          { id: 115, categoryId: 1, code: 'highly_irritating', label: '자극적이에요' },
        ],
      },
    ],
  },
  {
    categoryId: 15,
    categoryName: '마스크팩',
    attributes: [
      {
        name: '보습력',
        options: [
          { id: 101, categoryId: 15, code: 'moisturizing_high', label: '촉촉함이 오래가요' },
          { id: 102, categoryId: 15, code: 'moisturizing_medium', label: '무난해요' },
          { id: 103, categoryId: 15, code: 'moisturizing_low', label: '건조함이 느껴져요' },
        ],
      },
      {
        name: '밀착력',
        options: [
          { id: 104, categoryId: 15, code: 'refreshing_high', label: '산뜻해요' },
          { id: 105, categoryId: 15, code: 'refreshing_medium', label: '무난해요' },
          { id: 106, categoryId: 15, code: 'refreshing_low', label: '무겁고 끈적여요' },
        ],
      },
      {
        name: '진정',
        options: [
          { id: 110, categoryId: 15, code: 'soothing_good', label: '피부 진정에 좋아요' },
          { id: 111, categoryId: 15, code: 'soothing_neutral', label: '무난해요' },
          { id: 112, categoryId: 15, code: 'soothing_bad', label: '진정 효과가 없어요' },
        ],
      },
    ],
  },
  {
    categoryId: 25,
    categoryName: '클렌징',
    attributes: [
      {
        name: '세정력',
        options: [
          { id: 116, categoryId: 25, code: 'cleansing_strong', label: '세정력이 뛰어나요' },
          { id: 117, categoryId: 25, code: 'cleansing_medium', label: '보통이에요' },
          { id: 118, categoryId: 25, code: 'cleansing_weak', label: '세정력이 약해요' },
        ],
      },
      {
        name: '자극도',
        options: [
          { id: 113, categoryId: 25, code: 'non_irritating', label: '자극 없이 순해요' },
          { id: 114, categoryId: 25, code: 'mildly_irritating', label: '무난해요' },
          { id: 115, categoryId: 25, code: 'highly_irritating', label: '자극적이에요' },
        ],
      },
      {
        name: '잔여감',
        options: [
          { id: 119, categoryId: 25, code: 'residue_none', label: '잔여감이 없어요' },
          { id: 120, categoryId: 25, code: 'residue_some', label: '잔여감이 조금 있어' },
          { id: 121, categoryId: 25, code: 'residue_heavy', label: '잔여감이 심해요' },
        ],
      },
    ],
  },
  {
    categoryId: 43,
    categoryName: '선케어',
    attributes: [
      {
        name: '자외선 차단력',
        options: [
          { id: 122, categoryId: 43, code: 'uv_protection_high', label: '차단력이 강해요' },
          { id: 123, categoryId: 43, code: 'uv_protection_medium', label: '무난해' },
          { id: 124, categoryId: 43, code: 'uv_protection_low', label: '차단이 약해요' },
        ],
      },
      {
        name: '산뜻함',
        options: [
          { id: 104, categoryId: 43, code: 'refreshing_high', label: '산뜻해요' },
          { id: 105, categoryId: 43, code: 'refreshing_medium', label: '무난해요' },
          { id: 106, categoryId: 43, code: 'refreshing_low', label: '무겁고 끈적여요' },
        ],
      },
      {
        name: '지속력',
        options: [
          { id: 125, categoryId: 43, code: 'long_lasting', label: '오래 유지돼요' },
          { id: 126, categoryId: 43, code: 'medium_lasting', label: '무난해요' },
          { id: 127, categoryId: 43, code: 'short_lasting', label: '금방 사라져요' },
        ],
      },
    ],
  },
  {
    categoryId: 55,
    categoryName: '메이크업',
    attributes: [
      {
        name: '발색력',
        options: [
          { id: 128, categoryId: 55, code: 'vivid_color', label: '발색력이 좋아요' },
          { id: 129, categoryId: 55, code: 'moderate_color', label: '무난해' },
          { id: 130, categoryId: 55, code: 'dull_color', label: '발색이 약해요' },
        ],
      },
      {
        name: '지속력',
        options: [
          { id: 125, categoryId: 55, code: 'long_lasting', label: '오래 유지돼요' },
          { id: 126, categoryId: 55, code: 'medium_lasting', label: '무난해요' },
          { id: 127, categoryId: 55, code: 'short_lasting', label: '금방 사라져요' },
        ],
      },
      {
        name: '발림성',
        options: [
          { id: 131, categoryId: 55, code: 'smooth_application', label: '부드럽게 발려요' },
          { id: 132, categoryId: 55, code: 'normal_application', label: '무난해요' },
          { id: 133, categoryId: 55, code: 'rough_application', label: '뻑뻑해요' },
        ],
      },
    ],
  },
  {
    categoryId: 81,
    categoryName: '향수',
    attributes: [
      {
        name: '향 지속력',
        options: [
          { id: 134, categoryId: 81, code: 'scent_long', label: '향이 오래가요' },
          { id: 135, categoryId: 81, code: 'scent_medium', label: '무난해요' },
          { id: 136, categoryId: 81, code: 'scent_short', label: '향이 금방 사라져요' },
        ],
      },
      {
        name: '향 강도',
        options: [
          { id: 137, categoryId: 81, code: 'scent_strong', label: '향이 진해요' },
          { id: 138, categoryId: 81, code: 'scent_moderate', label: '향이 은은해요' },
          { id: 139, categoryId: 81, code: 'scent_weak', label: '향이 약해요' },
        ],
      },
      {
        name: '향 종류',
        options: [
          { id: 140, categoryId: 81, code: 'scalp_soothing_good', label: '두피 진정에 좋아요' },
          { id: 141, categoryId: 81, code: 'scalp_soothing_neutral', label: '자극 없이 무난해요' },
          { id: 142, categoryId: 81, code: 'scalp_soothing_bad', label: '두피가 자극 받아요' },
        ],
      },
    ],
  },
  {
    categoryId: 86,
    categoryName: '헤어케어',
    attributes: [
      {
        name: '두피 진정',
        options: [
          { id: 140, categoryId: 86, code: 'scalp_soothing_good', label: '두피 진정에 좋아요' },
          { id: 141, categoryId: 86, code: 'scalp_soothing_neutral', label: '자극 없이 무난해요' },
          { id: 142, categoryId: 86, code: 'scalp_soothing_bad', label: '두피가 자극 받아요' },
        ],
      },
      {
        name: '윤기',
        options: [
          { id: 143, categoryId: 86, code: 'hair_shiny', label: '머릿결이 반짝여요' },
          { id: 144, categoryId: 86, code: 'hair_normal', label: '무난해요' },
          { id: 145, categoryId: 86, code: 'hair_dull', label: '푸석해 보여요' },
        ],
      },
      {
        name: '손상 개선',
        options: [
          { id: 146, categoryId: 86, code: 'damage_repair_good', label: '손상 케어에 좋아요' },
          { id: 147, categoryId: 86, code: 'damage_repair_normal', label: '무난해요' },
          { id: 148, categoryId: 86, code: 'damage_repair_bad', label: '효과가 없어요' },
        ],
      },
    ],
  },
  {
    categoryId: 113,
    categoryName: '바디케어',
    attributes: [
      {
        name: '보습력',
        options: [
          { id: 101, categoryId: 113, code: 'moisturizing_high', label: '촉촉함이 오래가요' },
          { id: 102, categoryId: 113, code: 'moisturizing_medium', label: '무난해요' },
          { id: 103, categoryId: 113, code: 'moisturizing_low', label: '건조함이 느껴져요' },
        ],
      },
      {
        name: '산뜻함',
        options: [
          { id: 104, categoryId: 113, code: 'refreshing_high', label: '산뜻해요' },
          { id: 105, categoryId: 113, code: 'refreshing_medium', label: '무난해요' },
          { id: 106, categoryId: 113, code: 'refreshing_low', label: '무겁고 끈적여요' },
        ],
      },
      {
        name: '자극도',
        options: [
          { id: 113, categoryId: 113, code: 'non_irritating', label: '자극 없이 순해요' },
          { id: 114, categoryId: 113, code: 'mildly_irritating', label: '무난해요' },
          { id: 115, categoryId: 113, code: 'highly_irritating', label: '자극적이에요' },
        ],
      },
    ],
  },
  {
    categoryId: 132,
    categoryName: '제모/왁싱',
    attributes: [
      {
        name: '제모력',
        options: [
          { id: 149, categoryId: 132, code: 'hair_removal_strong', label: '제모력이 뛰어나요' },
          { id: 150, categoryId: 132, code: 'hair_removal_normal', label: '무난해요' },
          { id: 151, categoryId: 132, code: 'hair_removal_weak', label: '제모력이 약해요' },
        ],
      },
      {
        name: '자극도',
        options: [
          { id: 113, categoryId: 132, code: 'non_irritating', label: '자극 없이 순해요' },
          { id: 114, categoryId: 132, code: 'mildly_irritating', label: '무난해요' },
          { id: 115, categoryId: 132, code: 'highly_irritating', label: '자극적이에요' },
        ],
      },
      {
        name: '사용 편의성',
        options: [
          { id: 152, categoryId: 132, code: 'easy_to_use', label: '사용하기 편해요' },
          { id: 153, categoryId: 132, code: 'normal_use', label: '무난해요' },
          { id: 154, categoryId: 132, code: 'hard_to_use', label: '사용하기 어려워요' },
        ],
      },
    ],
  },
  {
    categoryId: 138,
    categoryName: '데오드란트',
    attributes: [
      {
        name: '지속력',
        options: [
          { id: 125, categoryId: 138, code: 'long_lasting', label: '오래 유지돼요' },
          { id: 126, categoryId: 138, code: 'medium_lasting', label: '무난해요' },
          { id: 127, categoryId: 138, code: 'short_lasting', label: '금방 사라져요' },
        ],
      },
      {
        name: '산뜻함',
        options: [
          { id: 104, categoryId: 138, code: 'refreshing_high', label: '산뜻해요' },
          { id: 105, categoryId: 138, code: 'refreshing_medium', label: '무난해요' },
          { id: 106, categoryId: 138, code: 'refreshing_low', label: '무겁고 끈적여요' },
        ],
      },
      {
        name: '자극도',
        options: [
          { id: 113, categoryId: 138, code: 'non_irritating', label: '자극 없이 순해요' },
          { id: 114, categoryId: 138, code: 'mildly_irritating', label: '무난해요' },
          { id: 115, categoryId: 138, code: 'highly_irritating', label: '자극적이에요' },
        ],
      },
    ],
  },
  {
    categoryId: 143,
    categoryName: '베이비',
    attributes: [
      {
        name: '순한 보습',
        options: [
          { id: 101, categoryId: 143, code: 'moisturizing_high', label: '촉촉함이 오래가요' },
          { id: 102, categoryId: 143, code: 'moisturizing_medium', label: '무난해요' },
          { id: 103, categoryId: 143, code: 'moisturizing_low', label: '건조함이 느껴져요' },
        ],
      },
      {
        name: '자극도',
        options: [
          { id: 113, categoryId: 143, code: 'non_irritating', label: '자극 없이 순해요' },
          { id: 114, categoryId: 143, code: 'mildly_irritating', label: '무난해요' },
          { id: 115, categoryId: 143, code: 'highly_irritating', label: '자극적이에요' },
        ],
      },
      {
        name: '안전성',
        options: [
          { id: 158, categoryId: 143, code: 'safe_for_sensitive', label: '민감 피부도 괜찮아요' },
          { id: 159, categoryId: 143, code: 'safe_normal', label: '무난해요' },
          { id: 160, categoryId: 143, code: 'unsafe', label: '피부에 자극적이에요' },
        ],
      },
    ],
  },
];

// 카테고리 ID로 리뷰 옵션을 찾는 유틸리티 함수
export const getReviewOptionsByCategoryId = (
  categoryId: number,
): CategoryReviewOptions | undefined => {
  return categoryReviewOptions.find((option) => option.categoryId === categoryId);
};

// 모든 카테고리 ID 목록
export const getAllCategoryIds = (): number[] => {
  return categoryReviewOptions.map((option) => option.categoryId);
};
