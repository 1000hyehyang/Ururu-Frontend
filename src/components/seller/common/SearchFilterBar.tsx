import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import { FORM_STYLES } from '@/constants/form-styles';

interface SearchFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  selectedFilter: string;
  onFilterChange: (value: string) => void;
  filterOptions: Array<{ value: string; label: string }>;
}

export function SearchFilterBar({
  searchTerm,
  onSearchChange,
  searchPlaceholder,
  selectedFilter,
  onFilterChange,
  filterOptions,
}: SearchFilterBarProps) {
  return (
    <Card className={FORM_STYLES.card.seller}>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className={FORM_STYLES.seller.search.container}>
            <Search className={FORM_STYLES.seller.search.icon} />
            <Input
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className={FORM_STYLES.seller.search.input}
            />
          </div>
          <div className={FORM_STYLES.seller.filter.container}>
            <Filter className="h-4 w-4 text-text-300" />
            <select
              value={selectedFilter}
              onChange={(e) => onFilterChange(e.target.value)}
              className={FORM_STYLES.seller.filter.select}
            >
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
