
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { VisualBuilder } from '@/components/visual-builder/VisualBuilder';
import { useEditor } from '@craftjs/core';

interface VisualBuilderSectionProps {
  visualBuilderEnabled: boolean;
  visualBuilderData: string;
  onToggleVisualBuilder: (enabled: boolean) => void;
  onVisualBuilderDataChange: (data: string) => void;
}

const VisualBuilderControls = ({ onSave }: { onSave: (data: string) => void }) => {
  const { query } = useEditor();
  
  const handleSave = () => {
    const json = query.serialize();
    onSave(json);
  };

  return (
    <Button onClick={handleSave} className="mb-4">
      Save Visual Builder Data
    </Button>
  );
};

export const VisualBuilderSection: React.FC<VisualBuilderSectionProps> = ({
  visualBuilderEnabled,
  visualBuilderData,
  onToggleVisualBuilder,
  onVisualBuilderDataChange
}) => {
  const [builderEnabled, setBuilderEnabled] = useState(true);

  const handleSaveBuilderData = (data: string) => {
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
          <div className="h-96 border rounded-lg overflow-hidden">
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
