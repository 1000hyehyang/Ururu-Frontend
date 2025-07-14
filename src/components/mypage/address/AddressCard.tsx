import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShippingAddress } from '@/types/api';
import { FORM_STYLES } from '@/constants/form-styles';
import { X } from 'lucide-react';

interface AddressCardProps {
  address: ShippingAddress;
  onDelete?: (id: number) => void;
}

export function AddressCard({ address, onDelete }: AddressCardProps) {
  return (
    <Card className="relative w-full rounded-2xl border-0 bg-bg-100 p-6 shadow-sm">
      {/* 삭제 아이콘 버튼 */}
      {onDelete && (
        <button
          type="button"
          className="absolute right-4 top-4 rounded p-1 transition hover:bg-bg-200"
          aria-label="배송지 삭제"
          onClick={() => onDelete(address.id)}
        >
          <X className="h-5 w-5 text-text-300 hover:text-primary-300" />
        </button>
      )}
      <CardContent className="p-0">
        <div className="mb-2 flex items-center">
          <span className="text-base font-semibold text-text-100">{address.label}</span>
          {address.is_default && (
            <span className="ml-2 rounded-full bg-primary-300 px-3 py-1 text-xs font-semibold text-text-on">
              기본 배송지
            </span>
          )}
        </div>
        <div className="mb-1 text-xs text-text-300">({address.zonecode})</div>
        <div className="mb-1 text-sm text-text-200">기본주소 : {address.address1}</div>
        <div className="mb-1 text-sm text-text-200">상세주소 : {address.address2}</div>
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
