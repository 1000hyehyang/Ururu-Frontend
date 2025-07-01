import React from 'react';
import { ChevronRightIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { myPageData } from '@/data/mypage';

export function OrderStatus() {
  const { orderStatuses } = myPageData;

  return (
    <Card className="w-full rounded-2xl border-0 bg-bg-100 py-6 shadow-none">
      <CardHeader className="mb-4 flex flex-row items-center justify-between p-0">
        <CardTitle className="text-lg font-semibold text-text-100 md:text-xl">
          주문/배송 조회
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="h-auto border-bg-300 px-2 py-1 text-sm text-text-300 hover:text-primary-300"
          aria-label="주문/배송 전체보기"
        >
          전체보기 <ChevronRightIcon className="ml-0 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-0 pt-4">
        <div className="flex items-center justify-between">
          {orderStatuses.map((item) => (
            <div key={item.label} className="flex flex-1 flex-col items-center">
              <span className="mb-1 text-2xl font-bold text-text-100 md:text-3xl">
                {item.count}
              </span>
              <span className="text-xs text-text-300">{item.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
