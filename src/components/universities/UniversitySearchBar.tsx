import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { UniversityFilters } from '@/hooks/useUniversityFilters';

interface UniversitySearchBarProps {
  filters: UniversityFilters;
  setFilters: (filters: UniversityFilters) => void;
}

export const UniversitySearchBar = ({ filters, setFilters }: UniversitySearchBarProps) => {
  return (
    <div className="flex-1 max-w-2xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search universities by name or location..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="pl-12 h-12 text-lg border-gray-300 focus:border-primary focus:ring-primary"
        />
      </div>
    </div>
  );
};