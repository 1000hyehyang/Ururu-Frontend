import type { Product } from './product';

export interface HistoryProduct extends Product {
  viewedAt: Date; // 조회 시간
}

export interface HistorySortOption {
  value: string;
  label: string;
}

export interface HistoryFilters {
  sortBy: string;
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
}

export interface HistoryState {
  products: HistoryProduct[];
  filters: HistoryFilters;
  isLoading: boolean;
  error: string | null;
}
