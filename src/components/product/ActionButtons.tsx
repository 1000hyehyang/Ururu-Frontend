import React from 'react';
import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Share } from 'lucide-react';

interface ActionButtonsProps {
  onShare?: () => void;
  onAddToCart?: () => void;
  onBuyNow?: () => void;
  className?: string;
  size?: 'default' | 'large';
  isBuyNowLoading?: boolean;
  isAddToCartLoading?: boolean;
}

export const ActionButtons: FC<ActionButtonsProps> = ({
  onShare,
  onAddToCart,
  onBuyNow,
  className = '',
  size = 'default',
  isBuyNowLoading = false,
  isAddToCartLoading = false,
}) => {
  const isLarge = size === 'large';
  const buttonHeight = isLarge ? 'h-12 md:h-14' : 'h-[51px]';
  const textSize = isLarge ? 'text-sm md:text-base' : 'text-base';

  return (
    <div className={`flex w-full items-center justify-between gap-2 ${className}`}>
      <Button
        variant="outline"
        className={`flex flex-1 ${buttonHeight} items-center gap-1 rounded-lg border-bg-300 px-6 transition hover:bg-bg-200 focus:ring-primary-300 active:bg-bg-200`}
        onClick={onShare}
      >
        <Share className="h-6 w-6" />
        <span className={`${textSize} text-text-100`}>공유</span>
      </Button>
      <Button
        variant="outline"
        className={`flex flex-1 ${buttonHeight} items-center gap-2.5 rounded-lg border-primary-300 px-6 text-primary-300 transition hover:bg-primary-100 focus:ring-primary-300 active:bg-primary-100 md:px-10`}
        onClick={onAddToCart}
        disabled={isAddToCartLoading}
      >
        <span className={`${textSize} text-primary-300`}>
          {isAddToCartLoading ? '담는 중...' : '장바구니'}
        </span>
      </Button>
      <Button
        className={`flex flex-1 ${buttonHeight} items-center gap-2.5 rounded-lg bg-primary-300 px-6 text-text-on transition hover:opacity-80 focus:ring-primary-300 active:opacity-90 md:px-10`}
        onClick={onBuyNow}
        disabled={isBuyNowLoading}
      >
        <span className={`${textSize} text-text-on`}>
          {isBuyNowLoading ? '주문 생성 중...' : '바로구매'}
        </span>
      </Button>
    </div>
  );
};
