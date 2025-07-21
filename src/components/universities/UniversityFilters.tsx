import { X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { type UniversityFilters as UniversityFiltersType } from '@/hooks/useUniversityFilters';

interface UniversityFiltersProps {
  filters: UniversityFiltersType;
  setFilters: (filters: UniversityFiltersType) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
}

export const UniversityFilters = ({ filters, setFilters, resetFilters, hasActiveFilters }: UniversityFiltersProps) => {
  return (
    <div className="mt-6 p-6 bg-gray-50 rounded-xl border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Select value={filters.country} onValueChange={(value) => setFilters({ ...filters, country: value })}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            <SelectItem value="Australia">Australia</SelectItem>
            <SelectItem value="Canada">Canada</SelectItem>
            <SelectItem value="UK">United Kingdom</SelectItem>
            <SelectItem value="USA">United States</SelectItem>
            <SelectItem value="New Zealand">New Zealand</SelectItem>
            <SelectItem value="Germany">Germany</SelectItem>
            <SelectItem value="France">France</SelectItem>
            <SelectItem value="Ireland">Ireland</SelectItem>
            <SelectItem value="Netherlands">Netherlands</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Active filters:</span>
          {filters.search && (
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
              Search: "{filters.search}"
            </Badge>
          )}
          {filters.country !== 'all' && (
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
              {filters.country}
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={resetFilters} className="h-6 px-2 text-xs">
            <X className="h-3 w-3 mr-1" />
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};