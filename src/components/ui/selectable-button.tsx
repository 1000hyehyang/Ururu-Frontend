import React from 'react';
import { Button } from '@/components/ui/button';
import { FORM_STYLES } from '@/constants/form-styles';
import { cn } from '@/lib/utils';

interface SelectableButtonProps {
  value: string;
  label: string;
  isSelected: boolean;
  isDisabled?: boolean;
  onClick: () => void;
  className?: string;
}

export function SelectableButton({
  value,
  label,
  isSelected,
  isDisabled = false,
  onClick,
  className,
}: SelectableButtonProps) {
  return (
    <Button
      key={value}
      type="button"
      variant={isSelected ? 'default' : 'outline'}
      disabled={isDisabled}
      className={cn(
        FORM_STYLES.button.selectable.base,
        isSelected
          ? FORM_STYLES.button.selectable.selected
          : isDisabled
            ? 'cursor-not-allowed border-bg-300 bg-bg-200 text-text-300'
            : FORM_STYLES.button.selectable.unselected,
        className,
      )}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

interface SelectableButtonGroupProps {
  options: ReadonlyArray<{ readonly label: string; readonly value: string }>;
  selectedValue: string;
  onSelect: (value: string) => void;
  className?: string;
  gridCols?: 'grid-cols-1' | 'grid-cols-2' | 'grid-cols-3' | 'grid-cols-4';
}

export function SelectableButtonGroup({
  options,
  selectedValue,
  onSelect,
  className,
  gridCols = 'grid-cols-2',
}: SelectableButtonGroupProps) {
  return (
    <div className={cn(`grid gap-2 md:grid-cols-3 xl:grid-cols-4`, gridCols, className)}>
      {options.map((option) => (
        <SelectableButton
          key={option.value}
          value={option.value}
          label={option.label}
          isSelected={selectedValue === option.value}
          onClick={() => onSelect(option.value)}
        />
      ))}
    </div>
  );
}
