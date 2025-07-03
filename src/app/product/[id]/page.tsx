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
      <div className="mx-auto flex w-full max-w-[1248px] flex-col gap-10 px-6 py-10 pb-24 md:px-9 md:py-12 md:pb-28 xl:flex-row xl:items-start xl:gap-12 xl:px-12 xl:pb-10">
        {/* 왼쪽: 상세/리뷰/컨텐츠 */}
        <section className="w-full xl:w-[60%]">
          <DetailMain product={mockProductData} />
        </section>
        {/* 오른쪽: 주문/상품 정보 (데스크탑만) */}
        <aside className="hidden w-full xl:block xl:w-[40%]">
          <OrderBox product={mockProductData} />
        </aside>
      </div>
      {/* 모바일/태블릿 하단 플로팅 바 */}
      <OrderFloatingBar product={mockProductData} />
    </CustomLayout>
  );
}
