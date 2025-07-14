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
      prev.map((o) =>
        o.value === value ? { ...o, quantity: Math.max(1, o.quantity + delta) } : o,
      ),
    );
  };

  // 총 금액 계산
  const totalPrice = selectedOptions.reduce((sum, o) => sum + product.price * o.quantity, 0);

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
