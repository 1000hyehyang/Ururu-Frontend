import React, { useMemo } from 'react';
import type { Product, ProductOption } from '@/types/product';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Truck, Clock } from 'lucide-react';

interface ProductInfoProps {
  product: Product;
  className?: string;
  variant?: 'mobile' | 'desktop';
}

// 🎯 현재 할인률 계산 함수
const calculateCurrentDiscountRate = (
  participants: number,
  rewardTiers: Array<{
    participants: number;
    discount: string;
    discountRate?: number;
    achieved: boolean;
  }>,
): number => {
  // 달성된 단계 중 최고 할인률 찾기
  const achievedTiers = rewardTiers.filter((tier) => participants >= tier.participants);

  if (achievedTiers.length === 0) return 0;

  // 가장 높은 할인률 반환 (숫자형 discountRate 우선 사용, fallback으로 문자열 파싱)
  const highestTier = achievedTiers.reduce((max, tier) => {
    const currentDiscountRate = tier.discountRate ?? parseDiscountFromString(tier.discount);
    const maxDiscountRate = max.discountRate ?? parseDiscountFromString(max.discount);
    return currentDiscountRate > maxDiscountRate ? tier : max;
  });

  return highestTier.discountRate ?? parseDiscountFromString(highestTier.discount);
};

// 🎯 문자열에서 할인율 파싱하는 안전한 함수
const parseDiscountFromString = (discountString: string): number => {
  const discountRate = parseInt(discountString.replace(/[^\d]/g, ''), 10);

  if (isNaN(discountRate)) {
    console.warn(`Invalid discount format: ${discountString}`);
    return 0;
  }

  return discountRate;
};

// 🎯 최저가 계산 로직을 추출한 유틸리티 함수
const getMinPriceOverride = (options: ProductOption[], fallbackPrice: number): number => {
  return options.length > 0
    ? Math.min(...options.map((option) => option.priceOverride || option.price))
    : fallbackPrice;
};

export const ProductInfo = ({ product, className = '', variant = 'mobile' }: ProductInfoProps) => {
  const isDesktop = variant === 'desktop';

  // 🎯 현재 할인률 계산
  const currentDiscountRate = useMemo(
    () => calculateCurrentDiscountRate(product.participants, product.rewardTiers),
    [product.participants, product.rewardTiers],
  );

  // 🎯 최저가 계산
  const currentLowestPrice = useMemo(() => {
    const minPriceOverride = getMinPriceOverride(product.options, product.originalPrice);
    return Math.round((minPriceOverride * (100 - currentDiscountRate)) / 100);
  }, [product.options, product.originalPrice, currentDiscountRate]);

  // 🎯 할인 여부 확인
  const hasDiscount = useMemo(() => currentDiscountRate > 0, [currentDiscountRate]);

  // 🎯 다음 리워드 단계 찾기
  const nextStage = useMemo(
    () => product.rewardTiers.find((tier) => product.participants < tier.participants),
    [product.participants, product.rewardTiers],
  );

  // 🎯 다음 리워드까지 남은 인원
  const remainingForNextReward = useMemo(
    () => (nextStage ? nextStage.participants - product.participants : 0),
    [nextStage, product.participants],
  );

  // 🎯 진행률 데이터 계산
  const progressData = useMemo(() => {
    const progressTarget = nextStage
      ? nextStage.participants
      : product.rewardTiers[product.rewardTiers.length - 1]?.participants ||
        product.targetParticipants;
    const progressValue = Math.min(100, (product.participants / progressTarget) * 100);
    return { progressTarget, progressValue };
  }, [nextStage, product.participants, product.rewardTiers, product.targetParticipants]);

  const { progressTarget, progressValue } = progressData;

  // 🎯 다음 단계 참가자 수 미리 계산 (성능 최적화)
  const nextStageParticipants = nextStage?.participants;

  return (
    <div className={className}>
      {/* 상품 제목 */}
      <div
        className={`mb-6 font-semibold text-text-100 ${
          isDesktop ? 'text-2xl' : 'text-xl md:text-2xl'
        }`}
      >
        {product.name}
      </div>

      {/* 가격 정보 - 조건부 렌더링 */}
      <div className={`mb-6 flex items-center gap-3 ${isDesktop ? 'gap-3.5' : 'gap-3'}`}>
        {hasDiscount ? (
          // 할인이 있는 경우
          <>
            <span
              className={`font-bold text-primary-300 ${
                isDesktop ? 'text-3xl' : 'text-2xl md:text-3xl'
              }`}
            >
              {currentDiscountRate}%
            </span>
            <span
              className={`font-normal text-text-300 line-through ${
                isDesktop ? 'text-xl' : 'text-lg md:text-xl'
              }`}
            >
              {product.originalPrice.toLocaleString()}원
            </span>
            <span
              className={`font-bold text-primary-300 ${
                isDesktop ? 'text-3xl' : 'text-2xl md:text-3xl'
              }`}
            >
              {currentLowestPrice.toLocaleString()}원
            </span>
          </>
        ) : (
          // 할인이 없는 경우 - priceOverride 최저가 표시
          <span
            className={`font-bold text-primary-300 ${isDesktop ? 'text-3xl' : 'text-2xl md:text-3xl'}`}
          >
            {getMinPriceOverride(product.options, product.originalPrice).toLocaleString()}원
          </span>
        )}
      </div>

      {/* 할인 안내 메시지 (할인이 없을 때만 표시) */}
      {!hasDiscount && (
        <div className={`mb-4 text-text-200 ${isDesktop ? 'text-sm' : 'text-xs md:text-sm'}`}>
          더 많은 참여자가 모이면 할인 혜택을 받을 수 있어요!
        </div>
      )}

      {/* 공동구매 정보 */}
      <Card
        className={`mb-6 flex w-full items-center gap-4 rounded-lg border-none bg-primary-100 ${
          isDesktop ? 'px-6 py-3' : 'px-4 py-3 md:px-6 md:py-4'
        }`}
      >
        <CardContent className="flex items-center gap-4 bg-transparent p-0">
          <Clock
            className={`text-primary-300 ${isDesktop ? 'h-5 w-5' : 'h-4 w-4 md:h-5 md:w-5'}`}
          />
          <div className="text-sm font-normal text-primary-300">
            공동 구매 마감까지 <span className="font-semibold">{product.remainingDays}일</span>{' '}
            남았어요!
          </div>
        </CardContent>
      </Card>

      {/* 참여 정보 */}
      <div
        className={`mb-6 flex w-full flex-col items-start gap-3 ${isDesktop ? 'gap-4' : 'gap-3'}`}
      >
        <div className={`flex items-center gap-2 ${isDesktop ? 'gap-3' : 'gap-2'}`}>
          <span
            className={`font-bold text-text-100 ${isDesktop ? 'text-2xl' : 'text-xl md:text-2xl'}`}
          >
            {product.participants}
          </span>
          <span className={`text-text-100 ${isDesktop ? 'text-base' : 'text-sm md:text-base'}`}>
            명 참여중
          </span>
          {nextStage && (
            <span className={`text-text-100 ${isDesktop ? 'text-sm' : 'text-xs md:text-sm'}`}>
              다음 리워드까지 {remainingForNextReward}명 남았어요!
            </span>
          )}
        </div>

        {/* 진행률 바 */}
        <div className={`flex w-full flex-col gap-2 ${isDesktop ? 'gap-3' : 'gap-2'}`}>
          <Progress value={progressValue} className="h-2 bg-primary-100" />
          <div
            className={`w-full text-right text-text-100 ${
              isDesktop ? 'text-xs' : 'text-xs md:text-sm'
            }`}
          >
            {product.participants} / {progressTarget}명
          </div>
        </div>

        {/* 리워드 단계 */}
        <div className="flex w-full flex-col gap-2">
          {product.rewardTiers.map((tier, index) => {
            // 🎯 실시간 달성 여부 확인
            const isAchieved = product.participants >= tier.participants;
            const isNext = !isAchieved && nextStageParticipants === tier.participants;

            return (
              <Card
                key={index}
                className={`flex w-full items-center justify-between rounded-lg border-none ${
                  isDesktop ? 'px-6 py-3' : 'px-4 py-3 md:px-6 md:py-4'
                } ${
                  isAchieved
                    ? 'bg-gradient-to-r from-primary-200 to-primary-300 text-text-on'
                    : isNext
                      ? 'bg-gradient-to-r from-primary-200 to-primary-300 text-text-on shadow-lg'
                      : 'bg-primary-100 text-text-100'
                }`}
              >
                <CardContent className="flex w-full items-center justify-between bg-transparent p-0">
                  <span className={`font-normal ${isDesktop ? 'text-sm' : 'text-xs md:text-sm'}`}>
                    {tier.participants}명 달성 시
                  </span>
                  <span className={`font-bold ${isDesktop ? 'text-base' : 'text-sm md:text-base'}`}>
                    {tier.discount}
                  </span>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* 배송 정보 */}
      <div className={`mb-6 flex items-start gap-4 ${isDesktop ? 'gap-6' : 'gap-4'}`}>
        <span
          className={`font-medium text-text-100 ${
            isDesktop ? 'text-base' : 'text-sm md:text-base'
          }`}
        >
          배송
        </span>
        <div className={`flex flex-col gap-1 ${isDesktop ? 'gap-2' : 'gap-1'}`}>
          <div className={`flex items-center gap-2 ${isDesktop ? 'gap-3' : 'gap-2'}`}>
            <Truck
              className={`text-primary-200 ${isDesktop ? 'h-6 w-6' : 'h-5 w-5 md:h-6 md:w-6'}`}
            />
            <span className={`text-text-100 ${isDesktop ? 'text-base' : 'text-sm md:text-base'}`}>
              {product.shippingInfo.type}
            </span>
          </div>
          <div className={`flex items-center gap-2 ${isDesktop ? 'gap-3' : 'gap-2'}`}>
            <span className={`text-text-100 ${isDesktop ? 'text-base' : 'text-sm md:text-base'}`}>
              {product.shippingInfo.description}
            </span>
          </div>
          <span className={`text-text-200 ${isDesktop ? 'text-xs' : 'text-xs md:text-sm'}`}>
            무료 배송
          </span>
        </div>
      </div>
    </div>
  );
};
