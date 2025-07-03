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
              content: '<section class="section py-16"><div class="container mx-auto px-4"><h2 class="text-3xl font-bold mb-4">Section Title</h2><p class="text-gray-600">Section content goes here</p></div></section>',
            },
            {
              id: 'hero',
              label: 'Hero Section',
              content: `
                <section class="hero bg-gradient-to-r from-blue-600 to-purple-600 text-white py-24">
                  <div class="container mx-auto px-4 text-center">
                    <h1 class="text-5xl font-bold mb-6">Hero Title</h1>
                    <p class="text-xl mb-8">Hero subtitle description goes here</p>
                    <a href="#" class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">Get Started</a>
                  </div>
                </section>
              `,
            },
            {
              id: 'heading-h1',
              label: 'Heading H1',
              content: '<h1 class="text-4xl font-bold text-gray-900 mb-4">Main Heading</h1>',
            },
            {
              id: 'heading-h2',
              label: 'Heading H2',
              content: '<h2 class="text-3xl font-bold text-gray-900 mb-3">Section Heading</h2>',
            },
            {
              id: 'heading-h3',
              label: 'Heading H3',
              content: '<h3 class="text-2xl font-semibold text-gray-900 mb-2">Subsection Heading</h3>',
            },
            {
              id: 'text',
              label: 'Text',
              content: '<p class="text-gray-600 leading-relaxed">Insert your text here. This is a paragraph of text that you can edit and customize.</p>',
            },
            {
              id: 'image',
              label: 'Image',
              select: true,
              content: '<img src="https://via.placeholder.com/400x300" alt="Placeholder" class="w-full h-auto rounded-lg shadow-md" />',
              activate: true,
            },
            {
              id: 'button',
              label: 'Button',
              content: '<a href="#" class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Button Text</a>',
            },
            {
              id: 'card',
              label: 'Card',
              content: `
                <div class="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                  <img src="https://via.placeholder.com/300x200" alt="Card image" class="w-full h-48 object-cover rounded-lg mb-4" />
                  <h3 class="text-xl font-semibold mb-2">Card Title</h3>
                  <p class="text-gray-600 mb-4">Card description goes here. This is a sample card component.</p>
                  <a href="#" class="text-blue-600 font-semibold hover:text-blue-800">Read More →</a>
                </div>
              `,
            },
            {
              id: 'testimonial',
              label: 'Testimonial',
              content: `
                <div class="bg-gray-50 rounded-lg p-8 text-center">
                  <div class="mb-6">
                    <svg class="w-8 h-8 mx-auto text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                    </svg>
                  </div>
                  <p class="text-lg italic text-gray-700 mb-6">"This is a great testimonial from a satisfied customer. It highlights the positive experience they had."</p>
                  <div class="flex items-center justify-center">
                    <img src="https://via.placeholder.com/60x60" alt="Customer" class="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <p class="font-semibold">Customer Name</p>
                      <p class="text-gray-500 text-sm">Customer Title</p>
                    </div>
                  </div>
                </div>
              `,
            },
            {
              id: 'cta',
              label: 'Call to Action',
              content: `
                <section class="bg-blue-600 text-white py-16">
                  <div class="container mx-auto px-4 text-center">
                    <h2 class="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                    <p class="text-xl mb-8">Join thousands of satisfied customers today</p>
                    <a href="#" class="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">Start Now</a>
                  </div>
                </section>
              `,
            },
            {
              id: 'container',
              label: 'Container',
              content: '<div class="container mx-auto px-4 py-8"><p class="text-center text-gray-500">Add your content here</p></div>',
            },
            {
              id: 'row',
              label: '2 Columns',
              content: `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
                  <div class="bg-gray-50 p-6 rounded-lg">
                    <h3 class="text-xl font-semibold mb-3">Column 1</h3>
                    <p class="text-gray-600">Content for first column</p>
                  </div>
                  <div class="bg-gray-50 p-6 rounded-lg">
                    <h3 class="text-xl font-semibold mb-3">Column 2</h3>
                    <p class="text-gray-600">Content for second column</p>
                  </div>
                </div>
              `,
            },
            {
              id: 'three-columns',
              label: '3 Columns',
              content: `
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
                  <div class="text-center">
                    <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <h3 class="text-lg font-semibold mb-2">Feature 1</h3>
                    <p class="text-gray-600 text-sm">Description of first feature</p>
                  </div>
                  <div class="text-center">
                    <div class="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    </div>
                    <h3 class="text-lg font-semibold mb-2">Feature 2</h3>
                    <p class="text-gray-600 text-sm">Description of second feature</p>
                  </div>
                  <div class="text-center">
                    <div class="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <h3 class="text-lg font-semibold mb-2">Feature 3</h3>
                    <p class="text-gray-600 text-sm">Description of third feature</p>
                  </div>
                </div>
              `,
            },
            {
              id: 'gallery',
              label: 'Image Gallery',
              content: `
                <div class="py-8">
                  <h2 class="text-2xl font-bold text-center mb-8">Gallery</h2>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <img src="https://via.placeholder.com/300x300" alt="Gallery 1" class="w-full h-48 object-cover rounded-lg hover:opacity-80 transition-opacity cursor-pointer" />
                    <img src="https://via.placeholder.com/300x300" alt="Gallery 2" class="w-full h-48 object-cover rounded-lg hover:opacity-80 transition-opacity cursor-pointer" />
                    <img src="https://via.placeholder.com/300x300" alt="Gallery 3" class="w-full h-48 object-cover rounded-lg hover:opacity-80 transition-opacity cursor-pointer" />
                    <img src="https://via.placeholder.com/300x300" alt="Gallery 4" class="w-full h-48 object-cover rounded-lg hover:opacity-80 transition-opacity cursor-pointer" />
                  </div>
                </div>
              `,
            },
            {
              id: 'contact-form',
              label: 'Contact Form',
              content: `
                <div class="bg-gray-50 p-8 rounded-lg">
                  <h2 class="text-2xl font-bold mb-6 text-center">Contact Us</h2>
                  <form class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input type="text" placeholder="First Name" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                      <input type="text" placeholder="Last Name" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <input type="email" placeholder="Email Address" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    <textarea placeholder="Your Message" rows="4" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
                    <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Send Message</button>
                  </form>
                </div>
              `,
            },
            {
              id: 'video',
              label: 'Video',
              content: `
                <div class="py-8">
                  <div class="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
                    <iframe 
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                      class="w-full h-64 md:h-96" 
                      frameborder="0" 
                      allowfullscreen>
                    </iframe>
                  </div>
                </div>
              `,
            },
            {
              id: 'divider',
              label: 'Divider',
              content: '<hr class="border-gray-300 my-8" />',
            },
            {
              id: 'spacer',
              label: 'Spacer',
              content: '<div class="py-8"></div>',
            },
            {
              id: 'stats',
              label: 'Stats Section',
              content: `
                <section class="bg-blue-600 text-white py-16">
                  <div class="container mx-auto px-4">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                      <div>
                        <div class="text-4xl font-bold mb-2">1000+</div>
                        <div class="text-blue-200">Happy Customers</div>
                      </div>
                      <div>
                        <div class="text-4xl font-bold mb-2">50+</div>
                        <div class="text-blue-200">Projects Completed</div>
                      </div>
                      <div>
                        <div class="text-4xl font-bold mb-2">24/7</div>
                        <div class="text-blue-200">Support Available</div>
                      </div>
                      <div>
                        <div class="text-4xl font-bold mb-2">99%</div>
                        <div class="text-blue-200">Success Rate</div>
                      </div>
                    </div>
                  </div>
                </section>
              `,
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
            'https://cdn.tailwindcss.com/3.4.0',
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