
import React, { useRef } from 'react';
import { Editor, Frame, Element, useEditor } from '@craftjs/core';
import { Button } from '@/components/ui/button';
import { Toolbox } from './Toolbox';
import { SettingsPanel } from './SettingsPanel';
import { TextBlock } from './blocks/TextBlock';
import { ImageBlock } from './blocks/ImageBlock';
import { ContainerBlock } from './blocks/ContainerBlock';
import { ButtonBlock } from './blocks/ButtonBlock';
import { HeadingBlock } from './blocks/HeadingBlock';
import { DividerBlock } from './blocks/DividerBlock';
import { SpacerBlock } from './blocks/SpacerBlock';
import { Save, Eye, EyeOff } from 'lucide-react';

interface VisualBuilderProps {
  initialData?: string;
  onSave?: (data: string) => void;
  enabled?: boolean;
  onToggleEnabled?: () => void;
}

const SaveButton = ({ onSave }: { onSave?: (data: string) => void }) => {
  const { query } = useEditor();

  const handleSave = () => {
    if (onSave) {
      const json = query.serialize();
      console.log('Saving builder data:', json);
      onSave(json);
    }
  };

  return (
    <Button onClick={handleSave} size="sm" className="flex-1">
      <Save className="w-4 h-4 mr-1" />
      Save
    </Button>
  );
};

export const VisualBuilder: React.FC<VisualBuilderProps> = ({
  initialData,
  onSave,
  enabled = true,
  onToggleEnabled
}) => {
  const frameRef = useRef<HTMLDivElement>(null);

  // Parse initial data safely
  const getInitialData = () => {
    if (!initialData || initialData === '{}') {
      return undefined;
    }
    try {
      // If it's already a string, return it directly
      if (typeof initialData === 'string') {
        return initialData;
      }
      return JSON.stringify(initialData);
    } catch (error) {
      console.warn('Failed to parse initial data:', error);
      return undefined;
    }
  };

  return (
    <div className="flex h-full">
      <Editor
        resolver={{
          TextBlock,
          ImageBlock,
          ContainerBlock,
          ButtonBlock,
          HeadingBlock,
          DividerBlock,
          SpacerBlock
        }}
        enabled={enabled}
      >
        {/* Toolbox */}
        <div className="w-80 border-r bg-gray-50 p-4 flex-shrink-0">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button
                onClick={onToggleEnabled}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                {enabled ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
                {enabled ? 'Preview' : 'Edit'}
              </Button>
              <SaveButton onSave={onSave} />
            </div>
            
            {enabled && <Toolbox />}
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-auto bg-white relative">
          <div ref={frameRef} className="min-h-[800px] w-full p-6">
            <Frame data={getInitialData()}>
              <Element 
                is={ContainerBlock} 
                canvas 
                padding={20} 
                background="#ffffff"
              >
                <TextBlock text="Welcome to the page builder! Drag components from the left panel to start building your page." />
              </Element>
            </Frame>
          </div>
        </div>

        {/* Settings Panel */}
        {enabled && (
          <div className="w-80 border-l bg-gray-50 p-4 flex-shrink-0">
            <SettingsPanel />
          </div>
        )}
      </Editor>
    </div>
  );
};
