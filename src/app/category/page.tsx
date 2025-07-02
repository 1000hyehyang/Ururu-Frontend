import { MinimalLayout } from '@/components/layout';
import { categoryItems } from '@/data/categories';

export default function CategoryPage() {
  return (
    <MinimalLayout>
      <div className="container py-6">
        {/* 헤더 */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-text-100">카테고리</h1>
          <p className="mt-2 text-sm text-text-200">원하는 카테고리를 선택하여 공구를 찾아보세요</p>
        </div>

        {/* 카테고리 그리드 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categoryItems.map((category) => (
            <div
              key={category.title}
              className="rounded-xl border border-bg-300 bg-bg-100 p-4 shadow-sm"
            >
              {/* 메인 카테고리 */}
              <div className="mb-3">
                <h2 className="text-lg font-semibold text-text-100">{category.title}</h2>
              </div>

              {/* 서브 카테고리 */}
              <div className="grid grid-cols-2 gap-2">
                {category.subItems.map((subItem) => (
                  <div
                    key={subItem.title}
                    className="rounded-lg bg-bg-200 px-3 py-2 text-sm text-text-200"
                  >
                    {subItem.title}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MinimalLayout>
  );
}
