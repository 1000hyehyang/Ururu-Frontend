import React from 'react';
import Image from 'next/image';
import { PRODUCT_STYLES } from '@/constants/product-styles';
import { PRODUCT_CONSTANTS } from '@/constants/product-constants';

interface ProductImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  priority = false,
  className = '',
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={PRODUCT_CONSTANTS.IMAGE.DETAIL_WIDTH}
      height={PRODUCT_CONSTANTS.IMAGE.DETAIL_HEIGHT}
      className={`${PRODUCT_STYLES.image.detail} ${className}`}
      priority={priority}
    />
  );
};
