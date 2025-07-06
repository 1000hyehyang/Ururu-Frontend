import React from 'react';

interface CategoryTabsProps {
  categories: { category: string; products: any[] }[];
  activeCategory: number;
  onCategoryChange: (index: number) => void;
  onMobilePageReset?: () => void;
}

export function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
  onMobilePageReset,
}: CategoryTabsProps) {
  const handleCategoryChange = (index: number) => {
    onCategoryChange(index);
    onMobilePageReset?.();
  };

  return (
    <div className="mb-6">
      {/* 모바일/태블릿: 스크롤 가능한 탭 */}
      <div className="scrollbar-hide flex gap-1 overflow-x-auto md:hidden">
        {categories.map((category, index) => (
          <button
            key={category.category}
            className={`flex-shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors md:text-sm ${
              index === activeCategory
                ? 'bg-primary-300 text-text-on'
                : 'bg-bg-200 text-text-200 hover:bg-bg-300'
            }`}
            onClick={() => handleCategoryChange(index)}
          >
            {category.category}
          </button>
        ))}
      </div>

      {/* 데스크탑: 넓은 탭 */}
      <div className="hidden md:flex md:gap-2">
        {categories.map((category, index) => (
          <button
            key={category.category}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-bg-200 ${
              index === activeCategory ? 'bg-primary-300 text-text-on' : 'bg-bg-100 text-text-200'
            }`}
            onClick={() => onCategoryChange(index)}
          >
            {category.category}
          </button>
        ))}
      </div>
    </div>
  );
}
