import React from 'react';
import { Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CourseViewToggleProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export const CourseViewToggle = ({ viewMode, onViewModeChange }: CourseViewToggleProps) => {
  return (
    <div className="flex bg-gray-100 rounded-lg p-1">
      <Button
        variant={viewMode === 'grid' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewModeChange('grid')}
        className="h-8 px-3"
      >
        <Grid className="h-4 w-4" />
      </Button>
      <Button
        variant={viewMode === 'list' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewModeChange('list')}
        className="h-8 px-3"
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
};