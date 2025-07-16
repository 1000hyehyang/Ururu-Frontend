import React from 'react';
import type { Product, SelectedOption } from '@/types/product';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FORM_STYLES } from '@/constants/form-styles';
import Image from 'next/image';

interface OptionSelectProps {
  product: Product;
  onSelect: (value: string) => void;
  className?: string;
  placeholder?: string;
  selectedOptions?: SelectedOption[];
}

export const OptionSelect = ({
  product,
  onSelect,
  className = '',
  placeholder = '옵션을 선택해주세요',
  selectedOptions = [],
}: OptionSelectProps) => {
  const allOptionsSelected = selectedOptions.length === product.options.length;
  const currentPlaceholder = allOptionsSelected ? '모든 옵션이 선택되었습니다' : placeholder;

  // 디버깅을 위한 로그
  console.log('OptionSelect - Product options:', product.options);
  console.log('OptionSelect - Selected options:', selectedOptions);
  console.log('OptionSelect - All options selected:', allOptionsSelected);

  // 옵션이 없는 경우 처리
  if (!product.options || product.options.length === 0) {
    return (
      <div className={className}>
        <div className={`${FORM_STYLES.input.base} cursor-not-allowed px-6 text-left opacity-60`}>
          <span className="text-text-300">옵션이 없습니다</span>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <Select
        key={`select-${selectedOptions.length}`} // key 변경으로 컴포넌트 재생성
        onValueChange={onSelect}
        disabled={allOptionsSelected}
      >
        <SelectTrigger
          className={`${FORM_STYLES.input.base} px-6 text-left ${
            allOptionsSelected ? 'cursor-not-allowed opacity-60' : ''
          }`}
        >
          <SelectValue placeholder={currentPlaceholder} />
        </SelectTrigger>
        <SelectContent className="z-[80] max-h-60 bg-bg-100">
          {product.options.map((option) => {
            const isSelected = selectedOptions.some((selected) => selected.value === option.id);
            const isOutOfStock =
              option.isOutOfStock ||
              (option.currentStock !== undefined && option.currentStock === 0);

            return (
              <SelectItem
                key={option.id}
                value={option.id}
                disabled={isSelected || isOutOfStock}
                className={`text-sm ${
                  isSelected || isOutOfStock
                    ? 'cursor-not-allowed text-text-300 line-through'
                    : 'cursor-pointer text-text-100 hover:bg-primary-100 hover:text-primary-300 focus:bg-primary-100 focus:text-primary-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* 옵션 이미지 */}
                  {option.imageUrl ? (
                    <div className="flex-shrink-0">
                      <Image
                        src={option.imageUrl}
                        alt={option.name}
                        width={40}
                        height={40}
                        className="rounded-lg object-cover"
                        onError={(e) => {
                          console.error('Image load failed:', option.imageUrl);
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-200">
                      <span className="text-xs text-gray-500">No Image</span>
                    </div>
                  )}
                  {/* 옵션 정보 */}
                  <div className="flex flex-col">
                    <span>{option.name}</span>
                    <span className="text-xs text-text-300">{option.price.toLocaleString()}원</span>
                    {/* 재고 정보 표시 */}
                    {option.currentStock !== undefined && (
                      <span className="text-xs text-text-300">재고: {option.currentStock}개</span>
                    )}
                    {/* 품절 상태 표시 */}
                    {option.isOutOfStock && <span className="text-xs text-red-500">품절</span>}
                  </div>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};
