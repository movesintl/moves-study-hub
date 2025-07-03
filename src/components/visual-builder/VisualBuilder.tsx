import React, { useRef, useEffect, useState } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import 'grapesjs-blocks-basic';
import 'grapesjs-preset-webpage';
import { VisualBuilderToolbar } from './components/VisualBuilderToolbar';
import { VisualBuilderLayout } from './components/VisualBuilderLayout';
import { visualBuilderBlocks } from './config/blocks';
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

    // Small delay to ensure DOM elements are ready
    const initTimer = setTimeout(() => {
      try {
      const parsedData = parseInitialData(initialData);
      
      const grapesEditor = grapesjs.init({
        container: editorRef.current,
        height: '800px',
        width: 'auto',
        plugins: ['gjs-blocks-basic', 'gjs-preset-webpage'],
        pluginsOpts: {
          'gjs-blocks-basic': {},
          'gjs-preset-webpage': {
            modalImportTitle: 'Import',
            modalImportButton: 'Import',
            modalImportLabel: '',
            modalImportContent: function(editor: any) {
              return editor.getHtml();
            },
            filestackOpts: {},
            aviaryOpts: false,
            customStyleManager: []
          }
        },
        blockManager: {
          appendTo: '#blocks-container'
        },

        layerManager: {
          appendTo: '#layers-container'
        },
        styleManager: {
          appendTo: '#styles-container',
          sectors: [
            {
              name: 'Dimension',
              open: false,
              buildProps: ['width', 'min-height', 'padding'],
              properties: [
                {
                  type: 'integer',
                  name: 'The width',
                  property: 'width',
                  units: ['px', '%'],
                  defaults: 'auto',
                  min: 0,
                }
              ]
            },
            {
              name: 'Typography',
              open: false,
              buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height'],
            },
            {
              name: 'Decorations',
              open: false,
              buildProps: ['background-color', 'border-radius', 'border', 'box-shadow'],
            },
            {
              name: 'Extra',
              open: false,
              buildProps: ['opacity', 'transition', 'perspective', 'transform'],
            }
          ]
        },
        traitManager: {
          appendTo: '#traits-container'
        },
        selectorManager: {
          appendTo: '#selectors-container'
        },
        canvas: {
          styles: [
            'https://cdn.tailwindcss.com/3.4.0'
          ],
          scripts: []
        },
        storageManager: false,
        deviceManager: {
          devices: [
            {
              name: 'Desktop',
              width: '',
            },
            {
              name: 'Mobile',
              width: '320px',
              widthMedia: '480px',
            }
          ]
        }
      });

      // Add blocks after editor initialization
      console.log('Adding blocks to GrapesJS:', visualBuilderBlocks.length);
      visualBuilderBlocks.forEach((block, index) => {
        console.log(`Adding block ${index + 1}:`, block.id, block.label);
        grapesEditor.BlockManager.add(block.id, block);
      });
      
      // Force render blocks
      grapesEditor.BlockManager.render();

      // Set initial content
      if (parsedData) {
        grapesEditor.setComponents(parsedData);
      } else {
        grapesEditor.setComponents(`
          <div class="container mx-auto p-8">
            <h1 class="text-3xl font-bold mb-4">Welcome to the Page Builder</h1>
            <p class="text-gray-600 mb-6">Start building your page by dragging components from the left panel.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-gray-100 p-6 rounded-lg">
                <h3 class="text-xl font-semibold mb-2">Column 1</h3>
                <p>Add your content here</p>
              </div>
              <div class="bg-gray-100 p-6 rounded-lg">
                <h3 class="text-xl font-semibold mb-2">Column 2</h3>
                <p>Add your content here</p>
              </div>
            </div>
          </div>
        `);
      }

      setEditor(grapesEditor);
      setIsInitialized(true);
    } catch (error) {
      console.error('Failed to initialize GrapesJS:', error);
    }
    }, 100);

    return () => {
      clearTimeout(initTimer);
      if (editor) {
        editor.destroy();
      }
    };
  }, [initialData, isInitialized]);

  const handleSave = () => {
    if (editor && onSave) {
      try {
        const html = editor.getHtml();
        const css = editor.getCss();
        const data = JSON.stringify({
          html,
          css,
          components: editor.getComponents(),
          // Note: getStyles() doesn't exist in GrapesJS, using getCss() instead
        });
        console.log('Saving GrapesJS data:', data);
        onSave(data);
      } catch (error) {
        console.error('Error saving visual builder data:', error);
      }
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