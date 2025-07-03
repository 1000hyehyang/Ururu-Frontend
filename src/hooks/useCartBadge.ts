import { useMemo } from 'react';
import { mockCartData } from '@/data/cart';

export const useCartBadge = () => {
  const cartItemCount = useMemo(() => {
    return mockCartData.length;
  }, []);

  return {
    cartItemCount,
  };
};
