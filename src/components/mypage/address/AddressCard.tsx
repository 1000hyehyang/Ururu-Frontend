import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AddressData } from '@/data/address';
import { FORM_STYLES } from '@/constants/form-styles';

interface AddressCardProps {
  address: AddressData;
}

export function AddressCard({ address }: AddressCardProps) {
  return (
    <Card className="w-full rounded-2xl border-0 bg-bg-100 p-6 shadow-sm">
      <CardContent className="p-0">
        <div className="mb-2 flex items-center">
          <span className="text-base font-semibold text-text-100">{address.addressName}</span>
          {address.isDefault && (
            <span className="ml-2 rounded-full bg-primary-300 px-3 py-1 text-xs font-semibold text-text-on">
              기본 배송지
            </span>
          )}
        </div>
        <div className="mb-1 text-xs text-text-300">({address.zipcode})</div>
        <div className="mb-1 text-sm text-text-200">도로명 : {address.addressRoad}</div>
        <div className="mb-1 text-sm text-text-200">지번 : {address.addressJibun}</div>
        <div className="mb-4 text-sm text-text-200">{address.phone}</div>
        <Link href={`/mypage/address/register?id=${address.id}`}>
          <Button className={FORM_STYLES.button.pinkOutline + ' h-12 w-full rounded-lg'}>
            수정하기
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
