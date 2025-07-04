'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/product';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  rank?: number;
  className?: string;
}

const RANK_BADGE_STYLES = {
  1: { variant: 'default' as const, color: 'bg-amber-400 text-white border-amber-400' },
  2: { variant: 'secondary' as const, color: 'bg-slate-300 text-white border-slate-300' },
  3: { variant: 'outline' as const, color: 'bg-amber-600 text-white border-amber-600' },
} as const;

export const ProductCard = ({ product, rank, className = '' }: ProductCardProps) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const getRankBadgeStyle = (rank: number) => {
    return (
      RANK_BADGE_STYLES[rank as keyof typeof RANK_BADGE_STYLES] || {
        variant: 'outline' as const,
        color: 'bg-bg-200 text-text-200 border-border-200',
      }
    );
  };

  return (
    <Link href={`/product/${product.id}`} className="block">
      <Card
        className={`relative w-full overflow-hidden border-none bg-transparent shadow-none ${className}`}
      >
        {/* 랭킹 뱃지 */}
        {rank && (
          <div className="absolute left-2 top-2 z-[5]">
            <Badge
              className={`${getRankBadgeStyle(rank).color} text-xs font-bold`}
              variant={getRankBadgeStyle(rank).variant}
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
              className="h-full w-full rounded-lg object-cover"
              priority={false}
              onError={handleImageError}
              unoptimized={false}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-200">
              <span className="text-sm text-gray-500">이미지 로드 실패</span>
            </div>
          )}
        </div>

        <CardContent className="space-y-3 p-0 pt-3">
          {/* 공동구매 마감 정보 */}
          <div className="flex items-center gap-2 rounded-lg bg-primary-100 px-3 py-2">
            <Clock className="h-3 w-3 flex-shrink-0 text-primary-300" />
            <p className="text-sm text-primary-300">
              <span>공동 구매 마감까지 </span>
              <span className="font-semibold">{product.remainingDays}일</span>
              <span> 남았어요!</span>
            </p>
          </div>

          {/* 상품명 */}
          <p className="line-clamp-2 text-sm font-normal text-text-100">{product.name}</p>

          {/* 가격 정보 */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary-300">{product.discountRate}%</span>
            <span className="text-sm font-normal text-text-300 line-through">
              {product.originalPrice.toLocaleString()}원
            </span>
            <span className="text-lg font-bold text-text-100">
              {product.price.toLocaleString()}원
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
