import React from 'react';
import { DetailMain, OrderBox, OrderFloatingBar } from '@/components/product';
import { mockProductData } from '@/data/mock-product';
import { CustomLayout } from '@/components/layout/layouts';

export default function ProductDetailPage() {
  return (
    <CustomLayout
      showTopBar={true}
      showSearchBar={true}
      showMainNav={true}
      showFooter={true}
      showBottomNav={false}
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-4 py-10 pb-24 md:px-0 md:py-12 md:pb-28 xl:flex-row xl:items-start xl:px-8 xl:pb-10">
        {/* 왼쪽: 상세/리뷰/컨텐츠 */}
        <section className="w-full px-0 md:px-4 xl:w-[65%] xl:px-0">
          <DetailMain product={mockProductData} />
        </section>
        {/* 오른쪽: 주문/상품 정보 (데스크탑만) */}
        <aside className="hidden w-full xl:block xl:w-[35%]">
          <OrderBox product={mockProductData} />
        </aside>
      </div>
      {/* 모바일/태블릿 하단 플로팅 바 */}
      <OrderFloatingBar product={mockProductData} />
    </CustomLayout>
  );
}
