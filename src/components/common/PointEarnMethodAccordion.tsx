import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PointEarnMethod } from '@/types/point';

interface PointEarnMethodAccordionProps {
  methods: PointEarnMethod[];
  className?: string;
}

export function PointEarnMethodAccordion({
  methods,
  className = '',
}: PointEarnMethodAccordionProps) {
  const getMethodDescription = (label: string) => {
    switch (label) {
      case '공구 참여':
        return '공동구매에 참여하면 10P를 적립받을 수 있어요!';
      case '친구 초대':
        return '친구를 초대하고 첫 구매를 완료하면 100P를 적립받을 수 있어요!';
      case '리뷰 작성':
        return '상품 리뷰를 작성하면 50P를 적립받을 수 있어요!';
      case '포토 리뷰':
        return '실사용 사진과 함께 리뷰를 작성하면 100P를 적립받을 수 있어요!';
      default:
        return '';
    }
  };

  return (
    <Accordion type="multiple" className={`w-full space-y-2 ${className}`}>
      {methods.map((method, index) => (
        <AccordionItem key={method.label} value={`method-${index}`} className="border-bg-300">
          <AccordionTrigger className="py-3 text-text-100 hover:text-primary-300 hover:no-underline">
            <div className="flex items-center gap-3">
              <span className="text-xl">{method.icon}</span>
              <span className="font-medium">{method.label}</span>
              <span className="text-sm font-semibold text-primary-300">+{method.amount}P</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-text-200">
            <div className="px-4 py-2">
              <p className="text-sm">{getMethodDescription(method.label)}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
