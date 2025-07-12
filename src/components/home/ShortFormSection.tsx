'use client';

import React from 'react';
import Image from 'next/image';
import { CenteredSectionHeader } from '@/components/common/CenteredSectionHeader';
import { shortFormItems } from '@/data/home';

interface ShortFormSectionProps {
  className?: string;
}

export function ShortFormSection({ className = '' }: ShortFormSectionProps) {
  return (
    <section className={`w-full ${className}`}>
      {/* 섹션 헤더 */}
      <CenteredSectionHeader title="숏폼에서 보던 그 제품" />

      {/* 이미지 4개 가로 배치 */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {shortFormItems.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-bg-200">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
                priority={idx === 0}
              />
            </div>
            <div className="mt-4 text-center text-base font-medium text-text-100 md:text-lg">
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
