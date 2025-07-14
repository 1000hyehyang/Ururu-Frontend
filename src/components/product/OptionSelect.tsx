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

  return (
    <div className={className}>
      <Select onValueChange={onSelect} disabled={allOptionsSelected}>
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
            return (
              <SelectItem
                key={option.id}
                value={option.id}
                disabled={isSelected}
                className={`text-sm ${
                  isSelected
                    ? 'cursor-not-allowed text-text-300 line-through'
                    : 'cursor-pointer text-text-100 hover:bg-primary-100 hover:text-primary-300 focus:bg-primary-100 focus:text-primary-300'
                }`}
              >
                {option.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};
