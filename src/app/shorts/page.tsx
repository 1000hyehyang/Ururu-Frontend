'use client';

import { FullLayout } from '@/components/layout';
import { EmptyPage } from '@/components/common';

export default function ShortsPage() {
  return (
    <FullLayout>
      <div className="container mx-auto max-w-[1280px] px-6 py-8 md:px-9 md:py-10 xl:px-12">
        <EmptyPage
          title="숏구 준비중이에요"
          description="곧 인기 숏폼 상품들을 만나보실 수 있어요!"
          icon="📱"
        />
      </div>
    </FullLayout>
  );
}
