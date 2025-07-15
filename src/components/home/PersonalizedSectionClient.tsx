'use client';

import { PersonalizedSection } from './PersonalizedSection';
import { useAiPersonalizedProducts } from '@/hooks/useAiPersonalizedProducts';

export default function PersonalizedSectionClient() {
  const { products = [], loading, error } = useAiPersonalizedProducts();

  // 에러가 있으면 에러 메시지 표시
  if (error) {
    return (
      <section className="w-full">
        <div className="container mx-auto max-w-[1280px] px-6 py-8 md:px-9 md:py-10 xl:px-12">
          <div className="py-8 text-center">
            <p className="text-gray-500">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return <PersonalizedSection products={products} loading={loading} />;
}
