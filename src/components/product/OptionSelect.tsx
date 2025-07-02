import React from 'react';
import type { FC } from 'react';
import type { mockProduct as mockProductType } from '@/data/mock-product';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface OptionSelectProps {
  product: typeof mockProductType;
  onSelect: (value: string) => void;
  className?: string;
  placeholder?: string;
  selectedOptions?: Array<{ value: string; label: string; quantity: number }>;
}

export const OptionSelect: FC<OptionSelectProps> = ({
  product,
  onSelect,
  className = '',
  placeholder = '옵션을 선택해주세요',
  selectedOptions = [],
}) => {
  const allOptionsSelected = selectedOptions.length === product.options.length;
  const currentPlaceholder = allOptionsSelected ? '모든 옵션이 선택되었습니다' : placeholder;

  return (
    <div className={className}>
      <Select onValueChange={onSelect} disabled={allOptionsSelected}>
        <SelectTrigger
          className={`h-12 w-full rounded-lg border-bg-300 bg-bg-100 px-6 text-left text-sm text-text-100 placeholder:text-text-300 focus:border-primary-300 focus:ring-2 focus:ring-primary-300 ${
            allOptionsSelected ? 'cursor-not-allowed opacity-60' : ''
          }`}
        >
          <SelectValue placeholder={currentPlaceholder} />
        </SelectTrigger>
        <SelectContent className="z-[80] max-h-60 bg-bg-100">
          {product.options.map((option) => {
            const isSelected = selectedOptions.some((selected) => selected.value === option.value);
            return (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={isSelected}
                className={`text-sm ${
                  isSelected
                    ? 'cursor-not-allowed text-text-300 line-through'
                    : 'cursor-pointer text-text-100 hover:bg-primary-100 hover:text-primary-300 focus:bg-primary-100 focus:text-primary-300'
                }`}
              >
                {option.label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};
