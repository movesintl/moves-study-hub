
import React from 'react';
import { Editor, Frame, Element } from '@craftjs/core';
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

export const VisualBuilder: React.FC<VisualBuilderProps> = ({
  initialData,
  onSave,
  enabled = true,
  onToggleEnabled
}) => {
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
        <div className="w-80 border-r bg-gray-50 p-4">
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
              <Button
                onClick={() => {
                  // Only save when explicitly clicked, not on every drag
                  if (onSave) {
                    // Get the serialized data from the editor
                    const editorState = (window as any).__CRAFT_EDITOR_STATE__;
                    if (editorState) {
                      onSave(JSON.stringify(editorState));
                    }
                  }
                }}
                size="sm"
                className="flex-1"
              >
                <Save className="w-4 h-4 mr-1" />
                Save
              </Button>
            </div>
            
            {enabled && <Toolbox />}
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-auto bg-white">
          <Frame data={initialData}>
            <Element is={ContainerBlock} canvas className="min-h-screen p-4">
              <HeadingBlock text="Welcome to Visual Builder" level="h1" />
              <TextBlock text="Start building your page by dragging components from the toolbox." />
            </Element>
          </Frame>
        </div>

        {/* Settings Panel */}
        {enabled && (
          <div className="w-80 border-l bg-gray-50 p-4">
            <SettingsPanel />
          </div>
        )}
      </Editor>
    </div>
  );
};
