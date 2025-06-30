
import React from 'react';
import { Button } from '@/components/ui/button';

interface PageFormHeaderProps {
  isEditing: boolean;
  onBackClick: () => void;
}

export const PageFormHeader: React.FC<PageFormHeaderProps> = ({
  isEditing,
  onBackClick
}) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">
        {isEditing ? 'Edit Page' : 'Create New Page'}
      </h1>
      <Button 
        variant="outline" 
        onClick={onBackClick}
      >
        Back to Pages
      </Button>
    </div>
  );
};
