import { X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Filters } from '@/hooks/useCourseFilters';

interface CourseFiltersProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
}

export const CourseFilters = ({ filters, setFilters, resetFilters, hasActiveFilters }: CourseFiltersProps) => {
  return (
    <div className="mt-6 p-6 bg-gray-50 rounded-xl border">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Select value={filters.study_area} onValueChange={(value) => setFilters({ ...filters, study_area: value })}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Study Area" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Study Areas</SelectItem>
            <SelectItem value="IT">IT & Computer Science</SelectItem>
            <SelectItem value="Business">Business & Management</SelectItem>
            <SelectItem value="Health">Health & Medicine</SelectItem>
            <SelectItem value="Engineering">Engineering</SelectItem>
            <SelectItem value="Trade">Trade & Vocational</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.level} onValueChange={(value) => setFilters({ ...filters, level: value })}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Study Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="Certificate">Certificate</SelectItem>
            <SelectItem value="Diploma">Diploma</SelectItem>
            <SelectItem value="Bachelor">Bachelor's Degree</SelectItem>
            <SelectItem value="Master">Master's Degree</SelectItem>
          </SelectContent>
        </Select>

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
          {filters.study_area !== 'all' && (
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
              {filters.study_area}
            </Badge>
          )}
          {filters.level !== 'all' && (
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
              {filters.level}
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