import React, { useRef, useEffect, useState } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import 'grapesjs-preset-webpage';
import 'grapesjs-blocks-basic';
import { VisualBuilderToolbar } from './components/VisualBuilderToolbar';
import { VisualBuilderLayout } from './components/VisualBuilderLayout';
import { createGrapesConfig, addCustomCommands, getDefaultContent } from './config/grapesConfig';
import { parseInitialData } from './utils/dataParser';

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
  const editorRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!editorRef.current || isInitialized) return;

    try {
      const parsedData = parseInitialData(initialData);
      const config = createGrapesConfig(editorRef.current);
      const grapesEditor = grapesjs.init(config);

      // Set initial content
      if (parsedData) {
        grapesEditor.setComponents(parsedData);
      } else {
        grapesEditor.setComponents(getDefaultContent());
      }

      // Add custom commands
      addCustomCommands(grapesEditor);

      setEditor(grapesEditor);
      setIsInitialized(true);

      return () => {
        if (grapesEditor) {
          grapesEditor.destroy();
        }
      };
    } catch (error) {
      console.error('Failed to initialize GrapesJS:', error);
    }
  }, [initialData, isInitialized]);

  const handleSave = () => {
    if (editor && onSave) {
      const html = editor.getHtml();
      const css = editor.getCss();
      const data = JSON.stringify({
        html,
        css,
        components: editor.getComponents(),
        styles: editor.getStyles()
      });
      console.log('Saving GrapesJS data:', data);
      onSave(data);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <VisualBuilderToolbar
        enabled={enabled}
        onToggleEnabled={onToggleEnabled || (() => {})}
        onSave={handleSave}
      />
      <VisualBuilderLayout editorRef={editorRef} />
    </div>
  );
};