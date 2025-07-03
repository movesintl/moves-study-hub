import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Eye, EyeOff } from 'lucide-react';

interface VisualBuilderToolbarProps {
  enabled: boolean;
  onToggleEnabled: () => void;
  onSave: () => void;
}

export const VisualBuilderToolbar: React.FC<VisualBuilderToolbarProps> = ({
  enabled,
  onToggleEnabled,
  onSave
}) => {
  return (
    <div className="bg-white border-b p-4 flex justify-between items-center">
      <div className="flex gap-2">
        <Button
          onClick={onToggleEnabled}
          variant="outline"
          size="sm"
        >
          {enabled ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
          {enabled ? 'Preview' : 'Edit'}
        </Button>
        <Button onClick={onSave} size="sm">
          <Save className="w-4 h-4 mr-1" />
          Save
        </Button>
      </div>
    </div>
  );
};