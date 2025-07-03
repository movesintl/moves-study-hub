
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
    console.log('Manually saving visual builder data:', data);
    onVisualBuilderDataChange(data);
  };

  if (visualBuilderEnabled) {
    return (
      <div className="flex-1 flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Visual Builder</h3>
              <p className="text-sm text-gray-600">Design your page with drag-and-drop components</p>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="visual-builder"
                checked={visualBuilderEnabled}
                onCheckedChange={onToggleVisualBuilder}
              />
              <Label htmlFor="visual-builder" className="text-sm font-medium">
                Visual Builder
              </Label>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <VisualBuilder
            initialData={visualBuilderData === '{}' ? undefined : visualBuilderData}
            onSave={handleSaveBuilderData}
            enabled={builderEnabled}
            onToggleEnabled={() => setBuilderEnabled(!builderEnabled)}
          />
        </div>
      </div>
    );
  }

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
    </Card>
  );
};
