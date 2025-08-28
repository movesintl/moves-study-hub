import React, { useEffect, useRef, useState, useCallback } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import 'grapesjs-preset-newsletter';
import 'grapesjs-blocks-basic';

interface EmailCanvasProps {
  initialContent?: string;
  onSave?: (data: { html: string; css: string; components: any }) => void;
  onContentChange?: (content: string) => void;
}

const EmailCanvas: React.FC<EmailCanvasProps> = ({
  initialContent = '',
  onSave,
  onContentChange
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize editor once
  useEffect(() => {
    if (!editorRef.current || isInitialized) return;

    console.log('Initializing GrapesJS editor...');
    
    const grapesEditor = grapesjs.init({
      container: editorRef.current,
      height: '100%',
      width: 'auto',
      storageManager: false,
      fromElement: false,
      plugins: ['grapesjs-preset-newsletter', 'grapesjs-blocks-basic'],
      pluginsOpts: {
        'grapesjs-preset-newsletter': {
          modalTitleImport: 'Import template',
          modalTitleExport: 'Export template',
          codeViewerTheme: 'hopscotch',
          defaultTemplate: getDefaultTemplate()
        }
      },
      canvas: {
        styles: [
          'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
        ]
      },
      deviceManager: {
        devices: [
          {
            name: 'Desktop',
            width: '600px',
            widthMedia: '1200px'
          },
          {
            name: 'Tablet',
            width: '768px',
            widthMedia: '768px'
          },
          {
            name: 'Mobile',
            width: '320px',
            widthMedia: '480px'
          }
        ]
      },
      panels: {
        defaults: [
          {
            id: 'layers',
            el: '.layers-container',
            resizable: {
              maxDim: 350,
              minDim: 200,
              tc: false,
              cl: false,
              cr: true,
              bc: false,
              keyWidth: 'flex-basis',
            },
          },
          {
            id: 'styles',
            el: '.styles-container',
            resizable: {
              maxDim: 350,
              minDim: 200,
              tc: false,
              cl: false,
              cr: true,
              bc: false,
              keyWidth: 'flex-basis',
            },
          },
          {
            id: 'traits',
            el: '.traits-container',
            resizable: {
              maxDim: 350,
              minDim: 200,
              tc: false,
              cl: false,
              cr: true,
              bc: false,
              keyWidth: 'flex-basis',
            },
          },
          {
            id: 'blocks',
            el: '.blocks-container',
            resizable: {
              maxDim: 350,
              minDim: 200,
              tc: false,
              cl: true,
              cr: false,
              bc: false,
              keyWidth: 'flex-basis',
            },
          }
        ]
      }
    });

    // Add comprehensive email blocks
    addEmailBlocks(grapesEditor);

    // Listen for content changes
    grapesEditor.on('component:update', () => {
      const html = grapesEditor.getHtml();
      onContentChange?.(html);
    });

    // Initialize with content if provided
    if (initialContent) {
      console.log('Setting initial content:', initialContent.substring(0, 100) + '...');
      grapesEditor.setComponents(initialContent);
    }

    setEditor(grapesEditor);
    setIsInitialized(true);

    return () => {
      if (grapesEditor) {
        grapesEditor.destroy();
      }
    };
  }, [isInitialized, onContentChange]);

  // Update content when initialContent changes
  useEffect(() => {
    if (editor && initialContent) {
      console.log('Updating editor content with new template...');
      editor.setComponents(initialContent);
      // Also set any CSS if it's inline in the content
      const cssMatch = initialContent.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
      if (cssMatch) {
        editor.setStyle(cssMatch[1]);
      }
    }
  }, [editor, initialContent]);

  const handleSave = () => {
    if (!editor) return;

    const html = editor.getHtml();
    const css = editor.getCss();
    const components = editor.getComponents();

    onSave?.({
      html,
      css,
      components: components.toJSON()
    });
  };

  const handlePreview = () => {
    if (!editor) return;
    
    const html = editor.getHtml();
    const css = editor.getCss();
    const previewContent = `
      <html>
        <head>
          <style>${css}</style>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 20px; background-color: #f5f5f5;">
          ${html}
        </body>
      </html>
    `;
    
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(previewContent);
      newWindow.document.close();
    }
  };

  // Helper functions
  const getDefaultTemplate = useCallback(() => {
    return `
      <div style="margin: 0 auto; max-width: 600px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #ffffff;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 300;">Welcome to Moves International</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Your trusted partner in international education</p>
        </div>
        <div style="padding: 40px 30px;">
          <h2 style="color: #333; margin-top: 0; font-size: 24px;">Start Building Your Email</h2>
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px; font-size: 16px;">
            Drag and drop elements from the sidebar to create your perfect email campaign. You can add text, images, buttons, and more.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="#" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Get Started
            </a>
          </div>
        </div>
        <div style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #eee;">
          <p style="color: #999; font-size: 14px; margin: 5px 0;">© 2024 Moves International. All rights reserved.</p>
          <p style="color: #999; font-size: 14px; margin: 5px 0;">
            <a href="#" style="color: #667eea;">Unsubscribe</a> | <a href="#" style="color: #667eea;">Update Preferences</a>
          </p>
        </div>
      </div>
    `;
  }, []);

  const addEmailBlocks = useCallback((editor: any) => {
    // Personalization blocks
    editor.BlockManager.add('name-token', {
      label: 'Name Token',
      category: 'Personalization',
      content: '<span style="background-color: #e3f2fd; padding: 4px 8px; border-radius: 4px; font-size: 14px; color: #1976d2;">{{recipientName}}</span>',
      attributes: { class: 'fa fa-user' }
    });

    editor.BlockManager.add('email-token', {
      label: 'Email Token', 
      category: 'Personalization',
      content: '<span style="background-color: #e8f5e8; padding: 4px 8px; border-radius: 4px; font-size: 14px; color: #388e3c;">{{email}}</span>',
      attributes: { class: 'fa fa-envelope' }
    });

    // Content blocks
    editor.BlockManager.add('email-header', {
      label: 'Email Header',
      category: 'Layout',
      content: `
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 300;">Your Company Name</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Tagline or description</p>
        </div>
      `,
      attributes: { class: 'fa fa-header' }
    });

    editor.BlockManager.add('text-section', {
      label: 'Text Section',
      category: 'Content',
      content: `
        <div style="padding: 30px;">
          <h2 style="color: #333; margin-top: 0; font-size: 24px; margin-bottom: 15px;">Section Title</h2>
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px; font-size: 16px;">
            Add your content here. You can edit this text and style it however you like.
          </p>
        </div>
      `,
      attributes: { class: 'fa fa-paragraph' }
    });

    editor.BlockManager.add('cta-button', {
      label: 'Call to Action',
      category: 'Content',
      content: `
        <div style="text-align: center; margin: 30px 0;">
          <a href="#" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
            Click Here
          </a>
        </div>
      `,
      attributes: { class: 'fa fa-hand-pointer-o' }
    });

    editor.BlockManager.add('image-block', {
      label: 'Image Block',
      category: 'Content',
      content: `
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://via.placeholder.com/400x200/667eea/ffffff?text=Your+Image" alt="Image" style="max-width: 100%; height: auto; border-radius: 8px;" />
        </div>
      `,
      attributes: { class: 'fa fa-image' }
    });

    editor.BlockManager.add('footer-block', {
      label: 'Email Footer',
      category: 'Layout',
      content: `
        <div style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #eee;">
          <p style="color: #999; font-size: 14px; margin: 5px 0;"><strong>Your Company Name</strong></p>
          <p style="color: #999; font-size: 14px; margin: 5px 0;">Address Line 1, City, Country</p>
          <p style="color: #999; font-size: 12px; margin: 15px 0 5px 0;">
            <a href="#" style="color: #667eea; text-decoration: none;">Unsubscribe</a> | 
            <a href="#" style="color: #667eea; text-decoration: none;">Update Preferences</a>
          </p>
        </div>
      `,
      attributes: { class: 'fa fa-footer' }
    });

    // Social and compliance
    editor.BlockManager.add('social-links', {
      label: 'Social Links',
      category: 'Social',
      content: `
        <div style="text-align: center; margin: 20px 0;">
          <a href="#" style="display: inline-block; margin: 0 10px; text-decoration: none;">
            <div style="display: inline-block; width: 40px; height: 40px; background-color: #3b5998; border-radius: 50%; line-height: 40px; text-align: center; color: white; font-weight: bold;">f</div>
          </a>
          <a href="#" style="display: inline-block; margin: 0 10px; text-decoration: none;">
            <div style="display: inline-block; width: 40px; height: 40px; background-color: #1da1f2; border-radius: 50%; line-height: 40px; text-align: center; color: white; font-weight: bold;">t</div>
          </a>
          <a href="#" style="display: inline-block; margin: 0 10px; text-decoration: none;">
            <div style="display: inline-block; width: 40px; height: 40px; background-color: #0077b5; border-radius: 50%; line-height: 40px; text-align: center; color: white; font-weight: bold;">in</div>
          </a>
        </div>
      `,
      attributes: { class: 'fa fa-share-alt' }
    });

    editor.BlockManager.add('unsubscribe-link', {
      label: 'Unsubscribe Link',
      category: 'Compliance',
      content: '<div style="text-align: center; margin: 20px 0;"><a href="#" style="color: #666; text-decoration: underline; font-size: 12px;">Unsubscribe from this list</a></div>',
      attributes: { class: 'fa fa-unlink' }
    });

    console.log('Added custom email blocks to GrapesJS');
  }, []);

  return (
    <div className="h-full w-full flex flex-col">
      {/* Toolbar */}
      <div className="bg-card border-b border-border p-4 flex justify-between items-center">
        <div className="flex gap-2">
          <button 
            onClick={handlePreview}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
          >
            Preview
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition-colors"
          >
            Save Campaign
          </button>
        </div>
        {!isInitialized && (
          <div className="text-sm text-muted-foreground">Loading editor...</div>
        )}
      </div>

      {/* Editor Layout */}
      <div className="flex-1 flex">
        {/* Sidebar - Blocks */}
        <div className="w-64 bg-card border-r border-border">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-sm">Email Elements</h3>
          </div>
          <div className="blocks-container h-full"></div>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 relative">
          <div ref={editorRef} className="h-full w-full"></div>
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-64 bg-card border-l border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-sm">Layers</h3>
          </div>
          <div className="layers-container flex-1 min-h-0"></div>
          
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-sm">Styles</h3>
          </div>
          <div className="styles-container flex-1 min-h-0"></div>
          
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-sm">Settings</h3>
          </div>
          <div className="traits-container flex-1 min-h-0"></div>
        </div>
      </div>
    </div>
  );
};

export default EmailCanvas;