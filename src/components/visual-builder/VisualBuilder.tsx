import React, { useRef, useEffect, useState } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import 'grapesjs-preset-webpage';
import 'grapesjs-blocks-basic';
import { Button } from '@/components/ui/button';
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
  const editorRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!editorRef.current || isInitialized) return;

    try {
      // Parse initial data
      let parsedData = '';
      if (initialData && initialData !== '{}') {
        try {
          const data = typeof initialData === 'string' ? JSON.parse(initialData) : initialData;
          parsedData = data.html || data.content || '';
        } catch (e) {
          console.warn('Failed to parse initial data, using empty content');
        }
      }

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
          appendTo: '#blocks-container',
          blocks: [
            {
              id: 'section',
              label: '<b>Section</b>',
              attributes: { class: 'gjs-block-section' },
              content: '<section class="section"><div class="container"><h1>Insert your heading here</h1><p>Insert your text here</p></div></section>',
            },
            {
              id: 'text',
              label: 'Text',
              content: '<div data-gjs-type="text">Insert your text here</div>',
            },
            {
              id: 'image',
              label: 'Image',
              select: true,
              content: { type: 'image' },
              activate: true,
            },
            {
              id: 'button',
              label: 'Button',
              content: '<a class="btn">Button</a>',
            },
            {
              id: 'container',
              label: 'Container',
              content: '<div class="container"><p>Add your content here</p></div>',
            },
            {
              id: 'row',
              label: 'Row',
              content: '<div class="row"><div class="col">Column 1</div><div class="col">Column 2</div></div>',
            }
          ]
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
        panels: {
          defaults: [
            {
              id: 'layers',
              el: '.panel__right',
              resizable: {
                maxDim: 350,
                minDim: 200,
                tc: false,
                cl: true,
                cr: false,
                bc: false,
              },
            },
            {
              id: 'panel-switcher',
              el: '.panel__switcher',
              buttons: [
                {
                  id: 'show-layers',
                  active: true,
                  label: 'Layers',
                  command: 'show-layers',
                  togglable: false,
                },
                {
                  id: 'show-style',
                  active: true,
                  label: 'Styles',
                  command: 'show-styles',
                  togglable: false,
                },
                {
                  id: 'show-traits',
                  active: true,
                  label: 'Traits',
                  command: 'show-traits',
                  togglable: false,
                }
              ],
            }
          ]
        },
        canvas: {
          styles: [
            'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
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

      // Set initial content if provided
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

      // Add custom commands
      grapesEditor.Commands.add('show-layers', {
        getRowEl(editor: any) { return editor.getContainer().closest('.editor-row'); },
        getLayersEl(row: any) { return row.querySelector('.layers-container') }
      });

      grapesEditor.Commands.add('show-styles', {
        getRowEl(editor: any) { return editor.getContainer().closest('.editor-row'); },
        getStyleEl(row: any) { return row.querySelector('.styles-container') }
      });

      grapesEditor.Commands.add('show-traits', {
        getRowEl(editor: any) { return editor.getContainer().closest('.editor-row'); },
        getTraitsEl(row: any) { return row.querySelector('.traits-container') }
      });

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
      {/* Toolbar */}
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
          <Button onClick={handleSave} size="sm">
            <Save className="w-4 h-4 mr-1" />
            Save
          </Button>
        </div>
      </div>

      {/* Editor Layout */}
      <div className="flex-1 flex">
        {/* Left Panel - Blocks */}
        <div className="w-64 bg-gray-50 border-r p-4">
          <h3 className="font-semibold mb-4">Components</h3>
          <div id="blocks-container"></div>
        </div>

        {/* Main Editor */}
        <div className="flex-1 relative">
          <div ref={editorRef} className="h-full" />
        </div>

        {/* Right Panel - Properties */}
        <div className="w-80 bg-gray-50 border-l">
          <div className="panel__switcher p-2 border-b"></div>
          <div className="p-4">
            <div id="layers-container" className="layers-container mb-4"></div>
            <div id="styles-container" className="styles-container mb-4"></div>
            <div id="traits-container" className="traits-container mb-4"></div>
            <div id="selectors-container" className="selectors-container mb-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};