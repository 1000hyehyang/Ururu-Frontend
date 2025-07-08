'use client';

import { FullLayout } from '@/components/layout';
import { EmptyPage } from '@/components/common';

export default function EventPage() {
  return (
    <FullLayout>
      <div className="container mx-auto max-w-[1280px] px-6 py-8 md:px-9 md:py-10 xl:px-12">
        <EmptyPage
          title="이벤트 준비중이에요"
          description="곧 다양한 이벤트와 프로모션을 만나보실 수 있어요!"
          icon="🎉"
        />
      </div>
    </FullLayout>
  );
}
