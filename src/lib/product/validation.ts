import type { ProductFormData, ProductOption, Tag } from '@/types/product';

export function validateProductForm(
  formData: ProductFormData,
  optionArray: { items: ProductOption[] },
  selectedTags: Tag[],
): string | null {
  if (!formData.name) return '상품명을 입력해주세요.';
  if (!formData.description) return '상품 설명을 입력해주세요.';
  if (!formData.categoryMain) return '카테고리를 선택해주세요.';
  if (selectedTags.length === 0) return '태그를 1개 이상 선택해주세요.';
  if (optionArray.items.length === 0) return '상품 옵션을 1개 이상 추가해주세요.';
  for (let i = 0; i < optionArray.items.length; i++) {
    const option = optionArray.items[i];
    if (!option.name) return `옵션 ${i + 1}의 옵션명을 입력해주세요.`;
    if (!option.price || option.price <= 0) return `옵션 ${i + 1}의 기본 가격을 입력해주세요.`;
    if (!option.fullIngredients) return `옵션 ${i + 1}의 전성분을 입력해주세요.`;
  }
  if (!formData.capacity) return '용량 또는 중량을 입력해주세요.';
  if (!formData.specification) return '제품 주요 사양을 입력해주세요.';
  if (!formData.expiryDate) return '사용기한(또는 개봉 후 사용기간)을 입력해주세요.';
  if (!formData.usage) return '사용법을 입력해주세요.';
  if (!formData.manufacturer) return '화장품제조업자를 입력해주세요.';
  if (!formData.seller) return '화장품책임판매업자를 입력해주세요.';
  if (!formData.country) return '제조국을 입력해주세요.';
  if (!formData.functionalTest) return '기능성 화장품 심사필 여부를 선택해주세요.';
  if (!formData.precautions) return '사용할 때의 주의사항을 입력해주세요.';
  if (!formData.qualityStandard) return '품질보증기준을 입력해주세요.';
  if (!formData.customerService) return '소비자상담 전화번호를 입력해주세요.';
  return null;
}
