import React from 'react';
import type { FC } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Minus, Plus } from 'lucide-react';

interface SelectedOption {
  value: string;
  label: string;
  quantity: number;
}

interface OptionCardProps {
  option: SelectedOption;
  price: number;
  onRemove: (value: string) => void;
  onQuantityChange: (value: string, delta: number) => void;
  className?: string;
}

export const OptionCard: FC<OptionCardProps> = ({
  option,
  price,
  onRemove,
  onQuantityChange,
  className = '',
}) => {
  return (
    <Card
      className={`flex w-full items-center justify-between gap-2 rounded-lg border-none bg-bg-200 p-3 md:p-4 ${className}`}
    >
      <CardContent className="flex w-full flex-1 flex-col gap-2 bg-transparent p-0">
        <div className="flex w-full items-center justify-between">
          <span className="text-sm text-text-100 md:text-base">{option.label}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 p-0 md:h-6 md:w-6"
            onClick={() => onRemove(option.value)}
          >
            <X className="h-3 w-3 md:h-4 md:w-4" />
          </Button>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 rounded-md border-bg-300 p-0 hover:bg-bg-300 active:bg-bg-300 md:h-8 md:w-8"
              onClick={() => onQuantityChange(option.value, -1)}
              disabled={option.quantity <= 1}
            >
              <Minus className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
            <div className="flex h-7 w-[60px] items-center justify-center border-b border-t border-bg-300 bg-bg-100 md:h-8 md:w-[68px]">
              <span className="text-sm text-text-100 md:text-base">{option.quantity}</span>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 rounded-md border-bg-300 p-0 hover:bg-bg-300 active:bg-bg-300 md:h-8 md:w-8"
              onClick={() => onQuantityChange(option.value, 1)}
            >
              <Plus className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
          </div>
          <span className="text-sm font-semibold text-text-100 md:text-base">
            {(price * option.quantity).toLocaleString()}원
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
