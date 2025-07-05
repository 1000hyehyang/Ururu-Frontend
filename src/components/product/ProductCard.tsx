'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/product';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { PRODUCT_STYLES } from '@/constants/product-styles';

interface ProductCardProps {
  product: Product;
  rank?: number;
  className?: string;
}

const RANK_BADGE_VARIANTS = {
  1: 'default' as const,
  2: 'secondary' as const,
  3: 'outline' as const,
} as const;

export const ProductCard = ({ product, rank, className = '' }: ProductCardProps) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const getRankBadgeStyle = (rank: number) => {
    return (
      PRODUCT_STYLES.rankBadge[rank as keyof typeof PRODUCT_STYLES.rankBadge] ||
      PRODUCT_STYLES.rankBadge.default
    );
  };

  return (
    <Link href={`/product/${product.id}`} className="block">
      <Card className={`${PRODUCT_STYLES.card.container} ${className}`}>
        {/* 랭킹 뱃지 */}
        {rank && (
          <div className={PRODUCT_STYLES.card.rankBadge}>
            <Badge
              className={`${getRankBadgeStyle(rank)} text-xs font-bold`}
              variant={RANK_BADGE_VARIANTS[rank as keyof typeof RANK_BADGE_VARIANTS] || 'outline'}
            >
              {rank}
            </Badge>
          </div>
        )}

        {/* 상품 이미지 - 정사각형 */}
        <div className="relative aspect-square w-full">
          {!imageError ? (
            <Image
              src={product.mainImage}
              alt={product.name}
              width={280}
              height={280}
              className={PRODUCT_STYLES.image.card}
              priority={false}
              onError={handleImageError}
              unoptimized={false}
            />
          ) : (
            <div className={PRODUCT_STYLES.image.error}>
              <span className={PRODUCT_STYLES.image.errorText}>이미지 로드 실패</span>
            </div>
          )}
        </div>

        <CardContent className={PRODUCT_STYLES.card.content}>
          {/* 공동구매 마감 정보 */}
          <div className={PRODUCT_STYLES.card.deadlineInfo}>
            <Clock className={PRODUCT_STYLES.card.deadlineIcon} />
            <p className={PRODUCT_STYLES.card.deadlineText}>
              <span>공동 구매 마감까지 </span>
              <span className={PRODUCT_STYLES.card.deadlineBold}>{product.remainingDays}일</span>
              <span> 남았어요!</span>
            </p>
          </div>

          {/* 상품명 */}
          <p className={PRODUCT_STYLES.card.productName}>{product.name}</p>

          {/* 가격 정보 */}
          <div className={PRODUCT_STYLES.card.priceContainer}>
            <span className={PRODUCT_STYLES.card.discountRate}>{product.discountRate}%</span>
            <span className={PRODUCT_STYLES.card.originalPrice}>
              {product.originalPrice.toLocaleString()}원
            </span>
            <span className={PRODUCT_STYLES.card.currentPrice}>
              {product.price.toLocaleString()}원
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
