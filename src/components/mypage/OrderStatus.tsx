import { Button } from '@/components/ui/button';
import { myPageData } from '@/data/mypage';
import { ChevronRight } from 'lucide-react';

export function OrderStatus() {
  const { orderStatuses } = myPageData;
  const statusItems = orderStatuses;

  return (
    <section className="w-full bg-transparent">
      <div className="mb-2 flex items-center justify-between px-1">
        <span className="text-base font-semibold text-gray-900">주문/배송 조회</span>
        <Button
          variant="ghost"
          size="sm"
          className="h-auto px-2 py-1 text-gray-400 hover:text-pink-500"
        >
          전체보기 <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-5 shadow-[0_4px_24px_0_rgba(0,0,0,0.06)]">
        {statusItems.map((item) => (
          <div key={item.label} className="flex flex-1 flex-col items-center">
            <span className="mb-1 text-2xl font-bold text-gray-900">{item.count}</span>
            <span className="text-xs text-gray-500">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
