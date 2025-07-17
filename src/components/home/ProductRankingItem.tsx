import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/product';

interface ProductRankingItemProps {
  product: Product;
  index: number;
  variant: 'mobile' | 'desktop';
}

export function ProductRankingItem({ product, index, variant }: ProductRankingItemProps) {
  const isMobile = variant === 'mobile';

  return (
    <Link href={`/groupbuys/${product.id}`} className="block">
      <div
        className={`flex items-center rounded-xl bg-bg-100 ${isMobile ? 'gap-3' : 'flex-1 gap-4'}`}
      >
        {/* 랭킹 번호 */}
        <div
          className={`flex flex-shrink-0 items-center justify-center text-lg font-bold text-text-100 ${
            isMobile ? 'h-8 w-4' : 'h-10 w-5'
          }`}
        >
          {index + 1}
        </div>

        {/* 상품 이미지 */}
        <div
          className={`relative flex-shrink-0 overflow-hidden rounded-lg ${
            isMobile ? 'h-14 w-14' : 'h-20 w-20'
          }`}
        >
          <Image src={product.mainImage} alt={product.name} fill className="object-cover" />
        </div>

        {/* 상품 정보 */}
        <div className="min-w-0 flex-1">
          {/* 마감 문구 */}
          <div className="mb-1 inline-block rounded-md bg-primary-100 px-3 py-1 text-xs font-medium text-primary-300">
            공구 마감까지 {product.remainingDays}일 남았어요!
          </div>
          <h3 className="mb-1 line-clamp-2 text-sm font-medium text-text-100">{product.name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary-300">{product.discountRate}%</span>
            <span className="text-sm text-text-300 line-through">
              {product.originalPrice.toLocaleString()}원
            </span>
            <span className="text-lg font-bold text-text-100">
              {product.price.toLocaleString()}원
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
