import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuantityControlProps {
  quantity: number;
  onQuantityChange: (delta: number) => void;
}

export function QuantityControl({ quantity, onQuantityChange }: QuantityControlProps) {
  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-md border-bg-300 p-0 hover:bg-bg-200 active:bg-bg-200 md:h-10 md:w-10"
        onClick={() => onQuantityChange(-1)}
        disabled={quantity <= 1}
      >
        <Minus className="h-3 w-3 md:h-4 md:w-4" />
      </Button>
      <div className="flex h-8 w-16 items-center justify-center border-b border-t border-bg-300 bg-bg-100 text-sm font-medium text-text-100 md:h-10 md:w-20 md:text-base">
        {quantity}
      </div>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-md border-bg-300 p-0 hover:bg-bg-200 active:bg-bg-200 md:h-10 md:w-10"
        onClick={() => onQuantityChange(1)}
      >
        <Plus className="h-3 w-3 md:h-4 md:w-4" />
      </Button>
    </div>
  );
}
