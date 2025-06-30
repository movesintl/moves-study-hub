
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { VisualBuilder } from '@/components/visual-builder/VisualBuilder';

interface VisualBuilderSectionProps {
  visualBuilderEnabled: boolean;
  visualBuilderData: string;
  onToggleVisualBuilder: (enabled: boolean) => void;
  onVisualBuilderDataChange: (data: string) => void;
}

export const VisualBuilderSection: React.FC<VisualBuilderSectionProps> = ({
  visualBuilderEnabled,
  visualBuilderData,
  onToggleVisualBuilder,
  onVisualBuilderDataChange
}) => {
  const [builderEnabled, setBuilderEnabled] = useState(true);

  const handleSaveBuilderData = (data: string) => {
    console.log('Saving visual builder data:', data);
    onVisualBuilderDataChange(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visual Builder</CardTitle>
        <div className="flex items-center space-x-2">
          <Switch
            id="visual-builder"
            checked={visualBuilderEnabled}
            onCheckedChange={onToggleVisualBuilder}
          />
          <Label htmlFor="visual-builder">
            Enable Visual Builder for this page
          </Label>
        </div>
      </CardHeader>
      
      {visualBuilderEnabled && (
        <CardContent className="p-0">
          <div className="h-[800px] border rounded-lg overflow-hidden">
            <VisualBuilder
              initialData={visualBuilderData}
              onSave={handleSaveBuilderData}
              enabled={builderEnabled}
              onToggleEnabled={() => setBuilderEnabled(!builderEnabled)}
            />
          </div>
        </CardContent>
      )}
    </Card>
  );
};
