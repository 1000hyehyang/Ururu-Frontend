'use client';

import React, { useState } from 'react';
import { NoFooterLayout } from '@/components/layout/layouts';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { OrderItem, PointUsage, PaymentSummary, DeliveryAddress } from '@/components/order';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { mockCartData } from '@/data/cart';
import { mockAddressData } from '@/data/address';
import type { CartItem as CartItemType } from '@/types/cart';

function OrderPageContent() {
  // 배송지 관련 상태
  const [deliveryType, setDeliveryType] = useState<'existing' | 'new'>('new');
  const [selectedAddressId, setSelectedAddressId] = useState<string>('1');
  const [newAddressData, setNewAddressData] = useState({
    addressName: '',
    isDefault: true,
    phone: '',
    zipcode: '',
    addressRoad: '',
    addressJibun: '',
    addressDetail: '',
  });

  // 포인트 사용 관련 상태
  const [pointAmount, setPointAmount] = useState(0);
  const availablePoint = 5000;

  // 주문 상품 데이터 (실제로는 장바구니에서 선택된 상품들)
  const orderItems: CartItemType[] = mockCartData.slice(0, 2); // 예시로 2개만

  // 가격 계산
  const totalProductPrice = orderItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const shippingFee = totalProductPrice >= 50000 ? 0 : 3000;
  const finalPrice = totalProductPrice + shippingFee - pointAmount;

  // 포인트 전액 사용
  const handleUseAllPoints = () => {
    setPointAmount(Math.min(availablePoint, finalPrice));
  };

  const handlePurchase = () => {
    // TODO: 실제 결제 처리
    console.log('결제 처리');
  };

  return (
    <NoFooterLayout>
      <div className="container mx-auto max-w-6xl px-6 py-8 md:px-8 md:py-12">
        <h1 className="mb-8 text-2xl font-bold text-text-100">주문/결제</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* 주문 상품 목록 */}
          <div className="lg:col-span-2">
            <Card className="rounded-2xl border-0 bg-bg-100 shadow-none">
              <CardContent className="px-0 py-4 md:py-6">
                <h2 className="mb-4 text-lg font-semibold text-text-100">주문 상품</h2>
                <div className="space-y-4">
                  {orderItems.map((item) => (
                    <OrderItem key={item.id} item={item} />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 배송지 정보 */}
            <Card className="mt-6 rounded-2xl border-0 bg-bg-100 shadow-none">
              <CardContent className="px-0 py-4 md:py-6">
                <DeliveryAddress
                  deliveryType={deliveryType}
                  selectedAddressId={selectedAddressId}
                  newAddressData={newAddressData}
                  onDeliveryTypeChange={setDeliveryType}
                  onAddressIdChange={setSelectedAddressId}
                  onNewAddressChange={(field, value) =>
                    setNewAddressData((prev) => ({ ...prev, [field]: value }))
                  }
                />
              </CardContent>
            </Card>

            {/* 포인트 사용 */}
            <Card className="mt-6 rounded-2xl border-0 bg-bg-100 shadow-none">
              <CardContent className="px-0 py-4 md:py-6">
                <PointUsage
                  availablePoint={availablePoint}
                  pointAmount={pointAmount}
                  onPointAmountChange={setPointAmount}
                  onUseAllPoints={handleUseAllPoints}
                />
              </CardContent>
            </Card>
          </div>

          {/* 결제 요약 */}
          <div className="lg:col-span-1">
            <PaymentSummary
              totalProductPrice={totalProductPrice}
              pointAmount={pointAmount}
              shippingFee={shippingFee}
              finalPrice={finalPrice}
            />
          </div>
        </div>
      </div>
    </NoFooterLayout>
  );
}

export default function OrderPage() {
  return (
    <AuthGuard requireAuth={true}>
      <OrderPageContent />
    </AuthGuard>
  );
}
