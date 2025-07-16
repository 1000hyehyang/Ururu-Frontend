import { useState } from 'react';
import type { Product, SelectedOption } from '@/types/product';

export const useProductOptions = (product: Product) => {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);

  // 옵션 선택 핸들러
  const handleSelectOption = (value: string) => {
    const option = product.options.find((opt) => opt.id === value);
    if (!option) return;
    // 이미 선택된 옵션이면 무시
    if (selectedOptions.some((o) => o.value === value)) return;
    setSelectedOptions((prev) => [...prev, { value, label: option.name, quantity: 1 }]);
  };

  // 옵션 삭제
  const handleRemoveOption = (value: string) => {
    setSelectedOptions((prev) => prev.filter((o) => o.value !== value));
  };

  // 수량 변경
  const handleChangeQuantity = (value: string, delta: number) => {
    setSelectedOptions((prev) =>
      prev.map((o) => {
        if (o.value === value) {
          const option = product.options.find((opt) => opt.id === value);
          const maxQuantity = option?.maxQuantity || 999; // 기본값 999
          const newQuantity = Math.max(1, Math.min(maxQuantity, o.quantity + delta));
          return { ...o, quantity: newQuantity };
        }
        return o;
      }),
    );
  };

  // 총 금액 계산 - 각 옵션의 개별 가격 사용
  const totalPrice = selectedOptions.reduce((sum, o) => {
    const option = product.options.find((opt) => opt.id === o.value);
    const optionPrice = option ? option.price : product.price;
    return sum + optionPrice * o.quantity;
  }, 0);

  // 총 수량 계산
  const totalCount = selectedOptions.reduce((sum, o) => sum + o.quantity, 0);

  return {
    selectedOptions,
    totalPrice,
    totalCount,
    handleSelectOption,
    handleRemoveOption,
    handleChangeQuantity,
  };
};
