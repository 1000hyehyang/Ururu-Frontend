import React from 'react';

interface PriceDisplayProps {
  price: number;
  originalPrice: number;
  quantity: number;
}

export function PriceDisplay({ price, originalPrice }: PriceDisplayProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="whitespace-nowrap text-lg font-bold text-text-100 md:text-xl">
        {price.toLocaleString()}원
      </span>
      {originalPrice !== price && (
        <span className="whitespace-nowrap text-sm text-text-300 line-through md:text-base">
          {originalPrice.toLocaleString()}원
        </span>
      )}
    </div>
  );
}
