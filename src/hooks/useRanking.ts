'use client';

import { useState, useMemo } from 'react';
import { rankingCategories, getRankingProducts } from '@/data/ranking';

export const useRanking = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const rankingProducts = useMemo(() => {
    return getRankingProducts(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return {
    categories: rankingCategories,
    selectedCategory,
    rankingProducts,
    handleCategoryChange,
  };
};
