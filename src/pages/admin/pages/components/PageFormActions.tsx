
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface PageFormActionsProps {
  loading: boolean;
  isEditing: boolean;
  onCancel: () => void;
}

export const PageFormActions: React.FC<PageFormActionsProps> = ({
  loading,
  isEditing,
  onCancel
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : (isEditing ? 'Update Page' : 'Create Page')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
